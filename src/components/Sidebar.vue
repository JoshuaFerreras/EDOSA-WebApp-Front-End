<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['user']);

const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    router.push('/user-role');
};

const profile = () => {
    router.push('/profile');
}


// const result = () => {
//     router.push('/patient-result');
// }

</script>

<template>
    <div class="sidebar">
        <ul>
            <li>
                <div class="title">
                    <h1></h1>
                </div>
            </li>
            <li>
                <a @click="">
                    <i class="fas fa-th-large"></i>
                    <span class="title">Dashboard</span>
                </a>
            </li>
            <li>
                <a @click="profile">
                    <i class="fas fa-user-md"></i>
                    <span class="title">My Profile</span>
                </a>
            </li>
            <!-- <li>
                <a @click="result">
                    <i class="fa-solid fa-square-poll-vertical"></i>
                    <span class="title">My Result</span>
                </a>
            </li> -->
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
                <a @click="">
                    <i class="fa-solid fa-comments"></i>
                    <span class="title">Feedback</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fa-solid fa-circle-info"></i>
                    <span class="title">About Us</span>
                </a>
            </li>
            <li>
                <a @click="">
                    <i class="fa-solid fa-circle-question"></i>
                    <span class="title">FAQ</span>
                </a>
            </li>
            <li v-if="props.user == props.user">
                <a @click="logout">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    <span class="title">Log out</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
    width: 300px;
    height: 100%;
    background: linear-gradient(45deg, #114A9c, whitesmoke);
    overflow-x: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    z-index: 2;
    /* border-radius: 0px 0px 40px 40px; */
}

.sidebar ul li {
    width: 100%;
    list-style: none;
}

.sidebar ul li:hover {
    /* background: rgb(196, 11, 11); */
    background: skyblue;
    cursor: pointer;
}

.sidebar ul li:first-child:hover {
    background: none;
}


.sidebar ul li a {
    width: 100%;
    text-decoration: none;
    color: black;
    height: 60px;
    display: flex;
    align-items: center;
}

.sidebar ul li a i {
    min-width: 60px;
    font-size: 24px;
    text-align: center;
}

.sidebar .title {
    padding: 0 10px;
    font-size: 20px;
}

.sidebar h1 {
    background: url(images/edosa-logo2.png) no-repeat center center/cover;
    position: relative;
    width: 100%;
    height: 140px;
    background-size: contain;
    transition: 0.3s;
    align-items: center;
    border-bottom: 2px solid #114A9c;
    animation: fadeInBackground 1s ease-in-out forwards;
}

@keyframes fadeInBackground {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
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

@media(max-width:860px) {
    .cards {
        grid-template-columns: repeat(2, 1fr);
    }

    .tables {
        grid-template-columns: 1fr;
    }
}

@media(max-width:530px) {
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
</style>