
<template>
    <div class="container">
        <header>
            <div class="patient-photo"><h1></h1></div>
            <ul>
                <div class="title"><h1>My Profile</h1></div>
                <!-- <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>31-Severe</h3></div> -->
            </ul>
                <div class="title-logo"></div>
        </header>

        <div class="contents">
            <div class="view-patient-form">
                <div class="form-container">
                <form>
                <div class="form-group">
                    <label for="account-no">Account No:</label>
                    <input type="number" id="account-no" v-model="account_no" required>
                </div>
                <div class="form-group">
                    <label for="lname">Last name:</label>
                    <input type="text" id="lname" v-model="lname" required>
                </div>

                <div class="form-group">
                    <label for="fname">First name:</label>
                    <input type="text" id="fname" v-model="fname" required>
                </div>

                <div class="form-group">
                    <label for="mname">Middle name:</label>
                    <input type="text" id="mname" v-model="mname" required>
                </div>

                <div class="form-group">
                    <label for="age">Age:</label>
                    <input type="number" id="age" v-model="age" required>
                </div>
            
                <div class="form-group">
                    <label for="gender">Gender:</label>
                    <select id="gender" v-model="gender" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="height">Height(cm):</label>
                    <input type="number" id="height" v-model="height" required>
                </div>
                <div class="form-group">
                    <label for="weight">Weight(kg):</label>
                    <input type="number" id="weight" v-model="weight" required>
                </div>
                <div class="form-group">
                    <label for="birthdate">Birthdate:</label>
                    <input type="date" id="birthdate" v-model="birthdate" required>
                </div>
                <div class="form-group">
                    <label for="address">Address:</label>
                    <textarea id="address" v-model="address" required></textarea>
                </div>
                <div class="form-group">
                    <label for="civilstatus">Civil Status:</label>
                    <select id="civilstatus" v-model="civilStatus" required>
                    <option value="">Select Status</option>
                    <option value="male">Single</option>
                    <option value="female">Married</option>
                    <option value="other">Widowed</option>
                    <option value="other">Divorced</option>
                    <option value="other">Seperated</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="email">Email Address:</label>
                    <input type="email" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                    <label for="mobile-number">Mobile Number:</label>
                    <input type="text" id="mobile-number" v-model="mobileNumber" placeholder="09XXXXXXXXX" pattern="[0-9]{11}" required>
                </div>
                <div class="form-group">
                    <label for="emergency-number">Emergency Contact Person:</label>
                    <input type="text" id="mobile-number" v-model="mobileNumber" placeholder="Optional" pattern="[0-9]{11}">
                </div>
                <div class="form-group">
                    <label for="religion">Religion:</label>
                    <select id="religion" v-model="religion" required>
                    <option value="">Select Religion</option>
                    <option value="male">Roman Catholic</option>
                    <option value="female">Islam</option>
                    <option value="female">Iglesia ni Cristo</option>
                    <option value="female">Born Again Christian</option>
                    <option value="female">Buddism</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                </form>
            </div>
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
  height: 160vh;
  width: 100vw;
}
.view-patient-form{
position: relative;
width: 50vw;
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

.form-container {
  position: relative;  
  max-width: 500px;
  margin: auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color:#326ABD;
}

input[type="text"],
input[type="number"],
input[type="date"],
input[type="email"],
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  width: 100%;
}

select {
  background-color: #fff;
}

textarea {
  height: 100px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}
input[type="text"]:focus {
  outline: none;
  border-color: #1E88E5;
  box-shadow: 0px 0px 5px #1E88E5;
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
      name: '',
      age: '',
      gender: '',
      civilStatus: '',
      address: '',
      religion: ''
    }
  },
  methods: {
    submitForm() {
      // handle form submission logic here
      console.log('Patient profile form submitted!');
      console.log('Name: ' + this.name);
      console.log('Age: ' + this.age);
      console.log('Gender: ' + this.gender);
      console.log('Address: ' + this.address);
    }
  }
}
</script>