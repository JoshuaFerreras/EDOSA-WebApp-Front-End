<script setup>
</script>
<template>
    <section>
        <input type="checkbox" id="check">
        <header>
            <h2 class="logo"></h2>
            <div class="navigation">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/services">Services</router-link>
                <router-link to="/contact">Contact Us</router-link>
            </div>
            <label for="check">
                <i class="fas fa-bars menu-btn"></i>
                <i class="fas fa-times close-btn"></i>
            </label>
        </header>
        <div class="content">
            <div class="home">
                <h2>
                    Dedicated Healthcare Platform for Obstructive Sleep Apnea
                </h2>
                <p>
                    EDOSA platform helps the patients with sleep
                    apnea(diagnosed or undiagnosed) to better
                    communicate with sleep doctors.
                </p>
                <h3>
                    Let’s make Sleep Apnea sufferers Feel Better!
                </h3>
                <RouterLink to="/user-role" class="getstarted-btn">Get Started</RouterLink>
                <RouterLink to="/user-role" class="icon-button"><i class="fa-solid fa-circle-right"></i></RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}


/* LANDING PAGE */

section {
    position: absolute;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: url(images/doctorimg3.jpg) no-repeat;
    background-size: cover;
    background-position: center;
}

header {
    position: relative;
    top: 0;
    width: 100%;
    padding: 30px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo {
    background: url(images/edosa-logo2.png) no-repeat center center/cover;
    position: relative;
    width: 200px;
    height: 100px;
    background-size: contain;
    border-radius: 10px;
    transition: 0.3s;
    transition-property: background;
}

header .navigation a {
    color: #114A9C;
    text-decoration: none;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 2px 15px;
    border-radius: 20px;
}

header .navigation a:not(:last-child) {
    margin-right: 30px;
}

header .navigation a:hover {
    background: white;
    color: #114A9C;
    border: 2px solid #114A9C;
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

.content {
    max-width: 650px;
    margin: 60px 100px;
    animation: slideRight 0.5s ease-in-out;
}

.content .home h2,
.content .home p,
.content .home h3,
.content .getstarted-btn {
    animation: slideRight 0.5s ease-in-out;
}


.content .home h2 {
    color: #296FD7;
    font-size: 55px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 2;
    line-height: 60px;
    margin-bottom: 30px;
}

.content .home p {
    font-size: 16px;
    font-weight: 500px;
    margin-bottom: 40px;
}

.content .home h3 {
    font-size: 30px;
    font-weight: 500px;
    margin-bottom: 40px;
}

.content .getstarted-btn {
    color: white;
    background: #114A9C;
    text-decoration: none;
    border: none;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 10px 20px;
    border-radius: 10px;
    transition: .3s;
    transition-property: transform;

}

.content .getstarted-btn:active {
    background: white;
    color: #114A9C;
    transform: scale(1.2);
    border: 2px solid #114A9C;

}

.icon-button {
    display: none;
    color: #114A9C;
    font-size: 50px;
}

label {
    display: none;
}

#check {
    z-index: 3;
    display: none;
}

/* Responsive Style */
@media (max-width: 1040px) {
    header .navigation {
        display: none;
    }

    label {
        display: block;
        font-size: 25px;
        cursor: pointer;
        transition: 0.3s;
        transition-property: color;
    }

    label:hover {
        color: #114A9C;
        transform: scale(1.2);

    }

    label .close-btn {
        display: none;
    }

    #check:checked~header .navigation {
        z-index: 2;
        position: fixed;
        background: rgba(114, 223, 255, 0.9);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #check:checked~header .navigation a {
        font-weight: 700;
        margin-right: 0;
        margin-bottom: 50px;
        letter-spacing: 2px;
    }

    #check:checked~header label .menu-btn {
        display: none;
    }

    #check:checked~header label .close-btn {
        z-index: 2;
        display: block;
        position: fixed;

    }

    label .menu-btn {
        position: absolute;
    }

    .content .home h2 {
        font-size: 45px;
        line-height: 50px;
    }

    .content .home p {
        font-size: 14px;
    }

    .content .home h3 {
        font-size: 40px;
        font-weight: 600;
    }
}


@media (max-width: 560px) {
    .content .home h2 {
        font-size: 35px;
        line-height: 40px;
    }

    .content .home p {
        font-size: 14px;
    }

    .content .home h3 {
        font-size: 30px;
        font-weight: 600;
    }

    @media (max-width: 422px) {
        .getstarted-btn {
            position: relative;
            font-size: medium;
        }
    }

    @media (max-width: 362px) {
        .getstarted-btn {
            display: none;
        }

        .icon-button {
            display: block;
        }
    }
}
</style> 
