// ================= DASHBOARD STATS =================
function loadStats(){
    fetch("../api/get_patients.php")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("totalPatients").innerText = data.length;
    });

    fetch("../api/get_appointments.php")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("totalAppointments").innerText = data.length;
    });

    fetch("../api/get_records.php")
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("totalRecords").innerText = data.length;
    });
}

// ================= PATIENT ADD =================
document.getElementById("patientForm").addEventListener("submit", function(e){
    e.preventDefault();

    let fd = new FormData();
    fd.append("name", name.value);
    fd.append("age", age.value);
    fd.append("gender", gender.value);
    fd.append("phone", phone.value);

    fetch("../api/add_patient.php", {
        method:"POST",
        body:fd
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Patient Added ");
        loadPatients();
        loadStats();
    });
});

// ================= LOAD PATIENTS =================
function loadPatients(){
    fetch("../api/get_patients.php")
    .then(res=>res.json())
    .then(data=>{
        console.log(data); // debug

        let html = `
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
        </tr>`;

        data.forEach(p=>{
            html += `
            <tr>
                <td>${p.id || ''}</td>
                <td>${p.name || ''}</td>
                <td>${p.age || ''}</td>
                <td>${p.gender || ''}</td>
                <td>${p.phone || ''}</td>
            </tr>`;
        });

        document.getElementById("table").innerHTML = html;
    });
}

// ================= APPOINTMENTS =================
function loadAppointments(){
    fetch("../api/get_appointments.php")
    .then(res=>res.json())
    .then(data=>{
        let html = `
        <tr>
            <th>Patient</th><th>Date</th><th>Status</th>
        </tr>`;

        data.forEach(a=>{
            html += `
            <tr>
                <td>${a.name}</td>
                <td>${a.date}</td>
                <td>${a.status}</td>
            </tr>`;
        });

        document.getElementById("appointmentTable").innerHTML = html;
    });
}


// ================= NAVIGATION =================
function showSection(section){
    let sections = ["dashboardSection","addSection","listSection","appointmentSection","recordsSection"];

    sections.forEach(id=>{
        document.getElementById(id).style.display = "none";
    });

    document.getElementById(section + "Section").style.display = "block";

    if(section === "list") loadPatients();
    if(section === "appointment") loadAppointments();
    if(section === "records") loadRecords();
}

// ================= SIDEBAR =================
function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("active");
}

// ================= INIT =================
loadStats();
// Load Patients Dropdown
function loadPatientsDropdown(){
    fetch("../api/get_patients.php")
    .then(res=>res.json())
    .then(data=>{
        let patientSelect = document.getElementById("patient_id");
        patientSelect.innerHTML = '<option value="">Select Patient</option>';
        data.forEach(p=>{
            patientSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
        });
    });
}

// Load Doctors Dropdown
function loadDoctorsDropdown(){
    fetch("../api/get_doctors.php")
    .then(res=>res.json())
    .then(data=>{
        let doctorSelect = document.getElementById("doctor_id");
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        data.forEach(d=>{
            doctorSelect.innerHTML += `<option value="${d.id}">${d.name}</option>`;
        });
    });
}

// Add Appointment
document.getElementById("appointmentForm").addEventListener("submit", function(e){
    e.preventDefault();

    let fd = new FormData();
    fd.append("doctor_id", document.getElementById("doctor_id").value);
    fd.append("patient_id", document.getElementById("patient_id").value);
    fd.append("date", document.getElementById("appointment_date").value);

    fetch("../api/add_appointment.php", {
        method:"POST",
        body:fd
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.status==="success"){
            alert("Appointment Added ");
            document.getElementById("appointmentForm").reset();
            loadAppointments();
        } else {
            alert("Error: "+(data.msg || "Something went wrong"));
        }
    });
});

// Load Appointments Table
function loadAppointments(){
    fetch("../api/get_appointments.php")
    .then(res => res.json())
    .then(data => {
        let html = `<tr>
           <th>Doctor</th><th>Patient</th><th>Date</th><th>Status</th><th>Actions</th>
        </tr>`;

        data.forEach(a => {
            html += `<tr>
                <td>${a.doctor_name || ''}</td>
                <td>${a.patient_name || ''}</td>
                <td>${a.appointment_date || ''}</td>
                <td>${a.status || ''}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editAppointment(${a.id})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAppointment(${a.id})">Delete</button>
                </td>
            </tr>`;
        });

        document.getElementById("appointmentTable").innerHTML = html;
    });
}

