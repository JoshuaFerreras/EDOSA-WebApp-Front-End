<script>
import axios from 'axios';
export default {
    data() {
        return {
            // Existing data properties...
            usersWithRole1: [], // Add this array to store users with role_id 1
            user: null,
            showModalState: false,
            showEditModalState: false,
            showDeleteModalState: false,
            appointmentToDelete: null,
            appointments: [],
            addAppointmentForm: {
                name: "",
                status: "Pending",
                date: "",
                time: "",
            },
            editForm: {
                id: "",
                name: "",
                status: "Pending",
                date: "",
                time: "",
            },
            showMessage: false,
            message: "",
            dataLoaded: false
        };
    },
    created() {
        this.getAppointments();
        this.getProfile(); // Call getProfile method to retrieve profile
        this.getUsersWithRole1(); // Call the new method to get users with role_id 1
    },
    methods: {
        // GET users with role_id 1 from the server
        getUsersWithRole1() {
            // Make a fetch request to your Flask route
            fetch("http://localhost:5000/get_users_with_role_1", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    this.usersWithRole1 = data.users; // Assuming your Flask response is similar to the structure you provided
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        convertTo12HourFormat(time24) {
            const [hours, minutes] = time24.split(':');
            let period = 'AM';
            let hours12 = parseInt(hours, 10);

            if (hours12 === 0) {
                hours12 = 12; // Set hour to 12 if it's 0
            } else if (hours12 >= 12) {
                period = 'PM';
                if (hours12 > 12) {
                    hours12 -= 12;
                }
            }

            return `${hours12}:${minutes} ${period}`;
        },
        // GET user profile
        async getProfile() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await axios.get("http://localhost:5000/profile", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    // Handle profile data
                    this.user = response.data.profile;
                    console.log(response.data.profile);
                } else {
                    console.error('Failed to fetch profile:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        },
        // GET or SHOW appointments from the server
        async getAppointments() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token not found in localStorage');
                    return;
                }

                const response = await axios.get("http://localhost:5000/patient-dashboard", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                this.appointments = response.data.appointments;
                this.dataLoaded = true;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        },
        // POST or ADD Appointment
        addAppointments(payload) {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Check if the token is available
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
            const path = "http://localhost:5000/patient-dashboard";
            fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Replace with the actual token
                },
                body: JSON.stringify(payload),
            })
                .then(() => {
                    this.getAppointments();
                    this.closeModal();
                    this.message = "Appointment Added!";
                    this.showMessage = true;
                    this.showAlert();
                    document.querySelector('.alert-message').style.background = '#63b463';
                })
                .catch((error) => {
                    console.error(error);
                    this.getAppointments();
                    this.closeModal();
                });
            this.initForm();
        },
        // Initializes the add appointment form
        initForm() {
            this.addAppointmentForm.name = "";
            this.addAppointmentForm.date = "";
            this.addAppointmentForm.time = "";
        },
        // Handles the submission of the add appointment form
        onSubmit(e) {
            e.preventDefault();
            const payload = {
                name: this.addAppointmentForm.name,
                status: this.addAppointmentForm.status,
                date: this.addAppointmentForm.date,
                time: this.addAppointmentForm.time,
            };
            this.addAppointments(payload);
        },


        // PUT or UPDATE an existing Appointment
        updateAppointments(payload, appointmentID) {
            const path = `http://localhost:5000/patient-dashboard/${appointmentID}`;
            fetch(path, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
                .then((response) => {
                    if (response.ok) {
                        this.getAppointments();
                        this.message = "Update Successfully!";
                        this.closeModal();
                        this.showMessage = true;
                        this.showAlert();
                        document.querySelector('.alert-message').style.background = '#f0e130';
                    } else {
                        throw new Error("Failed to update appointment");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.getAppointments();
                });
        },
        // Edits an appointment
        editAppointment(appointment) {
            this.editForm = { ...appointment };
            this.showEditModalState = true;
        },
        // Handles the submission of the edit appointment form
        onSubmitUpdate(e) {
            e.preventDefault();
            const payload = {
                name: this.editForm.name,
                status: this.editForm.status,
                date: this.editForm.date,
                time: this.editForm.time,
                IsDoctor: false,
            };
            this.updateAppointments(payload, this.editForm.id);
        },
        // Delete Individual appointment
        deleteAppointment(appointment) {
            const appointmentID = appointment.id;
            const path = `http://localhost:5000/patient-dashboard/${appointmentID}`;
            fetch(path, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (response.ok) {
                        this.getAppointments();
                        this.message = "Delete successfully!";
                        this.showMessage = true;
                        this.showAlert();
                        document.querySelector('.alert-message').style.background = '#ed5564';
                    } else {
                        throw new Error("Failed to delete appointment");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.getAppointments();
                });
        },
        promptDeleteAppointment(appointment) {
            this.appointmentToDelete = appointment;
            this.showDeleteModalState = true;
        },
        confirmDelete() {
            if (this.appointmentToDelete) {
                this.deleteAppointment(this.appointmentToDelete);
            }
            this.appointmentToDelete = null;
            this.showDeleteModalState = false;
        },
        cancelDelete() {
            this.appointmentToDelete = null;
            this.showDeleteModalState = false;
        },
        // Resets the form
        resetForm() {
            this.closeModal();
        },
        // Show the modal
        showModal() {
            this.showModalState = true;
        },
        // Closes the modal
        closeModal() {
            this.showModalState = false;
            this.showEditModalState = false;
        },
        // Function to show the message for 3 seconds
        showAlert() {
            this.showMessage = true;

            setTimeout(() => {
                this.showMessage = false;
                this.hideAlert(); // Call the hideAlert method after 3 seconds
            }, 3000);
        },

        hideAlert() {
            this.showMessage = false;
            this.$nextTick(() => {
                this.showMessage = false;
            });
        },

    },
};
</script>

<template>
    <div>
        <div class="alert-message" :class="{ 'show': showMessage, 'hide': !showMessage }">
            <!-- Alert Message -->
            <alert variant="success" v-if="showMessage" show>{{ message }}</alert>
        </div>
        <div v-if="dataLoaded" class="my-appointments">
            <div class="heading">
                <h2> My Appointments</h2>
                <div class="btn" @click="showModal" :class="{ 'hidden': !user }">Create Appointment</div>
            </div>
            <table class="appointments">
                <thead>
                    <td>Doctor's Name</td>
                    <td>Status</td>
                    <td>Date</td>
                    <td>Time</td>
                    <td>Actions</td>
                </thead>
                <tbody v-if="appointments.length > 0">
                    <tr v-for="appointment in appointments" :key="appointment.id">
                        <td>{{ appointment.name }}</td>
                        <td>{{ appointment.status }}</td>
                        <td>{{ appointment.date }}</td>
                        <td>{{ convertTo12HourFormat(appointment.time) }}</td>
                        <td v-if="appointment.status !== 'Accepted' && appointment.status !== 'Rejected'">
                            <i class="far fa-edit" @click="editAppointment(appointment)"></i>
                            <i class="far fa-trash-alt" @click="promptDeleteAppointment(appointment)"></i>
                        </td>
                        <td v-else>--/--</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <div class="note"> No Appointment Yet</div>
                </tbody>
            </table>
        </div>
        <!-- Add Appointment Modal -->
        <div>
            <div v-if="showModalState" class="overlay"></div>
            <div :class="{ modal: true, show: showModalState }" id="addAppointmentModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="close" data-dismiss="modal" @click="resetForm">
                                <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                            </div>
                            <h5 class="modal-title">Create Appointment</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit="onSubmit" @reset="onReset" class="w-100">
                                <label for="appoint-doctor">Appoint Doctor:</label>
                                <select id="appoint-doctor" v-model="addAppointmentForm.name" required>
                                    <option value="">Choose Doctor</option>
                                    <option v-for="(user, index) in usersWithRole1" :key="index"
                                        :value="(user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.') + ' ' + user.firstname + ' ' + user.lastname + ',' + user.id">
                                        {{ user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.' }} {{ user.firstname }} {{
                                            user.lastname }}
                                    </option>
                                </select>
                                <div class="form-group">
                                    <label for="form-date-input">Date:</label>
                                    <input id="form-date-input" type="date" v-model="addAppointmentForm.date" required>
                                </div>
                                <div class="form-group">
                                    <label for="form-time-input">Time:</label>
                                    <input id="form-time-input" type="time" v-model="addAppointmentForm.time" required>
                                </div>
                                <button type="submit" class="btn2">Submit</button>
                                <button @click="resetForm" class="btn3">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Add Appointment Modal -->


        <!-- Update Appointment Modal -->
        <div>
            <div v-if="showEditModalState" class="overlay"></div>
            <div :class="{ modal: true, show: showEditModalState }" id="updateAppointmentModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="close" data-dismiss="modal" @click="resetForm">
                                <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                            </div>
                            <h5 class="modal-title">Update Appointment</h5>
                        </div>
                        <div class="modal-body">
                            <form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
                                <label for="appoint-doctor">Appoint Doctor:</label>
                                <select id="appoint-doctor" v-model="editForm.name" required>
                                    <!-- <option value="">Choose Doctor</option> -->
                                    <option v-for="(user, index) in usersWithRole1" :key="index"
                                        :value="(user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.') + ' ' + user.firstname + ' ' + user.lastname">
                                        {{ user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.' }} {{ user.firstname }} {{
                                            user.lastname }}
                                    </option>
                                </select>
                                <div class="form-group">
                                    <label for="form-date-input">Date:</label>
                                    <input id="form-date-input" type="date" v-model="editForm.date" required>
                                </div>
                                <div class="form-group">
                                    <label for="form-time-input">Time:</label>
                                    <input id="form-time-input" type="time" v-model="editForm.time" required>
                                </div>
                                <button type="submit" class="btn2">Submit</button>
                                <button type="reset" class="btn3" @click="resetForm">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Update Appointment Modal -->


        <!-- Delete Appointment Modal -->
        <div v-if="showDeleteModalState" class="overlay"></div>
        <div :class="{ modal: true, show: showDeleteModalState }" id="deleteAppointmentModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="close" @click="cancelDelete">
                            <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                        </div>
                        <h5 class="modal-title">Delete Appointment</h5>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure you want to delete this appointment?</p>
                        <button type="button" class="btn2" @click="confirmDelete">Yes</button>
                        <button type="button" class="btn3" @click="cancelDelete">No</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- End of Delete Appointment Modal -->
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black */
    z-index: 1000;
    /* Ensure overlay is above other content */
}

.alert-message {
    /* background: skyblue; */
    border-radius: 25px;
    padding: 10px;
    display: none;
    transition: opacity 1s;
    /* Add a transition for opacity */
}

.alert-message.show {
    display: block;
    opacity: 1;
    /* Set opacity to 1 to make it visible */
}

.alert-message.hide {
    opacity: 0;
    /* Set opacity to 0 to make it invisible */
    display: block;
}

.note {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    font-weight: bold;
    opacity: 0.5;
}

.modal {
    display: none;
    background-color: #114A9c;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    width: 400px;
    z-index: 9999;
    animation: zoomIn 0.3s ease-in-out forwards;
}

@keyframes zoomIn {
    from {
        transform: translate(-50%, -50%) scale(0);
    }

    to {
        transform: translate(-50%, -50%) scale(1);
    }
}



.modal-title {
    font-size: 2rem;
    text-transform: uppercase;
}

.show {

    display: block;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
}

form {
    display: flex;
    flex-direction: column;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

label {
    font-weight: bold;
    color: #11449C;
    margin-bottom: 0.5rem;

}

input,
select {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.close {
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 9999;
}

.exit {
    font-size: 30px;
    font-weight: bold;
    color: red;
}

.fa-edit {
    background: #63b463;
}

.fa-edit:active {
    transform: scale(.8);
}

.fa-trash-alt {
    background: #ed5564;
}

.fa-trash-alt:active {
    transform: scale(.8);
}

.btn:active {
    transform: scale(.85);
}

/* Responsive */

@media(max-width:1370px) {
    .sidebar {
        width: 60px;
    }

    .main {
        width: calc(100% - 60px);
        left: 60px
    }

    .top-bar {
        width: calc(100% - 60px);
    }

    .sidebar h1 {
        background: url(images/edosa-logo3.png) no-repeat center center/cover;
        position: relative;
        width: 100%;
        height: 100px;
        background-size: contain;
        transition: 0.3s;
        align-items: center;
        border-bottom: 2px solid #114A9c;
    }
}

@media(max-width:1060px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .tables {
        grid-template-columns: 1fr;
    }
}

@media(max-width:630px) {
    .cards {
        grid-template-columns: 1fr;
    }

    .my-appointments td:nth-child(3) {
        display: none;
    }
}

@media(max-width:420px) {

    .my-appointments,
    .available-doctor {
        font-size: 70%;
        padding: 10px;
        min-height: 200px;
    }

    .cards,
    .tables {
        padding: 10px;
    }

    .search input {
        padding: 0 10px;
    }

    .user {
        width: 40px;
        height: 40px;
    }
}

.edit-profile {
    color: #81e0e0;
}
</style>