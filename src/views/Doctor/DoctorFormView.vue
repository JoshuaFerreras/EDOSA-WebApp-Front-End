<template>
    <article>
      <div class="contents">
      <div class="container" :class="{'sign-up-active' : signUp}"> <!-- isSignUp == true ? 'sign-up-active' : '' -->
        <div class="overlay-container">
          <RouterLink to="/user-role"><button class="back-btn"><i class="fa-solid fa-backward"></i> Go Back</button></RouterLink>
          <div class="overlay">
            <div class="overlay-left">
              <h3></h3>
              <p>Already have an account?</p>
              <button class="invert" id="signIn" @click="signUp = !signUp">Sign In</button>
              <h5></h5>
            </div>
            <div class="overlay-right">
              <h3></h3>
              <p>Create your account now!</p>
              <button class="invert" id="signUp" @click="signUp = !signUp">Sign Up</button>
              <h4></h4>
              
            </div>
          </div>
        </div>
        <form class="sign-up" action="#" @submit.prevent="signUpForm">
          <h2>Sign Up</h2>          
            <div class="input-field">
                <i class="fa-solid fa-envelope"></i>
                <input type="text" placeholder="Email Address" v-model="email">
            </div>
            <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password" id="up_password" v-model="password">
                <i class="fa fa-eye" aria-hidden="true" id="up_eye" onclick="Up_pass()"></i>
            </div>
            <div class="input-field">
                <i class="fa-sharp fa-solid fa-circle-check"></i>
                <input type="password" placeholder="Confirm Password" id="Confirm_password" v-model="confirm_password">
                <i class="fa fa-eye" aria-hidden="true" id="Confirm_eye" onclick="Confirm_pass()"></i>
            </div>
            <label>Proof of Identity:
              <input type="file" id="file" ref="file" @change="uploadFile"/>
            </label>
          <button @click="signUpForm">Sign Up</button>
        </form>
        <form class="sign-in" action="#">
          <h2>Sign In</h2>
          <div class="input-field">
              <i class="fa-solid fa-envelope"></i>
              <input type="text" placeholder="Email Address" name="email" v-model="email">
          </div>
          <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" id="in_password" v-model="password">
              <i class="fa fa-eye" aria-hidden="true" id="in_eye" onclick="In_pass()"></i>
          </div>
          <div class="forgotpass">Forgot your password?</div>
          <RouterLink to ="/doctor-dashboard">
            <button @click="submit">Sign In</button>
          </RouterLink>
          <h6 class="account-text">Don't have any account yet? <a href="#" id="sign-up-btn2">Sign Up</a></h6>
        </form>
      </div>
    </div>
    </article>
  </template>
  
  <script setup>
    import { ref } from 'vue';
    import axios from '../../axios/index.js';
    
    const signUp = ref(false);
    const email = ref("");
    const confirm_password = ref("");
    const password = ref("");
    const role_id = 1;
    const file = ref("");

    const uploadFile = (event) => {
        file.value = event.target.files[0];
    }

    const signUpForm = async () => {
        const formdata = new FormData();
        formdata.append('file', file.value);
        console.log(file.value);
        // const reader = new FileReader();
        // reader.readAsDataURL(file.value);

        // reader.onload = async () => {
        // const encodedFile = reader.result.split(",")[1];
        //     const data = {
        //         file: encodedFile,

        //     };
            await axios.post('/users', {
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value,
            role_id: role_id,
            file: formdata,
        });
        // }

    }
  </script>
  
<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');
  
*{
  box-sizing: content-box;
}

label{
  font-size: 18px;
  color:#11499C;
  text-transform: uppercase;
}