// Edit Appointment
let editId = null;
function editAppointment(id){
    editId = id;

    // Fetch appointment details
    fetch(`../api/get_appointment.php?id=${id}`)
    .then(res => res.json())
    .then(a => {
        // Fill Doctor dropdown
        fetch("../api/get_doctors.php")
        .then(res => res.json())
        .then(docs => {
            let doctorSelect = document.getElementById("edit_doctor_id");
            doctorSelect.innerHTML = '';
            docs.forEach(d=>{
                let sel = d.id == a.doctor_id ? 'selected' : '';
                doctorSelect.innerHTML += `<option value="${d.id}" ${sel}>${d.name}</option>`;
            });
        });

        // Fill Patient dropdown
        fetch("../api/get_patients.php")
        .then(res => res.json())
        .then(pats => {
            let patientSelect = document.getElementById("edit_patient_id");
            patientSelect.innerHTML = '';
            pats.forEach(p=>{
                let sel = p.id == a.patient_id ? 'selected' : '';
                patientSelect.innerHTML += `<option value="${p.id}" ${sel}>${p.name}</option>`;
            });
        });

        // Fill Date & Status
        document.getElementById("edit_appointment_date").value = a.appointment_date.replace(' ','T');
        document.getElementById("edit_appointment_date").value = a.appointment_date ? a.appointment_date.replace(' ','T') : '';
        

        // Show modal
        document.getElementById("editModal").style.display = 'block';
    });
}


// Save changes
document.getElementById("saveEditBtn").addEventListener("click", function(){
    let fd = new FormData();
    fd.append("id", editId);
    fd.append("doctor_id", document.getElementById("edit_doctor_id").value);
    fd.append("patient_id", document.getElementById("edit_patient_id").value);
    fd.append("date", document.getElementById("edit_appointment_date").value);
    fd.append("status", document.getElementById("edit_status").value);

    fetch("../api/edit_appointment_full.php", {
        method: "POST",
        body: fd
    })
    .then(res => res.json())
    .then(data => {
        alert(data.status === "success" ? "Updated " : "Error ");
        closeModal();
        loadAppointments();
    });
});

function closeModal(){
    document.getElementById("editModal").style.display='none';
}


// Delete Appointment
function deleteAppointment(id){
    if(confirm("Are you sure to delete this appointment?")){
        fetch("../api/delete_appointment.php", {
            method:"POST",
            body: new URLSearchParams({id:id})
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.status === "success" ? "Deleted " : "Error ");
            loadAppointments();
        });
    }
}

// Initialize dropdowns and table
loadPatientsDropdown();
loadDoctorsDropdown();
loadAppointments();


// Add Appointment datetime
flatpickr("#appointment_date", {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date()
});

// Edit Appointment datetime (Modal)
flatpickr("#edit_appointment_date", {
    enableTime: true,
    dateFormat: "Y-m-d H:i"
});

// document.getElementById("edit_appointment_date")._flatpickr.setDate(a.appointment_date);



function loadRecordDropdowns(){
    // Patients
    fetch("../api/get_patients.php")
    .then(res => res.json())
    .then(pats => {
        let patientSelect = document.getElementById("record_patient_id");
        patientSelect.innerHTML = '<option value="">Select Patient</option>';
        pats.forEach(p => patientSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`);
    });

    // Doctors
    fetch("../api/get_doctors.php")
    .then(res => res.json())
    .then(docs => {
        let doctorSelect = document.getElementById("record_doctor_id");
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        docs.forEach(d => doctorSelect.innerHTML += `<option value="${d.id}">${d.name}</option>`);
    });
}



document.getElementById("recordForm").addEventListener("submit", function(e){
    e.preventDefault();

    let fd = new FormData();
    fd.append("patient_id", document.getElementById("record_patient_id").value);
    fd.append("doctor_id", document.getElementById("record_doctor_id").value);
    fd.append("record_date", document.getElementById("record_date").value);
    fd.append("description", document.getElementById("record_description").value);

    fetch("../api/add_record.php", {
        method: "POST",
        body: fd
    })
    .then(res => res.json())
    .then(data => {
        alert(data.status === "success" ? "Record Added " : "Error ");
        loadRecords(); // function to refresh record table
        recordForm.reset();
    });
});



document.addEventListener("DOMContentLoaded", function(){

    // Load dropdowns when page loads
    loadRecordDropdowns();

    // Initialize Flatpickr for record date
    flatpickr("#record_date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        defaultDate: new Date()
    });
});



// Load Records Table
function loadRecords(){
    fetch("../api/get_records.php")
    .then(res => res.json())
    .then(data => {
        let table = document.getElementById("recordTable");
        table.innerHTML = `<tr>
           <th>Patient</th><th>Doctor</th><th>Date</th><th>Prescription</th>
        </tr>`;
        data.forEach(r=>{
            table.innerHTML += `<tr>                
                <td>${r.patient_name}</td>
                <td>${r.doctor_name}</td>
                <td>${r.record_date}</td>
                <td>${r.description}</td>
            </tr>`;
        });
    });
}

// Call loadRecords() once on page load to display existing records
loadRecords();



