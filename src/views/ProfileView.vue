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


const editProfile = () => {
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
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="email">Email Address:</label>
                            <input type="email" id="email" v-model="profile_form.email" disabled>
                        </div>
                        <div class="form-group">
                            <label for="lname">Last name: </label>
                            <input type="text" id="lname" v-model="profile_form.info.last_name" :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="fname">First name:</label>
                            <input type="text" id="fname" v-model='profile_form.info.first_name' :disabled="isDisabled">
                        </div>

                        <div class="form-group">
                            <label for="mname">Middle name:</label>
                            <input type="text" id="mname" v-model="profile_form.info.middle_name" :disabled="isDisabled">
                        </div>

                        <div class="form-group">
                            <label for="age">Age:</label>
                            <input type="number" id="age" v-model="profile_form.info.age" disabled>
                        </div>

                        <div class="form-group">
                            <label for="gender">Gender:</label>
                            <select id="gender" :disabled="isDisabled" v-model="profile_form.info.gender">
                                <option value="" disabled>Select Gender</option>
                                <option value="0">Female</option>
                                <option value="1">Male</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="height">Height(cm):</label>
                            <input type="number" id="height" v-model="profile_form.info.height" :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="weight">Weight(kg):</label>
                            <input type="number" id="weight" v-model="profile_form.info.weight" :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="birthdate">Birthdate:</label>
                            <input type="text" id="birthdate" v-model="profile_form.info.birthdate" :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="address">Address:</label>
                            <textarea id="address" v-model="profile_form.info.address" :disabled="isDisabled"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="civilstatus">Civil Status:</label>
                            <input type="text" id="civilstatus" v-model="profile_form.info.civil_status"
                                :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="mobile-number">Mobile Number:</label>
                            <input type="text" id="mobile-number" placeholder="09XXXXXXXXX"
                                v-model="profile_form.info.mobile_number" :disabled="isDisabled">
                        </div>
                        <div class="form-group">
                            <label for="emergency-number">Emergency Contact Person:</label>
                            <input type="text" id="mobile-number" placeholder="Optional"
                                v-model="profile_form.info.contact_person" :disabled="isDisabled">
                        </div>
                        <footer>
                            <div class="buttons">
                                <RouterLink to="/patient-dashboard" class="button"
                                    style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"><i
                                        class="fa-solid fa-backward"></i> Go Back</RouterLink>
                                <!-- <RouterLink to="" class="button" style="background-color: #11499C; color: white;" type="submit" @click.prevent="submitForm"> Save Changes <i class="fa-solid fa-forward"></i></RouterLink> -->
                                <div v-if="isDisabled === true">
                                    <button type="button" @click="editProfile" style="background-color: red; color: white;"
                                        class="button">Edit Profile <i class="fa-solid fa-pen-to-square"></i></button>
                                </div>
                                <div v-else>
                                    <button type="button" @click="cancel" style="background-color: red; color: white;"
                                        class="button">Cancel <i class="fa-solid fa-pen-to-square"></i></button>
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
                    </form>
                </div>
            </div>
        </div>


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
    height: 180vh;
    width: 100vw;
}

.view-patient-form {
    position: relative;
    width: 50vw;
    height: 90%;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 10px 10px 40px black;
    background: white;
}

.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

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
    color: #326ABD;
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
    img {
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

    .card {
        width: 90%;
    }

    .buttons {
        justify-content: space-around;
    }

    .button {
        margin: 0;
        margin-top: 10;
        margin-bottom: 10px;
        justify-content: space-around;
    }

    h1 {
        font-size: 30px;
    }

    h2 {
        font-size: 25px;
    }

    h3 {
        font-size: 20px;
    }

    h4 {
        font-size: 60px;
    }

    .title-logo {
        width: 200px;
    }

    .patient-photo h1 {
        background-size: cover;
    }
}
</style>