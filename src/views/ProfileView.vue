<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const user = ref(null);
const isDisabled = ref(true);
const profile_form = ref({
    id: '',
    role_id: '',
    email: '',
    info: {
        id: '',
        user_id: '',
        first_name: '',
        last_name: "",
        middle_name: '',
        address: '',
        gender: '',
        birthdate: '',
        age: '',
        height: '',
        weight: '',
        civil_status: '',
        mobile_number: '',
        contact_person: '',
        created_at: '',
        updated_at: ''
    },
    role: {
        id: '',
        name: '',
        slug: '',
    },
    created_at: '',
    updated_at: '',
});

const gender = [
    { value: 0, description: 'male' },
    { value: 1, description: 'female' }
];

onMounted(async () => {
    const data = await axios.get('/me');
    user.value = data.data.data;
    profile_form.value = data.data.data
});


const  editProfile= () => {
    isDisabled.value = false;
};

const cancel = () => {
    isDisabled.value = true;
};

const submitPatientInfo = async () => {
    await axios.post('/patient-info');
}

const updatePatientInfo = async (id) => {
    await axios.put(`/patient-info/${id}`, profile_form.value = {
        email: profile_form.value.email,
        first_name: profile_form.value.info.first_name,
        middle_name: profile_form.value.info.middle_name,
        last_name: profile_form.value.info.last_name,
        gender: profile_form.value.info.gender,
        heigh: profile_form.value.info.height,
        weight: profile_form.value.info.weight,
        birthdate: profile_form.value.info.birthdate,
        address: profile_form.value.info.address,
        civil_status: profile_form.value.info.civil_status,
        mobile_number: profile_form.value.info.mobile_number,
        contact_person: profile_form.value.info.contact_person,
    }).then(() => {
        isDisabled.value = true;
        location.reload();
    }).catch(() => {
        
    }).catch(() => {

    });
}

</script>

<template>
    <div class="container">
        <header>
            <div class="patient-photo">
                <h1></h1>
            </div>
            <ul>
                <div class="title">
                    <h1>My Profile</h1>
                </div>
                <!-- <div class="patient-age"><h2>30 years old</h2></div>
                <div class="patient-bmi"><h3>31-Severe</h3></div> -->
            </ul>
            <div class="title-logo"></div>
        </header>

        <div class="contents">
            <div class="view-patient-form">
                <div class="form-container">
                    <div class="column">
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
                    </div>
                    <div class="column">
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
                            <input type="text" id="mobile-number" v-model="mobileNumber" placeholder="09XXXXXXXXX"
                                pattern="[0-9]{11}" required>
                        </div>
                        <div class="form-group">
                            <label for="emergency-number">Emergency Contact Person:</label>
                            <input type="text" id="mobile-number" v-model="mobileNumber" placeholder="Optional"
                                pattern="[0-9]{11}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="buttons">
                <RouterLink to="/patient-dashboard" class="button"
                    style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"><i
                        class="fa-solid fa-backward"></i> Go Back</RouterLink>
                <div v-if="isDisabled === true">
                    <button type="button" @click="editProfile" style="background-color: red; color: white;"
                        class="button">Edit Profile <i class="fa-solid fa-pen-to-square"></i></button>
                </div>
                <div v-else>
                    <button type="button" @click="cancel" style="background-color: red; color: white;"
                        class="button">Cancel <i class="fa-solid fa-square"></i></button>
                </div>
                <div v-if="isDisabled === false && profile_form?.info?.last_name == null">
                    <button type="submit" @click="submitPatientInfo"
                        style="background-color: #11499C; color: white;" class="button">Save Changes <i
                            class="fa-solid fa-check"></i></button>
                </div>
                <div v-if="isDisabled === false && profile_form?.info?.last_name != null">
                    <button type="submit" @click="updatePatientInfo(profile_form.info.id)"
                        style="background-color: #11499C; color: white;" class="button">Save Changes <i
                            class="fa-solid fa-check"></i></button>
                </div>
            </div>
        </footer>
</div>
</template>


<style scoped>
.container {
    position: absolute;
    height: 100%;
    width: 100%;
}

header {
    background-color: #326ABD;
    color: white;
    display: flex;
    flex-direction: row;
    background-size: contain;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title h1 {
    font-size: 90px;
    text-transform: uppercase;
}

header ul {
    background-size: contain;
}

.patient-photo {
    position: relative;
    display: flex;
    height: 20vh;
    width: 20vw;
    background-size: contain;
}

.patient-photo h1 {
    height: 100%;
    width: 100%;
    background: url(images/patient-profile1.png) no-repeat center center/cover;
    background-size: contain;
}

.title-logo {
    position: relative;
    background: url(images/edosa-logo.png) no-repeat center center/cover;
    background-size: contain;
    border-radius: 10px;
    width: 400px;
    margin-left: auto;
    margin-right: 10px;
}

.contents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 180vh; */
    width: 100%;
}

.view-patient-form {
    max-width: 90%;
    width: 100%;
    margin: 0 auto;
    margin-top: 60px;
    padding: 2rem;
    background: linear-gradient(-45deg, #11499C, whitesmoke);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
}

.buttons {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.button {
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

.button:hover {
    transform: scale(1.1);
}

.form-container {
    display: flex;
    position: relative;
    /* max-width: 500px; */
    padding: 0;
    margin: auto;
}

.column {
    flex: 50%;
    padding: 2rem;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
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
    .title h1 {
        font-size: 60px;
    }
}

@media (max-width: 720px) {
    .title h1 {
        font-size: 40px;
    }

    .title-logo {
        width: 150px;
    }

    .patient-photo {
        height: 15vh;
        width: 15vw;
    }

    .buttons {
        flex-direction: column;
        align-items: center;
    }

    .button {
        margin: 10px 0;
    }

    .form-container {
        flex-direction: column;
    }

    .column {
        padding: 1rem;
    }

    input[type="text"],
    input[type="number"],
    input[type="date"],
    input[type="email"],
    select,
    textarea {
        font-size: 14px;
    }
}
</style>

