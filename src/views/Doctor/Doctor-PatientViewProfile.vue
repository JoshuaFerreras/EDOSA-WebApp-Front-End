<!-- <template>
    <div class="container">
      <header>
      <div class="logo-container"></div>
      <RouterLink to="/" class="button"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
      </header>
        <div class="contents">
          <div class="card">
            <h1>Heart Rate</h1>
            <img src="images/heart-impulse.png" alt="Avatar">
            <div class="test-result"><h4>91.2 bpm</h4>
            </div>
          </div>
          <div class="card">
            <h1>Oxygen-Level</h1>
            <img src="images/oxygen-level.png" alt="Avatar">
            <div class="test-result"><h4>85.1%</h4>
            </div>
          </div>
          <div class="card">
            <h1>AHI Score</h1>
            <img src="images/AHI-Score.png" alt="Avatar">
            <div class="test-result"><h4>91.2 bpm</h4>
            </div>
          </div>
          <div class="card">
            <h1>Oxyge-Level</h1>
            <img src="images/bloodpressure-level.png" alt="Avatar">
            <div class="test-result"><h4>90mmHg</h4>
            </div>
          </div>
      </div>
    </div>
  </template> -->
  
<!-- <style scoped>  
  .container{
    position: absolute;
    height: max-content;
    width: 100%;
    background: linear-gradient(45deg, whitesmoke, #11499C);
    background: ma;
  }
  header{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
  }
  .button{
    margin-right: 50px;
    border-radius: 40px;
    border: none;
    background-color: white;
    color: #11499C;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    cursor: pointer;
    margin-top: 20px;
    text-decoration: none;
  }
  .button:active{
    transform: scale(.89);
    border-radius: 40px;
    border: 2px solid white;
    background-color: #326ABD;
    color: #fff;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
  }
  .logo-container{
    background: url(images/edosa-logo2.png) no-repeat center center/cover;
    background-size: contain;
    border-radius: 10px;
    width: 400px;
      height: 200px;
    margin-left: 50px;
    margin-right: auto;
  }
  .contents{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    
  }
  img{
    position: relative;
    height: 80%;
    width: 80%;
    background-size: contain;
  }
  .card {
    /* Add shadows to create the "card" effect */
    /* height: 60vh;
    width: 50vw; */
    box-shadow: 40px 40px 40px 0 rgba(0,0,0,0.9);
    transition: 0.9s;
    margin:  40px;
    background: linear-gradient(-90deg, whitesmoke, #326ABD);
    border-radius: 40px;
    width: 50vw;
    height: 50vh;
    display: flex;
    flex-direction: column;
  }
  
  /* On mouse-over, add a deeper shadow */
  .card:hover {
    box-shadow: 0 20px 20px 0 rgba(0,0,0,0.9);
    transform: scale(.9);
    background: whitesmoke;
    transition: .3s;
  }
  .card:active{
    background: linear-gradient(45deg, whitesmoke, #11499C);
    transform: scale(.8);
  }
  
  /* Add some padding inside the card container */

  h1{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .test-result {
    padding: 2px 16px;
    margin-bottom: 50px;
  }
  
  .test-result h4{
    font-size: 30px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  h4{
    text-decoration: none;
  }
  
  @media (max-width:779px){
  
  .card{
    width: 100%;
    height: 100%;
    flex-direction: row;
  }
  .logo-container{
    display: none;
  }
  }
  </style> -->

<template>
    <div class="container">
        <header>
            <div class="patient-photo"><h1></h1></div>
            <ul>
                <div class="patient-name"><h1>Marie Alexis Miravite</h1></div>
                <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>36.3-Obese</h3></div>
            </ul>
            <RouterLink to="/" class="button"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
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
    display: flex;
    flex-direction: row;
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
    
}
.button{
  margin-right: 50px;
  border-radius: 40px;
  border: none;
  background-color: white;
  color: #11499C;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 20px;
  text-decoration: none;
}

.title-logo{
position: relative;
background: url(images/edosa-logo.png) no-repeat center center/cover;
background-size: contain;
border-radius: 10px;
width: 400px;
height: 200px;
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
.card:hover{
    background: linear-gradient(45deg, whitesmoke, #326ABD);
    transform: scale(.9);
}

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

</style>