<script setup>
import { onMounted, ref } from 'vue';
import Sidebar from '../../components/Sidebar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);

const editProfile = () => {
    router.push('/profile');
}

onMounted(async () => {
  const data = await axios.get('/me');
  user.value = data.data.data;
});
</script>

<template>
    <div class="container">
        <Sidebar/>
        <div class="main">
            <div class="top-bar">
                <div class="search">
                    <input type="text" name="search" placeholder="Search here">
                    <label for="search"><i class="fas fa-search"></i></label>
                </div>
                <i class="fas fa-bell"></i>
                <div class="user">
                    <img src="images/doctor1.2.jpg" alt="">
                </div>
            </div>
            <div class="cards">
                <div class="card">
                    <div class="card-content">
                        <div class="number">67</div>
                        <div class="card-name">Appointments</div>
                    </div>
                    <div class="icon-box">
                        <i class="fas fa-briefcase-medical"></i>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="number">110</div>
                        <div class="card-name">New Patients</div>
                    </div>
                    <div class="icon-box">
                        <i class="fa-solid fa-bed"></i>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="number">84</div>
                        <div class="card-name">Pending Tests</div>
                    </div>
                    <div class="icon-box">
                        <i class="fa-solid fa-hourglass"></i>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="number">30</div>
                        <div class="card-name">Test Results</div>
                    </div>
                    <div class="icon-box">
                        <i class="fa-solid fa-file-circle-check"></i>
                    </div>
                </div>
            </div>
            <header>
                <div class="welcome-form">
                    <div class="welcome-banner">
                        <div v-if="user?.info.first_name != null">
                            <h1>Welcome, {{ user?.info.last_name }}</h1>
                            <h2>Have a nice day!</h2>
                        </div>
                        <div v-else>
                            <h1>Welcome, <a @click="editProfile" class="edit-profile">Edit Profile</a></h1>
                            <h2>Have a nice day!</h2>
                        </div>
                    </div>
                </div>
            </header>
            <div class="tables">
                <div class="recent-appointments">
                    <div class="heading">
                        <h2>Recent Appointments</h2>
                        <a href="" class="btn">View All</a>
                    </div>
                    <table class="appointments">
                        <thead>
                            <td>Name</td>
                            <td>Age</td>
                            <td>BMI</td>
                            <td>Actions</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Marie Alexis Miravite</td>
                                <td>30 years old</td>
                                <td>36.3 - Obesesity</td>
                                <td>
                                    <RouterLink to="/doctor-patient-profile">
                                        <i class="far fa-eye"> View Profile</i>
                                    </RouterLink>
                                    <RouterLink to="/doctor-patient-result">
                                        <i class="far fa-edit"> Check Result</i>
                                    </RouterLink>
                                </td>
                            </tr>
                            <tr>
                                <td>Juan J. Dela Cruz</td>
                                <td>55 years old</td>
                                <td>31 - Obesesity</td>
                                <td>
                                    <RouterLink to="/patient-appointment">
                                        <i class="far fa-eye"> View Profile</i>
                                    </RouterLink>
                                    <RouterLink to="/patient-myprofile">
                                        <i class="far fa-edit"> Check Result</i>
                                    </RouterLink>
                                </td>
                            </tr>
                            <!-- <tr>
                                <td>Jane Doe</td>
                                <td>Pending Result</td>
                                <td>November 10, 2022</td>
                                <td>
                                    <i class="far fa-eye"></i>
                                    <i class="far fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>James Doe</td>
                                <td>Pending Result</td>
                                <td>November 16, 2022</td>
                                <td>
                                    <i class="far fa-eye"></i>
                                    <i class="far fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Jenny Doe</td>
                                <td>Apnea</td>
                                <td>December 06, 2022</td>
                                <td>
                                    <i class="far fa-eye"></i>
                                    <i class="far fa-edit"></i>
                                    <i class="far fa-trash-alt"></i>
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <div class="available-doctor">
                    <div class="heading">
                        <h2>Available Doctors</h2>
                        <a href="" class="btn">View All</a>
                    </div>
                    <table class="availabilty">
                        <thead>
                            <td>Photo</td>
                            <td>Name</td>
                            <td>Status</td>
                            <td>Detail</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="img-box-small">
                                        <img src="images/profile2.jpg" alt="">
                                    </div>
                                </td>
                                <td>Dra. Jane Doe</td>
                                <td>Off-Duty</td>
                                <td><i class="far fa-eye"></i></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="img-box-small">
                                        <img src="images/profile1.jpg" alt="">
                                    </div>
                                </td>
                                <td>Dr. James Doe</td>
                                <td>On-Duty</td>
                                <td><i class="far fa-eye"></i></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="img-box-small">
                                        <img src="images/profile4.jpg.png" alt="">
                                    </div>
                                </td>
                                <td>Dra. Jenny Doe</td>
                                <td>Off-Duty</td>
                                <td><i class="far fa-eye"></i></td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="img-box-small">
                                        <img src="images/profile3.jpg" alt="">
                                    </div>
                                </td>
                                <td>Dr. John Doe</td>
                                <td>On-Duty</td>
                                <td><i class="far fa-eye"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

