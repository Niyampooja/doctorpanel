<div id="appointmentSection" style="display:none;">
    <h4>Appointments</h4>

    <form id="appointmentForm" class="card p-3 shadow">
        <select class="form-control mb-2" id="doctor_id" required>
            <option value="">Select Doctor</option>
        </select>

        <select class="form-control mb-2" id="patient_id" required>
            <option value="">Select Patient</option>
        </select>

        <input class="form-control mb-2" id="appointment_date" type="datetime-local" required>
        <button class="btn btn-primary">Add Appointment</button>
    </form>

    <table class="table table-bordered" id="appointmentTable"></table>
</div>