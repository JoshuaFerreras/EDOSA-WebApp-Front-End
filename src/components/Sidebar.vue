<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = async() => {
    await axios.post('/logout').then(() => {
        router.push('/');
    });
};
</script>

<template>
    <div class="sidebar">
        <ul>
            <li>
                <div class="title"><h1></h1></div>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-th-large"></i>
                    <span class="title">Dashboard</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-user-md"></i>
                    <span class="title">My Profile</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-stethoscope"></i>
                    <span class="title">Appointments</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fa-solid fa-people-group"></i>
                    <span class="title">Patients</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fa-sharp fa-solid fa-envelope"></i>
                    <span class="title">Mailbox</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-cog"></i>
                    <span class="title">Settings</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-question"></i>
                    <span class="title">Help</span>
                </a>
            </li>
            <li>
                <a @click="logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="title">Log out</span> 
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar{
    position: fixed;
    width: 300px;
    height: 100%;
    background: linear-gradient(45deg, #114A9c, whitesmoke);
    overflow-x: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    z-index: 2;
}

.sidebar ul li{
    width: 100%;
    list-style: none;
}

.sidebar ul li:hover{
    /* background: rgb(196, 11, 11); */
    background: skyblue;
}

.sidebar ul li:first-child:hover{
    background: none;
}


.sidebar ul li a{
    width: 100%;
    text-decoration: none;
    color: black;
    height: 60px;
    display: flex;
    align-items: center;
}

.sidebar ul li a i{
    min-width: 60px;
    font-size: 24px;
    text-align: center;
}

.sidebar .title{
    padding: 0 10px;
    font-size: 20px;
}

.sidebar h1{
    background: url(images/edosa-logo2.png) no-repeat center center/cover;
	position: relative;
	width: 100%;
	height: 140px;
	background-size: contain;
    transition: 0.3s;
    align-items: center;
    border-bottom: 2px solid #114A9c;
}
</style>