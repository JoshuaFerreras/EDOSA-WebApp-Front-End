<template>
  <div class="container">
    <header>
    <div class="logo-container"></div>
    <RouterLink to="/" class="button"><i class="fa-solid fa-backward"></i> Go Back</RouterLink>
    </header>
      <div class="contents">
      <RouterLink to="/doctor-form">
        <div class="card">
          <img src="images/role-doctor.jpg" alt="Avatar">
          <div class="role-name"><h4>I am Doctor</h4>
          </div>
        </div>
      </RouterLink>

      <RouterLink to="/patient-form">
        <div class="card">
          <img src="images/role-patient.jpg" alt="Avatar">
          <div class="role-name"><h4>I am Patient</h4>
          </div>
        </div>
      </RouterLink>

    </div>
  </div>
</template>

<style scoped>

.container{
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(45deg, whitesmoke, #11499C);
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
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
img{
  position: relative;
  width: 100%;
  height: 100%;

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
.role-name {
  padding: 2px 16px;
  margin-bottom: 50px;
  
}

.role-name h4{
  font-size: 30px;
  text-transform: uppercase;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>