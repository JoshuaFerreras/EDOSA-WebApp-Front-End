<script setup>
import Sidebar from '../../components/Sidebar.vue';
import AppointmentsComponent from '../../components/AppointmentsComponent.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();
const user = ref(null);



// Define a reactive variable to control the modal visibility
const viewProfileState = ref(false);
const dataLoaded = ref(false);
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

const resetData = () => {
    Severity.value = "";
    Hypopnea.value = "";
    AHI.value = "";
    Apnea.value = "";
    Normal.value = "";
};


const editProfile = () => {
    router.push('/profile');
}
const result = () => {
    router.push('/patient-result');
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
            retrieveUserData(); // Call retrieveUserData when user changes
            resetData(); // Reset data when user changes
            setTimeout(function () {
                dataLoaded.value = true;
            }, 900);
        } else {
            console.error('Failed to fetch profile:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
});
</script>

<script>
export default {
    data() {
        return {
            usersWithRole1: [], // Assuming this is your array of available doctors
            viewAll: false
        };
    },
    computed: {
        displayedUsers() {
            if (this.viewAll) {
                return this.usersWithRole1;
            } else {
                // Display subset of users (3 to 5)
                return this.usersWithRole1.slice(0, 4); // Change indices accordingly
            }
        }
    },
    mounted() {
        // Fetch all users initially
        this.getUsersWithRole1();
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
        toggleView() {
            this.viewAll = !this.viewAll;
        },
        formatAHI(value) {
            // Ensure value is a number and format it to 3 decimal places
            const num = parseFloat(value);
            return isNaN(num) ? '' : num.toFixed(3);
        }
    },
};

const userData = ref([]);
const retrieveUserData = async () => {
    try {
        const response = await axios.post("http://localhost:5000/retrieveUserData", {
            UserID: localStorage.getItem("userId"),
        });
        if (response.status === 200) {
            let data = await response.data;
            userData.value.push({ data }); // Update the user data
            retrieveAHIData(data.Time[0].TimeIn, data.Time[0].TimeOut);
            console.log(data);
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// const userAHIData = ref([]);
const Severity = ref(""); // for add
const AHI = ref(""); // for add
const Normal = ref(""); // for add
const Apnea = ref(""); // for add
const Hypopnea = ref(""); // for add

const retrieveAHIData = async (timeIn, timeOut) => {
    try {
        const response = await axios.post("http://localhost:5000/retrieveAHItable", {
            UserID: localStorage.getItem("userId"), // Replace with localStorage.getItem("userId") if needed
            TimeIn: timeIn,
            TimeOut: timeOut,
        });

        if (response.status === 200) {

            let data = await response.data;
            Severity.value = data.Severity; // for add
            AHI.value = data.AHI; // for add
            Normal.value = data.Normal; // for add
            Apnea.value = data.Apnea; // for add
            Hypopnea.value = data.Hypopnea; // for add


            console.log("Request Succesful")
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
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
                        <div class="patient-photo1" :class="{ 'female': user && user.gender.toLowerCase() === 'female' }">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" v-if="dataLoaded">
                <div class="cards1">
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ Severity }}</div>
                            <div class="card-name">Severity</div>
                        </div>
                        <div class="icon-box">
                            <img src="images/heart-impulse.png" alt="Avatar" class="card-img">
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ Hypopnea }}</div>
                            <div class="card-name">Hypopnea</div>
                        </div>
                        <div class="icon-box">
                            <img src="images/oxygen-level.png" alt="Avatar" class="card-img">
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ formatAHI(AHI) }}</div>
                            <div class="card-name">AHI Score</div>
                        </div>
                        <div class="icon-box">
                            <img src="images/AHI-Score.png" alt="Avatar" style="width: 70%; margin-left: 50px;"
                                class="card-img">
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ Apnea }}</div>
                            <div class="card-name">Apnea</div>
                        </div>
                        <div class="icon-box">
                            <img src="images/airflow.png" alt="Avatar" style="width: 70%; margin-left: 50px;"
                                class="card-img">
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="number">{{ Normal }}</div>
                            <div class="card-name">Normal</div>
                        </div>
                        <div class="icon-box">
                            <img src="images/bloodpressure-level.png" alt="Avatar" style="width: 70%; margin-left: 50px;"
                                class="card-img">
                        </div>
                    </div>
                </div>
                <div class="hide-btn" :class="{ 'hidden': !user }">
                    <button class="result-btn" @click="result"><i class="fa-solid fa-plus"></i>See More</button>
                </div>
                <header>
                    <div class="welcome-form">
                        <div class="welcome-banner">
                            <div v-if="user?.lname && user?.fname != null">
                                <h1>Welcome, <a @click="editProfile" class="edit-profile">{{ user?.fname }} {{ user?.lname
                                }}.</a> Have a nice day!</h1>
                                <h2>User ID: {{ user?.user_Id }}</h2>
                            </div>
                            <div v-else>
                                <h1>Welcome, <a @click="editProfile" class="edit-profile"> New Guest!</a></h1>
                                <h2>You must setup My Profile first.</h2>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="tables">
                    <AppointmentsComponent />
                    <div class="available-doctor">
                        <div class="heading">
                            <h2>Available Doctors</h2>
                            <a href="#" class="btn" @click.prevent="toggleView">{{ viewAll ? 'View Less' : 'View All' }}</a>
                        </div>
                        <table class="availabilty">
                            <thead>
                                <td>Profile</td>
                                <td>Name</td>
                                <!-- <td>Status</td> -->
                                <td>Detail</td>
                            </thead>
                            <tbody>
                                <tr v-for="(user, index) in displayedUsers" :key="index">
                                    <td class="patient-photo-container" :class="{ 'hidden': !user || !user.gender }">
                                        <div class="patient-photo"
                                            :class="{ 'female': user && user.gender.toLowerCase() === 'female' }"></div>
                                    </td>
                                    <td>{{ user.gender.toLowerCase() === 'male' ? 'Dr.' : 'Dra.' }} {{ user.firstname }} {{
                                        user.lastname }}</td>
                                    <!-- <td></td> -->
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
                <!-- View Profile Modal -->
                <div v-if="viewProfileState" class="overlay"></div>
                <div v-if="viewProfileState" class="modal" id="viewProfileModal">
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
                                        <div>{{ selectedUser.age }}</div>
                                    </div>
                                    <div class="form-group">
                                        <label for="form-date-input">Gender:</label>
                                        <div>{{ selectedUser.gender }}</div>
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
                <!-- End of View Profile Modal -->
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

