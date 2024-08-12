<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();

const isSignUp = ref(false);
const errorMessage = ref("");

const login_form = ref({
  email: "",
  password: "",
});
const register_form = ref({
  email: "",
  password: "",
  confirm_password: "",
});

const signInBtn = () => {
  isSignUp.value = false;
  errorMessage.value = "";
};

const signUpBtn = () => {
  isSignUp.value = true;
  errorMessage.value = "";
};

const togglePassword = (inputId) => {
  const input = document.getElementById(inputId);
  const eyeIcon = inputId + "_eye";
  const isPasswordInput = input.getAttribute('type') === 'password';

  if (isPasswordInput) {
    input.setAttribute('type', 'text');
    document.getElementById(eyeIcon).classList.remove("fa-eye");
    document.getElementById(eyeIcon).classList.add("fa-eye-slash");
  } else {
    input.setAttribute('type', 'password');
    document.getElementById(eyeIcon).classList.remove("fa-eye-slash");
    document.getElementById(eyeIcon).classList.add("fa-eye");
  }
};

const signUpForm = async () => {
  const email = register_form.value.email;
  if (!validateEmail(email)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  if (register_form.value.password !== register_form.value.confirm_password) {
    errorMessage.value = "The password you entered isn't match.";
    return;
  }
  // Clear the error message since validation was successful
  errorMessage.value = "";

  try {
    const response = await axios.post('http://localhost:5000/signup', {
      email: email,
      password: register_form.value.password,
      confirm_password: register_form.value.confirm_password
    });

    // Assuming response.data.message contains some success message
    console.log(response.data.message);
    isSignUp.value = false;
  } catch (error) {
    console.error(error.message);
    errorMessage.value = "The account already exists.";
  }
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};



const signInForm = async () => {
  await axios.post('http://localhost:5000/signin', login_form.value).then((response) => {
    router.push('/patient-dashboard');
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('userId', response.data.user_Id);
    response.data.message;
  }).catch((error) => {
    errorMessage.value = "The email or password you entered isn't connected to an account.";
    console.error(error.message);
  });
};
</script>
<template>
  <article>
    <div class="contents">
      <div class="container" :class="{ 'sign-up-active': isSignUp }">
        <div class="overlay-container">
          <!-- <RouterLink to="/user-role"><button class="back-btn"><i class="fa-solid fa-backward"></i> Go Back</button>
          </RouterLink> -->
          <div class="overlay">
            <div class="overlay-left">
              <h3></h3>
              <p>Already have an account?</p>
              <button class="invert" id="signIn" @click="signInBtn">Sign In</button>
              <h5></h5>
            </div>
            <div class="overlay-right">
              <h3></h3>
              <p>Create your account now!</p>
              <button class="invert" id="signUp" @click="signUpBtn">Sign Up</button>
              <h4></h4>

            </div>
          </div>
        </div>
        <!-- Start of Sign up -->
        <form class="sign-up" action="#" @submit.prevent="signUpForm">
          <h2>Sign Up</h2>
          <div class="input-field">
            <i class="fa-solid fa-envelope"></i>
            <input class="email" type="text" placeholder="Email Address" v-model="register_form.email" required>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" id="up_password" v-model="register_form.password" required>
            <i class="fa fa-eye" aria-hidden="true" id="up_eye" @click="togglePassword('up_password')"></i>
          </div>
          <div class="input-field">
            <i class="fa-sharp fa-solid fa-circle-check"></i>
            <input type="password" placeholder="Confirm Password" id="Confirm_password"
              v-model="register_form.confirm_password" required>
            <i class="fa fa-eye" aria-hidden="true" id="Confirm_eye" @click="togglePassword('Confirm_password')"></i>
          </div>
          <div class="errormsg" v-if="errorMessage">{{ errorMessage }}</div>
          <button>Sign Up</button>
          <RouterLink to="/user-role"><button>Cancel</button></RouterLink>
          <h6 class="account-text">I have already an account <a @click="signInBtn">Sign In</a></h6>
        </form>
        <!-- End of Sign up -->


        <!-- Start of Sign in -->
        <form class="sign-in" action="#" @submit.prevent="signInForm">
          <h2>Sign In</h2>
          <div class="input-field">
            <i class="fa-solid fa-envelope"></i>
            <input type="text" placeholder="Email Address" name="email" v-model="login_form.email" required>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" id="in_password" v-model="login_form.password" required>
            <i class="fa fa-eye" aria-hidden="true" id="in_eye" @click="togglePassword('in_password')"></i>
          </div>
          <div class="forgotpass">Forgot your password?</div>
          <div class="errormsg" v-if="errorMessage">{{ errorMessage }}</div>
          <button @click="signInForm">Sign In</button>
          <RouterLink to="/user-role"><button>Cancel</button></RouterLink>
          <h6 class="account-text">Don't have any account yet? <a @click="signUpBtn">Sign Up</a></h6>
        </form>
        <!-- End of Sign in -->
      </div>
    </div>
  </article>
</template>
  
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');


* {
  box-sizing: content-box;
}

a [data-v-a1545dbe] {
  margin: 0px 0px;
}

label {
  font-size: 18px;
  color: #11499C;
  text-transform: uppercase;
}

.contents {
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
  background: radial-gradient(whitesmoke, #11499C);



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


  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: radial-gradient(whitesmoke, #11499C);
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
  width: calc(50% - 120px);
  height: calc(100% - 180px);
  text-align: center;
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

  .error {
    border-color: red;
    /* Change the border color to red for error state */
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

.errormsg {
  color: red;
}


.fa-eye {
  background: none;
}

/* Responsive UI */

@media (max-width:900px) {
  .container {
    width: 100vw;
    height: 100vh;
    border-radius: 0%
  }
}

@media (max-width: 635px) {

  .sign-up-active .sign-up {
    width: 82%;
    transform: none;
  }

  form .account-text {
    display: block;
  }

  .overlay-container {
    display: none;
  }

  .overlay {
    display: none;
  }

  .sign-in {
    width: 82%;
  }
}

@media (max-width:375px) {
  form {
    padding: 90px 40px;
  }
}

@media (max-width:414px) {
  form {
    padding: 90px 40px;
  }
}
</style>