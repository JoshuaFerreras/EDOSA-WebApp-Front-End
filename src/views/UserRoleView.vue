<template>
  <div class="container">
    <div class="card">
      <img src="images/role-doctor.jpg" alt="Avatar">
      <div class="role-name">
        <h4><b>Doctor</b></h4>
      </div>
    </div>
    <div class="card">
      <img src="images/role-patient.jpg" alt="Avatar">
      <div class="role-name">
        <h4><b>Patient</b></h4>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.container{
  position: relative;
  height: 100vh;
  width: 100vw;
  background: #11499C;
  display: flex;
  justify-content: center;
  align-items: center;
}
img{
  position: relative;
  width: 100%;
  height: 50%;

}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 100px 40px 80px 0 rgba(0,0,0,0.9);
  transition: 0.3s;
  margin:  40px;
  background-color: #11499C;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 20px 20px 0 rgba(0,0,0,0.9);
  transform: scale(1.1);
}

/* Add some padding inside the card container */
.role-name {
  padding: 2px 16px;
}

.role-name h4{
  justify-content: center;
  align-items: center;
  font-size: 30px;
}
</style>