.contents{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #326ABD;
  height: 100vh;
  width: 100vw;
}
.container {
position: relative;
width: 70vw;
height: 80vh;
border-radius: 10px;
overflow: hidden;
box-shadow: 40px 40px 40px black;
background: linear-gradient(-45deg, whitesmoke, #11499C);



.overlay-container {
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform .5s ease-in-out;
z-index: 100;
}
.back-btn{
  color: #11499C;
  background-color: whitesmoke;
  padding: 10px 10px;
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  font-size: 12px;
  border: none;
}
.overlay {
position: relative;
left: -100%;
height: 100%;
width: 200%;
background: linear-gradient(-45deg, whitesmoke, #11499C);
color: #fff;
transform: translateX(0);
transition: transform .5s ease-in-out;
}
@mixin overlays($property) {
position: absolute;
top: 0;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 70px 40px;
width: calc(50% - 80px);
height: calc(100% - 140px);
text-align: center;
transform: translateX($property);
transition: transform .5s ease-in-out;
}
.overlay-left {
@include overlays(-20%);
}
.overlay-right {
@include overlays(0);
right: 0;
}
}
h2 {
margin: 0;
font-size: 35px;
color: #11499C;
margin-bottom: 10px;
text-transform: uppercase;
}
h3{
background: url(images/edosa-logo2.png) no-repeat center center/cover;
position: relative;
width: 100%;
height: 200px;
background-size: contain;
border-radius: 10px;
transition: 0.3s;
}
h4{
background: url(images/doctors.png) no-repeat center center/cover;
position: relative;
width: 100%;
height: 200px;
background-size: contain;
border-radius: 10px;
transition: 0.3s;
}
h5{
background: url(images/login-bg-photo.png) no-repeat center center/cover;
position: relative;
width: 100%;
height: 200px;
background-size: contain;
border-radius: 10px;
transition: 0.3s;
}
h6 a{
text-decoration: underline;
color: #11499C;
}
p {
margin: 20px 0 30px;
}
a {
color: #222;
text-decoration: none;
margin: 15px 0;
font-size: 1rem;
}
button {
border-radius: 40px;
border: 2px solid #11499C;
background-color: #11499C;
color: #fff;
font-size: 1rem;
font-weight: bold;
padding: 10px 40px;
letter-spacing: 1px;
margin-top: 10px;
text-transform: uppercase;
cursor: pointer;
transition: transform .1s ease-in;
&:active {
transform: scale(.9);
}
&:focus {
outline: none;
}
}
button.invert {
background-color: #11499C;

}
button.invert:active{
background-color: white;
color: #11499C;
}
form {
position: absolute;
top: 0;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 90px 60px;
width: calc(50% - 120px);
height: calc(100% - 180px);
text-align: center;
// background: linear-gradient(to bottom,#efefef, #ccc);
background: whitesmoke;
transition: all .5s ease-in-out;
div {
font-size: 1rem;
}
.input-field {
width: 100%;
height: 50px;
background: white;
margin: 10px 0;
border: 2px solid #11499C;
border-radius: 50px;
display: flex;
align-items: center;
color: red;
}

.input-field i{
flex: 1;
text-align: center;
color:#326ABD;
font-size: 18px;
}

.input-field input{
flex: 5;
background: none;
border: none;
outline: none;
width: 100%;
font-size: 18px;
font-weight: 600;
color: black;
}
.forgotpass {
margin: -5px 0 5px 5px;
color: #114A9C;

}

.forgotpass:hover{
text-decoration: underline;
color: red;
cursor: pointer;
}
.account-text{
display: none;
}
}
.sign-in {
left: 0;
z-index: 2;
}
.sign-up {
left: 0;
z-index: 1;
opacity: 0;
}
.sign-up-active {
.sign-in {
transform: translateX(100%);
}
.sign-up {
transform: translateX(100%);
opacity: 1;
z-index: 5;
animation: show .5s;
}
.overlay-container {
transform: translateX(-100%);
}
.overlay {
transform: translateX(50%);
}
.overlay-left {
transform: translateX(0);
}
.overlay-right {
transform: translateX(20%);
}
}
@keyframes show {
0% {
opacity: 0;
z-index: 1;
}
49% {
opacity: 0;
z-index: 1;
}
50% {
opacity: 1;
z-index: 10;
}
}

/* Responsive UI */

@media (max-width:900px){
.container{
width: 100vw;
height: 100vh;
border-radius: 0%
}
}

@media(max-width:635px){
.overlay-container{
display: none;
}
.overlay{
display: none;
}
.sign-in{
width: 82%;
}
.account-text { 
display: inline-block;
margin-top: 30px;
}
}  

</style>