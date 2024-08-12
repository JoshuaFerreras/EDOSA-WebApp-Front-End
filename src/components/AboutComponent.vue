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
        <div class="about-content">
            <h1>about us</h1>
            <div class="cards">
                <div class="card">
                    <div class="card-content">
                        <div class="name">Mica S. Antonio</div>
                        <div class="role-name">Team Leader / Intelligent Sytem</div>
                    </div>
                    <div class="icon-box">
                        <img src="images/antonio.png" alt="Avatar" class="card-img">
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="name">Arnauld Reuben D. Anin</div>
                        <div class="role-name">Team Member / Intelligent System</div>
                    </div>
                    <div class="icon-box">
                        <img src="images/anin.png" alt="Avatar" class="card-img">
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="name">John Edward A. Binay</div>
                        <div class="role-name">Team Member / Data Science</div>
                    </div>
                    <div class="icon-box">
                        <img src="images/binay.png" alt="Avatar" class="card-img">
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <div class="name">Joshua P. Ferreras</div>
                        <div class="role-name">Team Member / System Administration</div>
                    </div>
                    <div class="icon-box">
                        <img src="images/ferreras.png" alt="Avatar" class="card-img">
                    </div>
                </div>
            </div>
            <footer>
                <img src="images/company-logo.png" alt="Avatar" class="logo-img">
            </footer>
        </div>
    </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');

/* LANDING PAGE */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

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

label {
    display: none;
}

#check {
    z-index: 3;
    display: none;
}

h1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 50px;
    text-transform: uppercase;
    font-size: 70px;
    color: #296FD7;
    font-weight: bold;
}

@keyframes slideinright {
    from {
        transform: translateX(100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.cards {
    position: relative;
    width: 100%;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* grid-template-columns: 200px 200px; */
    grid-row: auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    
}


.card {
    background: linear-gradient(-50deg, whitesmoke, #114A9c);
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    animation: slideinright 0.5s ease-in-out;
}

.name {
    font-size: 35px;
    font-weight: 500;
    color: whitesmoke;
    text-transform: capitalize;
}

.role-name {

    font-weight: 600;
}

.icon-box i {
    font-size: 45px;
}

.card-img {
    position: relative;
    align-items: center;
    width: 13vw;
    border-radius: 100%;
    border: #114A9C solid 6px;
}

.logo-img {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 15%;
    /* Adjust width as needed */
}

/* Responsive Style */
@media (max-width: 1040px) {
    header .navigation {
        display: none;
    }

    .cards {
        position: relative;
        width: 100%;
        padding: 20px 20px;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        /* grid-template-columns: 200px 200px; */
        grid-row: auto auto;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
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
        margin-bottom: 20px;
        /* Adjusted margin for smaller screens */
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
}

@media (max-width: 560px) {
    .name {
        font-size: 18px;
        /* Adjusted font size for smaller screens */
        line-height: 22px;
        /* Adjusted line height for smaller screens */
        text-align: center;
        /* Centered text */
    }

    .role-name {
        font-size: 14px;
        /* Adjusted font size for smaller screens */
    }

    h1 {
        font-size: 30px;
        /* Adjusted font size for smaller screens */
    }

}
</style> 