<script setup>
import { onMounted, ref } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const user = ref(null);
const dataLoaded = ref(false);
const total_appointments = ref(""); // Define a ref to hold total appointments count
const total_accepted_appointments = ref(""); // Define a ref to hold total accepted appointments count
const total_pending_appointments = ref(""); // Define a ref to hold total pending appointments count
const total_rejected_appointments = ref(""); // Define a ref to hold total pending appointments count


// Define a reactive variable to control the modal visibility
const viewProfileState = ref(false);
const selectedUser = ref(null);

// Method to open the profile modal and set the selected user
const openProfileModal = (user) => {
    selectedUser.value = user;
    viewProfileState.value = true;
};

// Method to close the profile modal
const closeProfileModal = () => {
    viewProfileState.value = false;
};




const editProfile = () => {
    router.push('/profile');
}

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            user.value = response.data.profile;
            setTimeout(function () {
                dataLoaded.value = true;
            }, 900);
        } else {
            console.error('Failed to fetch profile:', response.data.message);
        }
        // Fetch total appointments
        const appointmentsResponse = await axios.get('http://localhost:5000/patient-dashboard/appointments/count', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (appointmentsResponse.status === 200) {
            total_appointments.value = appointmentsResponse.data.total_appointments;
        } else {
            console.error('Failed to fetch total appointments:', appointmentsResponse.data.message);
        }

        // Fetch total accepted appointments
        const acceptedAppointmentsResponse = await axios.get('http://localhost:5000/patient-dashboard/appointments/accepted/count', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (acceptedAppointmentsResponse.status === 200) {
            total_accepted_appointments.value = acceptedAppointmentsResponse.data.total_accepted_appointments;
        } else {
            console.error('Failed to fetch total accepted appointments:', acceptedAppointmentsResponse.data.message);
        }

        // Fetch total pending appointments
        const pendingAppointmentsResponse = await axios.get('http://localhost:5000/patient-dashboard/appointments/pending/count', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (pendingAppointmentsResponse.status === 200) {
            total_pending_appointments.value = pendingAppointmentsResponse.data.total_pending_appointments;
        } else {
            console.error('Failed to fetch total pending appointments:', pendingAppointmentsResponse.data.message);
        }

        // Fetch total rejected appointments
        const rejectedAppointmentsResponse = await axios.get('http://localhost:5000/patient-dashboard/appointments/rejected/count', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (rejectedAppointmentsResponse.status === 200) {
            total_rejected_appointments.value = rejectedAppointmentsResponse.data.total_rejected_appointments;
        } else {
            console.error('Failed to fetch total rejected appointments:', rejectedAppointmentsResponse.data.message);
        }
    } catch (error) {
        console.error('Error fetching profile or appointments:', error);
    }
});
</script>

<script>
export default {
    data() {
        return {
            usersWithRole1: [], // Add this array to store users with role_id 1
            appointments: [],
            viewAllAppointments: false, // Separate state variable for appointments
            viewAllDoctors: false, // Separate state variable for doctors
            showDeleteModalState: false,
            showEditModalState: false, // Add this to control the Edit modal
            showProfileModalState: false,
            showSurveyModalState: false,
            appointmentToDelete: null,
            editForm: { // Define the edit form data
                name: "",
                status: "Pending",
                date: "",
                time: "",
            },
            profileData: [],
            surveyData: null, // Add a variable to store survey data
        };
    },
    computed: {
        // Computed property for displayed appointments based on the viewAllAppointments state
        displayedAppointments() {
            if (this.viewAllAppointments) {
                return this.appointments;
            } else {
                return this.appointments.slice(0, 4); // Adjust as needed
            }
        },
        // Computed property for displayed doctors based on the viewAllDoctors state
        displayedDoctors() {
            if (this.viewAllDoctors) {
                return this.usersWithRole1;
            } else {
                return this.usersWithRole1.slice(0, 4); // Adjust as needed
            }
        }
    },
    mounted() {
        this.getUsersWithRole1(); // Call the new method to get users with role_id 1
        this.getAppointments();
    },

    methods: {
        // GET users with role_id 1 from the server
        getUsersWithRole1() {
            fetch("http://localhost:5000/get_users_with_role_1", {
                method: "GET",
            })
                .then((response) => response.json())
                .then((data) => {
                    this.usersWithRole1 = data.users;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        toggleViewAppointments() {
            this.viewAllAppointments = !this.viewAllAppointments;
        },
        // Method to toggle view for doctors
        toggleViewDoctors() {
            this.viewAllDoctors = !this.viewAllDoctors;
        },
        convertTo12HourFormat(time24) {
            const [hours, minutes] = time24.split(':');
            let period = 'AM';
            let hours12 = parseInt(hours, 10);

            if (hours12 >= 12) {
                period = 'PM';
                if (hours12 > 12) {
                    hours12 -= 12;
                }
            }

            return `${hours12}:${minutes} ${period}`;
        },
        updateDisplayedAppointments() {
            if (this.viewAll) {
                this.displayedAppointments = this.appointments;
            } else {
                // Display subset of appointments (from 3 to 5)
                this.displayedAppointments = this.appointments.slice(0, 5); // Change indices accordingly
            }
        },
        // GET or SHOW appointments from the server
        getAppointments() {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');

            // Check if the token is available
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }

            // Make the fetch request with the token
            fetch("http://localhost:5000/patient-dashboard", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}` // Set the Authorization header with the retrieved token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    this.appointments = data.appointments;
                    this.updateDisplayedAppointments();
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
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
                IsDoctor: true,
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
            this.showProfileModalState = false;
            this.showSurveyModalState = false;
        },
        fetchProfileForAppointment(appointment) {
            const appointmentID = appointment.id;
            const path = `http://localhost:5000/appointments/${appointmentID}`;
            fetch(path, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Include authorization token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        this.showProfileModalState = true; // Show the profile modal
                        this.profileData = data.appointment.profile; // Store profile data
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error
                });
        },
        // Method to close the profile modal
        closeProfileModal() {
            this.showProfileModalState = false;
            this.profileData = null; // Reset profile data
        },
        calculateBMI(weight, height) {
            // Convert height to meters
            let heightInMeters = height / 100; // Assuming height is in centimeters
            // Calculate BMI
            return (weight / (heightInMeters * heightInMeters)).toFixed(2);
        },
        getBMICategory(bmi) {
            if (bmi < 18.5) {
                return 'Underweight';
            } else if (bmi >= 18.5 && bmi < 24.9) {
                return 'Normal weight';
            } else if (bmi >= 24.9 && bmi < 29.9) {
                return 'Overweight';
            } else {
                return 'Obese';
            }
        },
        openSurvey(appointment) {
            // Fetch survey data based on the appointment
            const appointmentID = appointment.id;
            fetch(`http://localhost:5000/survey/${appointmentID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Include authorization token
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'success') {
                        this.surveyData = data.survey;
                        this.showSurveyModalState = true;
                    } else {
                        throw new Error(data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    // Handle error
                });
        },
        computeOSARisk() {
            let yesCount = 0;

            // Count the number of 'Yes' answers
            if (this.surveyData.snoring) yesCount++;
            if (this.surveyData.tired) yesCount++;
            if (this.surveyData.observed) yesCount++;
            if (this.surveyData.pressure) yesCount++;
            if (this.surveyData.bmi) yesCount++;
            if (this.surveyData.testage) yesCount++;
            if (this.surveyData.neck) yesCount++;
            if (this.surveyData.testgender) yesCount++;

            // Check additional conditions for OSA risk
            const stopQuestionsYesCount = 0; // Assuming you have the count of yes to STOP questions
            const bmi = parseFloat(this.surveyData.bmi);
            const neckCircumference = parseFloat(this.surveyData.neck); // Assuming neck circumference is in inches

            if (
                yesCount >= 5 ||
                (stopQuestionsYesCount >= 2 && this.surveyData.testgender === 'male') ||
                (stopQuestionsYesCount >= 2 && bmi > 35) ||
                (stopQuestionsYesCount >= 2 && neckCircumference >= 16)
            ) {
                return 'OSA - High Risk';
            } else if (yesCount >= 3 || (stopQuestionsYesCount >= 2)) {
                return 'OSA - Intermediate Risk';
            } else if (yesCount >= 0 && yesCount <= 2) {
                return 'OSA - Low Risk';
            } else {
                return 'Unable to determine OSA risk';
            }
        }
    }
};
</script>

<template>
    <div class="container">
        <Sidebar />
        <div class="main">
            <div class="top-bar">
                <div class="search">
                    <input type="text" name="search" placeholder="Search here">
                    <label for="search"><i class="fas fa-search"></i></label>
                </div>
                <i class="fas fa-bell"></i>
                <div class="user">
                    <div class="patient-photo-container" :class="{ 'hidden': !user || !user.gender }">
                        <div class="patient-photo" :class="{ 'female': user && user.gender.toLowerCase() === 'female' }">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="dataLoaded">
                <div class="cards">
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ total_appointments }}</div>
                            <div class="card-name">Total Appointments</div>
                        </div>
                        <div class="icon-box">
                            <i class="fas fa-briefcase-medical"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ total_accepted_appointments }}</div>
                            <div class="card-name">Accepted Appointments</div>
                        </div>
                        <div class="icon-box">
                            <i class="fa-solid fa-bed"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ total_pending_appointments }}</div>
                            <div class="card-name">Pending Appointments</div>
                        </div>
                        <div class="icon-box">
                            <i class="fa-solid fa-hourglass"></i>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ total_rejected_appointments }}</div>
                            <div class="card-name">Rejected Appointments</div>
                        </div>
                        <div class="icon-box">
                            <i class="fa-solid fa-user-xmark"></i>
                        </div>
                    </div>
                </div>
                <header>
                    <div class="welcome-form">
                        <div class="welcome-banner">
                            <div v-if="user?.lname && user?.fname != null">
                                <h1>Welcome, <a @click="editProfile" class="edit-profile"> {{ user?.gender.toLowerCase() ===
                                    'male' ? 'Dr.' : 'Dra.' }} {{ user?.fname }} {{ user?.lname }}</a></h1>
                                <h2>Have a nice day!</h2>
                            </div>
                            <div v-else>
                                <h1>Welcome, <a @click="editProfile" class="edit-profile">Create Profile</a></h1>
                                <h2>Have a nice day!</h2>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="tables">
                    <div class="recent-appointments">
                        <div class="heading">
                            <h2>Recent Appointments</h2>
                            <a href="#" class="btn" @click.prevent="toggleViewAppointments">{{ viewAllAppointments ?
                                'View Less' : 'View All' }}</a>
                        </div>
                        <table class="appointments">
                            <thead>
                                <td>Patient's Name</td>
                                <td>Status</td>
                                <td>Date</td>
                                <td>Time</td>
                                <td>Actions</td>
                            </thead>
                            <tbody v-if="appointments.length > 0">
                                <tr v-for="appointment in displayedAppointments" :key="appointment.id">
                                    <td>{{ appointment.name }}</td>
                                    <td>{{ appointment.status }}</td>
                                    <td>{{ appointment.date }}</td>
                                    <td>{{ convertTo12HourFormat(appointment.time) }}</td>
                                    <td>
                                        <div>
                                            <i class="far fa-eye" @click="fetchProfileForAppointment(appointment)"></i>
                                            <i class="fa-solid fa-square-poll-horizontal"
                                                @click="openSurvey(appointment)"></i>
                                            <i class="far fa-edit" @click="editAppointment(appointment)"></i>
                                            <i class="far fa-trash-alt" @click="promptDeleteAppointment(appointment)"></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <div class="note"> No Appointment Yet</div>
                            </tbody>
                        </table>
                    </div>
                    <div class="available-doctor">
                        <div class="heading">
                            <h2>Available Doctors</h2>
                            <a href="#" class="btn" @click.prevent="toggleViewDoctors">{{ viewAllDoctors ? 'View Less' :
                                'View All' }}</a>

                        </div>
                        <table class="availabilty">
                            <thead>
                                <td>Profile</td>
                                <td>Name</td>
                                <td>Detail</td>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in displayedDoctors" :key="index">
                                    <td class="patient-photo-container" :class="{ 'hidden': !user || !user.gender }">
                                        <div class="patient-photo"
                                            :class="{ 'female': user && user.gender.toLowerCase() === 'female' }"></div>
                                    </td>
                                    <td>{{ user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.' }} {{ user.firstname }} {{
                                        user.lastname }}</td>
                                    <td>
                                        <div class="actions-buttons">
                                            <i class="far fa-eye" @click="openProfileModal(user)"></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- View Patient Profile Modal -->
                <div>
                    <div v-if="showProfileModalState" class="overlay"></div>
                    <div :class="{ modal: true, show: showProfileModalState }">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div class="close" data-dismiss="modal" @click="resetForm">
                                        <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                                    </div>
                                    <h5 class="modal-title"> Patient's Profile</h5>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div>
                                            <div class="patient-photo-container1"
                                                :class="{ 'hidden': !profileData.gender }">
                                                <div class="patient-photo1"
                                                    :class="{ 'female': profileData.gender && profileData.gender.toLowerCase() === 'female' }">
                                                </div>
                                            </div>
                                            <label for="patient-name">Patient's Name:</label>
                                            <td>{{ profileData.fname }} {{ profileData.mname }} {{ profileData.lname }}
                                            </td>
                                            <label for="patient-age">Age:</label>
                                            <td>{{ profileData.age }} yrs old</td>
                                            <label for="patient-gender">Gender:</label>
                                            <td style="text-transform: capitalize;">{{ profileData.gender }}</td>
                                            <label for="patient-height">Height:</label>
                                            <td>{{ profileData.height }} cm</td>
                                            <label for="patient-weight">Weight:</label>
                                            <td>{{ profileData.weight }} kg</td>
                                            <label for="patient-bmi">Body Mass Index:</label>
                                            <td>{{ calculateBMI(profileData.weight, profileData.height) }}</td>
                                            <label for="patient-category">Category:</label>
                                            <td>{{ getBMICategory(calculateBMI(profileData.weight, profileData.height))
                                            }}</td>
                                        </div>
                                        <button type="reset" class="btn2" @click="resetForm">Okay</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of View Patient Profile Modal -->


                <!-- View Survey Modal -->
                <div>
                    <div v-if="showSurveyModalState" class="overlay"></div>
                    <div :class="{ modal: true, show: showSurveyModalState }">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div class="close" data-dismiss="modal" @click="resetForm">
                                        <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                                    </div>
                                    <h5 class="modal-title">STOP-BANG Result</h5>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div>
                                            <div class="patient-photo-container1"
                                                :class="{ 'hidden': !profileData.gender }">
                                                <div class="patient-photo1"
                                                    :class="{ 'female': profileData.gender && profileData.gender.toLowerCase() === 'female' }">
                                                </div>
                                            </div>
                                            <div v-if="surveyData">
                                                <div class="column">
                                                    <label for="snoring">Snoring:</label>
                                                    <span>{{ surveyData.snoring ? 'Yes' : 'No' }}</span>
                                                    <label for="tired">Tired:</label>
                                                    <span>{{ surveyData.tired ? 'Yes' : 'No' }}</span>
                                                    <label for="observed">Observed:</label>
                                                    <span>{{ surveyData.observed ? 'Yes' : 'No' }}</span>
                                                    <label for="pressure">Pressure:</label>
                                                    <span>{{ surveyData.pressure ? 'Yes' : 'No' }}</span>
                                                </div>
                                                <div class="column">
                                                    <label for="bmi">BMI:</label>
                                                    <span>{{ surveyData.bmi ? 'Yes' : 'No' }}</span>
                                                    <label for="age">Age:</label>
                                                    <span>{{ surveyData.testage ? 'Yes' : 'No' }}</span>
                                                    <label for="neck">Neck:</label>
                                                    <span>{{ surveyData.neck ? 'Yes' : 'No' }}</span>
                                                    <label for="gender">Gender:</label>
                                                    <span>{{ surveyData.testgender ? 'Yes' : 'No' }}</span>
                                                </div>
                                                <h3>Result: {{ computeOSARisk() }}</h3>

                                            </div>
                                        </div>
                                        <button type="reset" class="btn2" @click="resetForm">Okay</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of View Survey Modal -->


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
                                    <h5 class="modal-title"> Status Update</h5>
                                </div>
                                <div class="modal-body">
                                    <form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
                                        <label for="appoint-doctor">Patient's Name:</label>
                                        <div>{{ editForm.name }}</div>
                                        <div class="form-group">
                                            <label for="form-status-input">Status:</label>
                                            <select id="form-status-input" v-model="editForm.status" required>
                                                <option>Pending</option>
                                                <option>Accepted</option>
                                                <option>Rejected</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="form-date-input">Date:</label>
                                            <div>{{ editForm.date }}</div>
                                        </div>
                                        <div class="form-group">
                                            <label for="form-time-input">Time:</label>
                                            <div>{{ convertTo12HourFormat(editForm.time) }}</div>
                                        </div>
                                        <button type="submit" class="btn2">Update</button>
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
                <div :class="{ modal: true, show: showDeleteModalState }">
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

                <!-- View Doctor Profile Modal -->
                <div v-if="viewProfileState" class="overlay"></div>
                <div v-if="viewProfileState" class="modal1" id="viewProfileModal">
                    <!-- Modal content -->
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div class="close" data-dismiss="modal" @click="closeProfileModal">
                                    <span aria-hidden="false" class="exit"><i class="fa-solid fa-xmark"></i></span>
                                </div>
                                <h5 class="modal-title">Doctor's Profile</h5>
                            </div>
                            <div class="modal-body">
                                <form @reset="onResetUpdate" class="w-100">
                                    <div class="patient-photo-container1"
                                        :class="{ 'hidden': !selectedUser || !selectedUser.gender }">
                                        <div class="patient-photo"
                                            :class="{ 'female': selectedUser && selectedUser.gender.toLowerCase() === 'female' }">
                                        </div>
                                    </div>
                                    <label for="appoint-doctor">Doctor's Name:</label>
                                    <div>{{ selectedUser.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.' }} {{
                                        selectedUser.firstname }} {{ selectedUser.lastname }}</div>
                                    <div class="form-group">
                                        <label for="form-status-input">Age:</label>
                                        <div>{{ selectedUser.age }} yrs old</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="form-date-input">Gender:</label>
                                        <div style="text-transform: capitalize;">{{ selectedUser.gender }}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="form-time-input">Email:</label>
                                        <div>{{ selectedUser.email }}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="form-time-input">Contact Number:</label>
                                        <div>{{ selectedUser.contact_no }}</div>
                                    </div>
                                    <button type="reset" class="btn2" @click="closeProfileModal">Okay</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End of View Doctor Profile Modal -->
            </div>
            <div v-else>
                <div class="loading"><i class="fa-solid fa-spinner"></i>
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
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

.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-0%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 50px;
    color: #326ABD;
}

.loading h1 {
    margin-top: 10px;
    font-size: 25px;
    color: #444;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Apply animation to the spinner icon */
.fa-spinner {
    animation: spin 2s linear infinite;
    /* Spin continuously */
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

.modal1 {
    /* display: none; */
    background-color: #114A9c;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

.patient-photo-container {
    position: relative;
    display: flex;
    height: 5vh;
    width: 5vw;
    background-size: contain;

}

.patient-photo.female {
    background: url(images/profile2.jpg) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.patient-photo:not(.female) {
    background: url(images/profile1.jpg) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}


.patient-photo-container1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 10vh;
    width: 10vw;
    background-size: contain;
}


.patient-photo1.female {
    background: url(images/-patient-profile1.png) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.patient-photo1:not(.female) {
    background: url(images/patient-profile2.png) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.hidden {
    display: none;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body {
    overflow-x: hidden;
}

.container {
    position: relative;
    width: 100%;
}

.main {
    position: absolute;
    width: calc(100% - 300px);
    min-height: 100vh;
    left: 300px;
    background: #fff;
}

.top-bar {
    position: fixed;
    height: 60px;
    width: calc(100% - 300px);
    background: #296FD7;
    display: grid;
    grid-template-columns: 10fr 0.4fr 1fr;
    grid-gap: 5px;
    align-items: center;
    color: black;
    padding: 0 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.top-bar .search {
    position: relative;
    max-width: 500px;
}

.search input {
    width: 100%;
    min-width: 128px;
    height: 40px;
    padding: 0 40px;
    font-size: 16px;
    outline: none;
    border-radius: 40px;
    background: #f5f5f5;

}

.search i {
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
    border-radius: 40px;
}

.user {
    position: relative;
    width: 50px;
    height: 50px;
}

img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
}

.cards {
    margin-top: 60px;
    width: 100%;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
}

.cards .card {
    background: linear-gradient(-50deg, whitesmoke, #114A9c);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
}

.number {
    font-size: 35px;
    font-weight: 500;
    color: whitesmoke;
}

.card-name {

    font-weight: 600;
}

.icon-box i {
    font-size: 45px;
}

.card-img {
    position: relative;
    align-items: center;
    width: 100%;
}

.welcome-form {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(312deg, whitesmoke, #326ABD, #114A9c);
    height: 20vh;
    width: 98%;
    border-radius: 40px;
    margin: 10px;
    height: 100%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9);
    animation: slideRight 1s ease forwards;
    opacity: 0;
}

@keyframes slideRight {
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}


.welcome-banner {
    position: relative;
    font-size: 1.5rem;
    color: white;
    width: 100%;
    height: 100%;
    padding: 30px;
}


.tables {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
    align-items: self-start;
    padding: 0 20px 20px 20px;
}

.img-box-small {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.recent-appointments {
    position: relative;
    min-height: 350px;
    background: whitesmoke;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.available-doctor {
    min-height: 350px;
    background: whitesmoke;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #444;
}

.btn {
    padding: 5px 10px;
    background: #114A9c;
    text-decoration: none;
    text-align: center;
    color: whitesmoke;
    font-size: 1.4rem;
    border-radius: 50px;
}

.btn:active {
    padding: 5px 10px;
    background: whitesmoke;
    text-decoration: none;
    text-align: center;
    color: #114A9c;
    border: 2px solid #114A9c;
    border-radius: 50px;
}

table {
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
}

thead td {
    font-weight: 600;
    color: #333;

}

table tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

tbody tr:hover {
    background: skyblue;
}

image.png table tbody tr:last-child {
    border-bottom: none;
}

td {
    padding: 9px 5px;

}

td i {
    padding: 7px;
    color: #fff;
    border-radius: 50px;
    font-size: 1rem;
    margin: 2px;
}

.recent-appointments table tbody td:last-child {
    white-space: nowrap;
}

.fa-eye {
    background: #32bea6;
}

.fa-eye:active {
    transform: scale(.8);
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

.fa-square-poll-horizontal {
    background: #326ABD;
}

.modal {
    display: none;
    background-color: #114A9c;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    width: 400px;
    z-index: 9999;
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
    text-decoration: underline;


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

.btn2,
.btn3 {
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    margin: 5px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
}

.btn2 {
    background-color: #4CAF50;
    color: #fff;
}

.btn3 {
    background-color: #f44336;
    color: #fff;
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

.column {
    float: left;
    width: 50%; /* Adjust the width as needed */
}

.column label {
    display: block;
    margin-bottom: 5px;
}

.column span {
    display: block;
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
        position: relative;
        width: 100%;
        height: 100px;
        background-size: contain;
        transition: 0.3s;
        align-items: center;
        border-bottom: 2px solid #114A9c;
    }

    .btn {
        font-size: 1.3rem;
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

    .recent-appointments td:nth-child(3) {
        display: none;
    }
}

@media(max-width:420px) {

    .recent-appointments,
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

.edit-profile:hover {
    color: #f0e130;
    text-decoration: underline;
}
</style>