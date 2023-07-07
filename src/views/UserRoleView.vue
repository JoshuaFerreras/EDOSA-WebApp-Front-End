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

a:-webkit-any-link{
  text-decoration: none;
  color: #11499C;
}
a:-webkit-any-link:hover{
  color: white;
}

.container{
  position: absolute;
  height: 100%;
  width: 100%;
  /* background: linear-gradient(45deg, whitesmoke, #11499C); */
  background: whitesmoke;
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
  border: 2px solid #11499C;
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
	height: 160px;
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
  position: relative;
  box-shadow: 40px 40px 40px 0 rgba(0,0,0,0.9);
  transition: 0.9s;
  margin:  40px;
  background: linear-gradient(-90deg, whitesmoke, #326ABD);
  /* background: #326ABD; */
  border-radius: 40px;
  text-decoration: none;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 20px 20px 0 rgba(0,0,0,0.9);
  transform: scale(.9);
  background: #326ABD;
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
  text-decoration: none;
}

.role-name h4{
  font-size: 30px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}



/* Responsive */


@media (max-width:1280px){

.container{
  height: max-content;
}
.card{
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: column;
}
.contents{
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
}

@media (max-width: 704px) {
  .button{
    font-size: 20px;
  }
}

@media (max-width: 701px) {
  .button{
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>