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
        <div class="service-content">
            <h1>company services</h1>
            <div class="container">
                <h2>"Sleep soundly with our innovative technology</h2>
                <p>Discover an innovative solution for
                    detecting obstructive sleep apnea
                    early on. Our early detection system
                    offers unparalleled accuracy and
                    reliability, providing you with the
                    peace of mind you need to sleep
                    soundly at night. Say goodbye to
                    restless nights and hello to a
                    healthier, happier you with our
                    cutting-edge technology. Try our
                    early detection system for
                    obstructive sleep apnea today!</p>

                <p>The machine learning model analyzes
                    sleep data's features to classify the
                    severity of Obstructive Sleep Apnea
                    (OSA) into one of four categories:
                    Normal, Mild, Moderate, or Severe. It
                    includes metrics like apnea events
                    per hour, oxygen saturation levels,
                    and other sleep-related
                    measurements. This analysis helps
                    determine the severity of OSA and
                    suggests suitable treatment.</p>
                    
            </div>
            <footer>
                <img src="images/company-logo.png" alt="Avatar" class="card-img">
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

.card-img {
    position: relative;
    display: block;
    margin: 0 auto;
    width: 25%; /* Adjust width as needed */
}

h1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    text-transform: uppercase;
    font-size: 70px;
    color: #296FD7;
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

.container {
    margin: 100px 0px 0px 0px;
    margin-top: 0px;
    padding: 20px;
    animation: slideinright 1s forwards;
    /* Adjust the animation duration and timing function as needed */
}



h2 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 60px;
    margin-bottom: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

p {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  animation: fadeIn 1.5s ease; /* Adjust duration and timing function as needed */
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

}
</style> 
