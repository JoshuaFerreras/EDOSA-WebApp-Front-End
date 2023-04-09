<template>
    <div class="container">
        <header>
            <div class="patient-photo"><h1></h1></div>
            <ul>
                <div class="title"><h1>My Appointment</h1></div>
                <!-- <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>31-Severe</h3></div> -->
            </ul>
                <div class="title-logo"></div>
        </header>

        <div class="contents">
                <div class="appointment-form">
                    <h2>Appointment Form</h2>
                <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" v-model="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="date" id="date" v-model="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Time:</label>
                    <input type="time" id="time" v-model="time" required>
                </div>
                <div class="form-group">
                    <label for="notes">Notes:</label>
                    <textarea id="notes" v-model="notes"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" @click.prevent="submitForm">Submit</button>
                </div>
                </form>
            </div>

            <div class="appointment-form">
                    <h2>Appointment Form</h2>
                <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="text" id="name" v-model="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" v-model="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="date" id="date" v-model="date" required>
                </div>
                <div class="form-group">
                    <label for="time">Time:</label>
                    <input type="time" id="time" v-model="time" required>
                </div>
                <div class="form-group">
                    <label for="notes">Notes:</label>
                    <textarea id="notes" v-model="notes"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" @click.prevent="submitForm">Submit</button>
                </div>
                </form>
            </div>   
    </div>
        
        <footer>
            <div class="buttons">
                <RouterLink to="/doctor-dashboard" class="button" style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
                <!-- <RouterLink to="" class="button" style="background-color: #11499C; color: white;" type="submit" @click.prevent="submitForm"> Save Changes <i class="fa-solid fa-forward"></i></RouterLink> -->
                <button type="submit" @click.prevent="submitForm" style="background-color: #11499C; color: white;" class="button">Save Changes <i class="fa-solid fa-check"></i></button>
            </div>
        </footer>
    </div>
</template>

<style scoped>

.container{
  position: absolute;
  height: 100%;
  width: 100%;
}

header{
    background-color: #326ABD;
    color: white;
    display: flex;
    flex-direction: row;
    background-size: contain;
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
}
.title h1{
    font-size: 90px;
    text-transform: uppercase;
}
header ul{
    background-size: contain;
}
.patient-photo{
    position: relative;
    display: flex;
    height: 20vh;
    width: 20vw;
    background-size: contain;
}
.patient-photo h1{
    height: 100%;
    width: 100%;
    background: url(images/patient-profile1.png) no-repeat center center/cover;
    background-size: contain;
    
}
.title-logo{
position: relative;
background: url(images/edosa-logo.png) no-repeat center center/cover;
background-size: contain;
border-radius: 10px;
width: 400px;
margin-left: auto;
margin-right: 10px;
}



.contents{
  position: relative;  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 210vh;
  width: 100vw;
}
.view-appointment-form{
position: relative;
width: 90vw;
height: 90%;
border-radius: 10px;
padding: 20px;
box-shadow: 10px 10px 40px black;
background: white;
}

.buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

}

.button{
  margin-right: 50px;
  border-radius: 10px;
  border: none;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 20px;
  letter-spacing: 1px;
  cursor: pointer;
  margin-bottom: 20px;
  text-decoration: none;
}

.button:hover{
    transform: scale(1.1);
}


.appointment-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
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
  margin-bottom: 0.5rem;
}

input,
textarea {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #005fad;
} 




/* Responsive UI */
@media (max-width: 800px) {
    img{
        position: relative;
        width: 55%;
    }
}
@media (max-width: 650px) {

.result-cards {
  min-height: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.card{
    width: 90%;
}

.buttons{
    justify-content: space-around;
}
.button{
    margin: 0;
    margin-top: 10;
    margin-bottom: 10px;
    justify-content: space-around;
}
h1{
    font-size: 30px;
}
h2{
    font-size: 25px;
}
h3{
    font-size: 20px;
}
h4{
    font-size: 60px;
}
.title-logo{
    width: 200px;
}
.patient-photo h1 {
    background-size: cover;
}
}

</style>


<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      notes: ""
    };
  },
  methods: {
    submitForm() {
      // handle form submission
      console.log("Form submitted!");
    }
  }
};
</script>