@keyframes zoomIn {
    from {
        transform: translate(-50%, -50%) scale(0);
    }

    to {
        transform: translate(-50%, -50%) scale(1);
    }
}

.modal {
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
    animation: zoomIn 0.3s ease forwards;
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
    text-decoration: underline;
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
    background: url(images/patient-profile1.png) no-repeat center center/cover;
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

.cards1 {
    margin-top: 60px;
    width: 100%;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;

}

.card {
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
    display: flex;
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

.my-appointments {
    position: relative;
    /* margin-top: 90px; */
    min-height: 350px;
    background: whitesmoke;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.available-doctor {
    /* margin-top: 90px; */
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

.result-btn {
    display: none;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1px 10px;
    margin: auto;
    background: whitesmoke;
    text-decoration: none;
    text-align: center;
    color: #114A9C;
    font-size: 1.5rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.result-btn:active {
    transform: scale(1.1);
}

.btn {
    padding: 5px 10px;
    background: #114A9C;
    text-decoration: none;
    text-align: center;
    color: whitesmoke;
    font-size: 1.3rem;
    border-radius: 50px;
    cursor: pointer;
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

.btn:active {
    padding: 5px 10px;
    background: whitesmoke;
    text-decoration: none;
    text-align: center;
    color: #114A9c;
    border: 2px solid #114A9c;
    border-radius: 50px;
    cursor: pointer;
}

.actions-buttons {
    cursor: pointer;
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
    margin: 2px;
    color: #fff;
    border-radius: 50px;
}

.my-appointments table tbody td:last-child {
    white-space: nowrap;
}

.fa-eye {
    background: #32bea6;
}

.fa-eye:active {
    transform: scale(.8);
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
    .cards1 {
        grid-template-columns: repeat(2, 1fr);
    }

    .tables {
        grid-template-columns: 1fr;
    }
}

@media(max-width:630px) {
    .cards1 {
        grid-template-columns: 1fr;
    }

    .my-appointments td:nth-child(3) {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    .result-btn {
        font-size: 1.2rem;
        padding: 8px 16px;
    }
}

/* Adjust button size for even smaller screens */
@media only screen and (max-width: 480px) {
    .result-btn {
        font-size: 1rem;
        padding: 6px 12px;
    }
}

@media(max-width:420px) {

    .my-appointments,
    .available-doctor {
        font-size: 70%;
        padding: 10px;
        min-height: 200px;
    }

    .cards1,
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
    cursor: pointer;
}

.edit-profile:hover {
    color: #f0e130;
    text-decoration: underline;
}

/* Adjust button position for smaller screens */
@media only screen and (max-width: 320px) {
    .result-btn {
        margin-top: 20px;
    }
}
</style>