body{
    overflow-x: hidden;
}

.container{
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

.top-bar{
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

.top-bar .search{
    position: relative;
    max-width: 500px;
}

.search input{
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

.user{
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

.cards{
    margin-top: 60px;
    width: 100%;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
}

.cards .card{
    background: linear-gradient(-50deg, whitesmoke, #114A9c);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
}

.number{
    font-size: 35px;
    font-weight: 500;
    color: whitesmoke;
}

.card-name{
    
    font-weight: 600;
}

.icon-box i {
    font-size: 45px;
}

.card-img{
    position: relative;                                                                                                                                                                                                      align-items: center;
    width: 100%;
}

.welcome-form{
    background: linear-gradient(312deg, whitesmoke, #326ABD, #114A9c);
    height: 20vh;
    width: 98%;
    border-radius: 40px;
    margin: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.9);
}


.welcome-banner{
    position: relative;
    font-size: 1.5rem;
    color: white;
    width: 100%;
    height: 100%;
    padding: 30px;
}


.tables{
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 20px;
    align-items: self-start;
    padding: 0 20px 20px 20px;
}

.img-box-small{
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}

.recent-appointments{
    position:relative;
    min-height: 350px;
    background: whitesmoke;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.available-doctor{
    min-height: 350px;
    background: whitesmoke;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.heading{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #444;
}

.btn{
    padding: 5px 10px;
    background: #114A9c;
    text-decoration: none;
    text-align: center;
    color: whitesmoke;
    font-size: 1.5rem;
    border-radius: 50px;
}
.btn:active{
    padding: 5px 10px;
    background: whitesmoke;
    text-decoration: none;
    text-align: center;
    color: #114A9c;
    border: 2px solid #114A9c;
    border-radius: 50px;
}

table{
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
}

thead td{
    font-weight: 600;
    color: #333;
    
}

table tr{
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

tbody tr:hover{
    background: skyblue;
}

image.png
table tbody tr:last-child{
    border-bottom: none;
}

td{
    padding: 9px 5px; 
    
}

td i{
    padding: 7px;
    color: #fff;
    border-radius: 50px;
    font-size: 1rem;
    margin: 2px;
}

.recent-appointments table tbody td:last-child{
    white-space: nowrap;
}

.fa-eye{
    background: #32bea6;
}

.fa-edit{
    background: #63b463;
}

.fa-trash-alt{
    background: #ed5564;
}



/* Responsive */

@media(max-width:1370px){
    .sidebar{
        width: 60px;
    }
    .main{
        width: calc(100% - 60px);
        left: 60px 
    }
    .top-bar{
        width: calc(100% - 60px);
    }
    .sidebar h1{
        position: relative;
        width: 100%;
        height: 100px;
        background-size: contain;
        transition: 0.3s;
        align-items: center;
        border-bottom: 2px solid #114A9c;
    }
    .btn{
        font-size: 1.3rem;
    }
}
@media(max-width:1060px){
    .cards{
        grid-template-columns: repeat(2,1fr);
    }
    .tables{
        grid-template-columns: 1fr;
    }
}
@media(max-width:630px){
    .cards{
        grid-template-columns: 1fr;
    }
    .recent-appointments td:nth-child(3){
        display: none;
    }
}
@media(max-width:420px){
    .recent-appointments, .available-doctor{
        font-size: 70%;
        padding: 10px;
        min-height: 200px;
    }
    .cards, .tables{
        padding: 10px;
    }
    .search input{
        padding: 0 10px;
    }
    .user{
        width: 40px;
        height: 40px;
    }
}

.edit-profile {
    color:#63b463
}
</style>