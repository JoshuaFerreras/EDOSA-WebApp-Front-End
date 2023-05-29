
<template>
    <div class="container">
        <header>
            <div class="patient-photo"><h1></h1></div>
            <ul>
                <div class="patient-name"><h1>Marie Alexis Miravite</h1></div>
                <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>31-Severe</h3></div>
            </ul>
                <div class="title-logo"></div>
        </header>
        <!-- <div class="result-cards">
            <div class="card">
                <div>Heart Rate</div>
                <img src="images/heart-impulse.png" alt="Avatar">
                <div class="heart-result"></div>
                <div class="heart-result">91.2 bpm</div>
            </div>
            <div class="card">
                <div>Oxygen Level</div>
                <img src="images/oxygen-level.png" alt="Avatar">
                <div class="oxygen-result">85.1%</div>
            </div>
            <div class="card">
                <div>AHI Score</div>
                <img src="images/AHI-Score.png" alt="Avatar" style="background-size: contain;" >
                <div class="AHI-result">31 Severe</div>
            </div>
            <div class="card">
                <div>Blood Pressure Level</div>
                <img src="images/bloodpressure-level.png" alt="Avatar">
                <div class="BP-result">90 mmHg</div>
            </div>
        </div> -->
        

        <div class="contents">
            <div class="view-patient-form">
                <div class="person-info">
                    <h2>{{ name }}</h2>
                    <p><strong>Age:</strong> {{ age }}</p>
                    <p><strong>Condition:</strong>{{ condition }}</p>
                    <p><strong>Gender:</strong> {{ gender }}</p>
                    <p><strong>Height:</strong> {{ height }}</p>
                    <p><strong>Weight:</strong> {{ weight }}</p>
                    <p><strong>BMI:</strong> {{ bmi }}</p>
                    <p><strong>Risk:</strong> {{ risk }}</p>
                    <p><strong>Birthdate:</strong> {{ birthdate }}</p>
                    <p><strong>Address:</strong> {{ address }}</p>
                    <p><strong>Email Address:</strong> {{ email }}</p>
                    <p><strong>Mobile No:</strong> {{ mobile_no }}</p>
                    <p><strong>Emergency Contact Person:</strong> {{ emergency_no }}</p>
                </div>

            </div>
        </div>
        <footer>
            <div class="buttons">
                <RouterLink to="/doctor-dashboard" class="button" style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
                <RouterLink to="/doctor-patient-result" class="button" style="background-color: #11499C; color: white;"> Check Result <i class="fa-solid fa-forward"></i></RouterLink>
            </div>
        </footer>
    </div>
</template>

<style scoped>

/* html, body {
  height: max-content;
  margin: 0;
  box-sizing: border-box;
} */

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
  height: 80%;
  width: 100vw;
}
.view-patient-form{
position: relative;
width: 70vw;
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


.person-info {
  font-family: Arial, sans-serif;
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

h2 {
    
  margin-top: 0;
}

</style>



<script>
import { ServerResponse } from 'http';

export default {
  data() {
    return {
      name: "Marie Alexis Miravite",
      age: 30,
      condition: "31-Severe",
      gender: "Female",
      height: 157,
      weight: 90,
      bmi: 36.5,
      risk: "Obesity",
      birthdate: 04-36-2023,
      address: "Makati City",
      email: "mariealexismiravite@gmail.com",
      mobile_no: 099567530723
    };
  }
};
</script>
