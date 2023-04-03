
  <template>
    <div class="container">
        <header>
            <div class="patient-photo"><h1></h1></div>
            <ul>
                <div class="patient-name"><h1>Marie Alexis Miravite</h1></div>
                <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>36.3-Obesity</h3></div>
            </ul>
                <div class="title-logo"></div>
        </header>
        <div class="result-cards">
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
        </div>
        <footer>
            <div class="buttons">
                <RouterLink to="/doctor-dashboard" class="button" style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
                <RouterLink to="/doctor-dashboard" class="button" style="background-color: #11499C; color: white;">View Result <i class="fa-solid fa-forward"></i></RouterLink>
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
  background: whitesmoke;
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
.result-cards {
  min-height: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  box-sizing: border-box;
}
.result-cards > div {
  display: flex; 
  flex-basis: calc(50% - 40px);  
  justify-content: center;
  flex-direction: column;
  border-radius: 40px;
}
.result-cards > div > div {
  display: flex;
  justify-content: center;
  flex-direction: row;
}
/* .card:hover{
    background: linear-gradient(45deg, whitesmoke, #326ABD);
    transform: scale(.9);
} */

.card { 
    margin: 20px;
    background: linear-gradient(-90deg, whitesmoke, #326ABD);
    border-radius: 40px;
    /* height: 25%; */
    width: 50%;
    text-transform: uppercase;
    box-shadow: 40px 40px 40px 0 rgba(0,0,0,0.9);
    transition: 0.9s;
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
    position: relative;
    width: 30%;
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
  margin-top: 10px;
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
.title-logo{
    width: 200px;
}
.patient-photo h1 {
    background-size: cover;
}
}
</style>