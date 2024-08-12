<template>
  <article>
    <div class="contents">
      <div class="container">
        <form @submit.prevent="signInForm" class="sign-in" action="#">
          <h3></h3>
          <!-- <h2>Sign In</h2> -->
          <div class="input-field">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" placeholder="Email Address" name="email" v-model="login_form.email" required>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" id="in_password" name="password" v-model="login_form.password" required>
            <i class="fa fa-eye" aria-hidden="true" id="in_eye" onclick="In_pass()"></i>
          </div>
          <div class="forgotpass">Forgot your password?</div>
          <div class="errormsg" v-if="errorMessage">{{ errorMessage }}</div>
          <button>Sign In</button>
          <RouterLink to="/user-role"><button>Cancel</button></RouterLink>
          <h6 class="account-text">Don't have any account yet? <a href="#" id="sign-up-btn2">Sign Up</a></h6>
        </form>

      </div>


    </div>
  </article>
</template>
  
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const errorMessage = ref("");
const router = useRouter();
const login_form = ref({
  email: "",
  password: "",
});

const signInForm = async () => {
  await axios.post('http://localhost:5000/login', login_form.value).then((response) => {
    router.push('/doctor-dashboard');
    localStorage.setItem('token', response.data.access_token);
    response.data.message;
  }).catch((error) => {
    errorMessage.value = "The email or password you entered isn't connected to an account.";
    console.error(error.message);
  });
}
</script>
  
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');



label {
  font-size: 18px;
  color: #11499C;
  text-transform: uppercase;
}
* {
  box-sizing: content-box;
}

/* Rest of the styles remain unchanged */

.errormsg {
  color: red;
}

.contents {
  display: flex;
  justify-content: center;
  align-items: center; /* Add this line to center vertically */
  background-color: #114A9C;
  height: 100vh;
  width: 100vw;
}
.container {
  position: relative;
  width: 50%;
  height: 80vh;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 40px 40px 40px black;
  background: white;



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

  .back-btn {
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
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
}

h3 {
  background: url(images/edosa-logo2.png) no-repeat center center/cover;
  position: relative;
  width: 100%;
  height: 200px;
  background-size: contain;
  border-radius: 10px;
  transition: 0.3s;
}

h4 {
  background: url(images/doctors.png) no-repeat center center/cover;
  position: relative;
  width: 100%;
  height: 200px;
  background-size: contain;
  border-radius: 10px;
  transition: 0.3s;
}

h5 {
  background: url(images/login-bg-photo.png) no-repeat center center/cover;
  position: relative;
  width: 100%;
  height: 200px;
  background-size: contain;
  border-radius: 10px;
  transition: 0.3s;
}

h6 a {
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
  // margin-top: 10px;
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

button.invert:active {
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
  height: calc(100% - 180px);
  text-align: center;
  width: 90%;
  // background: linear-gradient(to bottom,#efefef, #ccc);
  // background: whitesmoke;
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

  .input-field i {
    flex: 1;
    text-align: center;
    color: #326ABD;
    font-size: 18px;
  }

  .input-field input {
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

  .forgotpass:hover {
    text-decoration: underline;
    color: red;
    cursor: pointer;
  }

  .account-text {
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
.fa-eye {
    background: none;
}

/* Responsive UI */

@media (max-width:1700px) {
  form{
    width: 85%;
  }
}
@media (max-width:1200px) {
  form{
    width: 80%;
  }
}
@media (max-width:900px) {
  .container {
    width: 100vw;
    height: 100vh;
    border-radius: 0%
  }
  form{
    width: 85%;
  }
}

@media(max-width:635px) {
  .sign-in {
    width: 82%;
  }

  .account-text {
    display: inline-block;
    margin-top: 30px;
  }
}
  form{
    padding: 90px 60px;
  }
@media (max-width:375px) {
  form{
    padding: 90px 40px;
  }
}
@media (max-width:414px) {
  form{
    padding: 90px 40px;
  }
}

@media (max-width:280px) {
  form{
    padding: 90px 20px;
  }
}
</style>