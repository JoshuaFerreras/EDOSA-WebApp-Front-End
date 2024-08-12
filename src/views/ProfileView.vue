<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

// Define reactive variables
const user = ref(null);
const roleId = ref(null);
const isDisabled = ref(true);
const profileForm = ref({
    id: '',
    lname: '',
    fname: '',
    mname: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    birthdate: '',
    address: '',
    civilStatus: '',
    email: '',
    mobileNumber: '',
    emergencyContact: '',
    user_id: '',
    role_id: '',
});
const survey = ref(null);
const surveyForm = ref({
    snoring: '',
    tired: '',
    observed: '',
    pressure: '',
    bmi: '',
    testage: '',
    neck: '',
    testgender: ''
});

// Fetch user profile data on component mount
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/role', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            roleId.value = response.data.role_id;
            console.log('Role ID:', roleId.value); // Log the role ID for debugging
        } else {
            console.error('Failed to fetch role_id:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching role_id:', error);
    }
    try {
        const response = await axios.get('http://localhost:5000/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            user.value = response.data.profile;
            Object.assign(profileForm.value, response.data.profile);
        } else {
            console.error('Failed to fetch profile:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
    try {
        const response = await axios.get('http://localhost:5000/survey', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            survey.value = response.data.survey;
            if (survey.value) {
                // If survey data exists, populate the surveyForm with existing data
                Object.assign(surveyForm.value, survey.value);
            }
        } else {
            console.error('Failed to fetch survey:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching survey:', error);
    }
});

// Enable editing of the profile form
const editProfile = () => {
    isDisabled.value = false;
};

// Cancel editing and revert changes
const cancel = () => {
    isDisabled.value = true;
    Object.assign(profileForm.value, user.value);
    Object.assign(surveyForm.value, user.value);
};

// Create or update the user's profile when the user clicks the "Save" button
const createProfile = async () => {
    try {
        if (!user.value) {
            const response = await axios.post('http://localhost:5000/profile', profileForm.value, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            isDisabled.value = true;
            window.history.back();
            console.log(response.data.message);
        } else {
            updateProfile();
        }
    } catch (error) {
        console.error(error);
    }
};
// Save changes to the user's profile
const updateProfile = async () => {
    try {
        const response = await axios.put('http://localhost:5000/profile', profileForm.value, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        isDisabled.value = true;
        window.history.back();
        console.log(response.data.message);
    } catch (error) {
        console.error(error);
    }
};
// Save or create the survey data
const saveSurvey = async () => {
    try {
        if (!survey.value) {
            const response = await axios.post('http://localhost:5000/survey', surveyForm.value, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            console.log(response.data.message);
            survey.value = response.data.survey;
            isDisabled.value = true;
            window.location.reload();
        } else {
            updateSurvey();
        }
    } catch (error) {
        console.error('Error saving survey:', error);
    }
};
// Update the survey data
const updateSurvey = async () => {
    try {
        const response = await axios.put('http://localhost:5000/survey', surveyForm.value, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        console.log(response.data.message);
        survey.value = response.data.survey;
        isDisabled.value = true;
        window.location.reload();
    } catch (error) {
        console.error('Error updating survey:', error);
    }
};

// Enable editing of the profile form
const editSurvey = () => {
    isDisabled.value = false;
};

// Function to go back to the previous page
const goBack = () => {
    window.history.back();
};

if (profileForm.value.role_id === 1) {
    isDisabled.value = true;
}

async function saveProfileAndSurvey() {
    try {
        await createProfile();
        await saveSurvey();
    } catch (error) {
        console.error('Error saving profile and survey:', error);
    }
}

</script>

<template>
    <div class="container">
        <div class="contents">
            <div class="view-profile-form">
                <div class="buttons">
                    <button class="button" style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"
                        @click="goBack"><i class="fa-solid fa-backward"></i> Back</button>
                    <div v-if="isDisabled === true">
                        <button type="button" @click="editProfile" style="background-color: red; color: white;"
                            class="button">Edit Profile <i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                    <div v-else>
                        <button type="button" @click="cancel" style="background-color: red; color: white;" class="button"
                            v-if="profileForm.role_id !== 2">Cancel
                            <i class="fa-solid fa-square"></i></button>
                    </div>
                    <div v-if="isDisabled === false">
                        <button type="button" @click="createProfile" style="background-color: #11499C; color: white;"
                            class="button" v-if="profileForm.role_id !== 2">Save Changes <i
                                class="fa-solid fa-check"></i></button>
                    </div>
                </div>
                <div class="title">

                    <div class="patient-photo-container" :class="{ 'hidden': !user || !user.gender }">
                        <div
                            :class="[(profileForm.role_id === 1 ? 'patient-photo1' : 'patient-photo'), { 'female': user && user.gender.toLowerCase() === 'female' }]">
                        </div>
                    </div>
                    <h1>My Profile</h1>
                </div>
                <div class="form-container">
                    <div class="column">
                        <div class="form-group">
                            <label for="lname">Last name:</label>
                            <input type="text" id="lname" v-model="profileForm.lname" :disabled="isDisabled" required>
                        </div>

                        <div class="form-group">
                            <label for="fname">First name:</label>
                            <input type="text" id="fname" v-model="profileForm.fname" :disabled="isDisabled" required>
                        </div>

                        <div class="form-group">
                            <label for="mname">Middle name:</label>
                            <input type="text" id="mname" v-model="profileForm.mname" :disabled="isDisabled" required>
                        </div>

                        <div class="form-group">
                            <label for="age">Age:</label>
                            <input type="number" id="age" v-model="profileForm.age" :disabled="isDisabled" required>
                        </div>

                        <div class="form-group">
                            <label for="gender">Gender:</label>
                            <select id="gender" v-model="profileForm.gender" :disabled="isDisabled" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="height">Height(cm):</label>
                            <input type="number" id="height" v-model="profileForm.height" :disabled="isDisabled"
                                placeholder="Centimeters" required>
                        </div>
                        <div class="form-group">
                            <label for="weight">Weight(kg):</label>
                            <input type="number" id="weight" v-model="profileForm.weight" :disabled="isDisabled"
                                placeholder="Kilograms" required>
                        </div>
                    </div>
                    <div class="column">
                        <div class="form-group">
                            <label for="birthdate">Birthdate:</label>
                            <input type="date" id="birthdate" v-model="profileForm.birthdate" :disabled="isDisabled"
                                required>
                        </div>
                        <div class="form-group">
                            <label for="address">Address:</label>
                            <textarea id="address" v-model="profileForm.address" :disabled="isDisabled" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="civilstatus">Civil Status:</label>
                            <select id="civilstatus" v-model="profileForm.civilStatus" :disabled="isDisabled" required>
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Widowed">Widowed</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Separated">Separated</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address:</label>
                            <input type="email" id="email" v-model="profileForm.email" :disabled="isDisabled"
                                placeholder="Contact Email Address" required>
                        </div>
                        <div class="form-group">
                            <label for="mobile-number">Mobile No:</label>
                            <input type="text" id="mobile-number" v-model="profileForm.mobileNumber" :disabled="isDisabled"
                                placeholder="************" pattern="[0-9]{11}" required>
                        </div>
                        <div class="form-group">
                            <label for="emergency-number">Emergency Contact No:</label>
                            <input type="text" id="emergency-number" v-model="profileForm.emergencyContact"
                                :disabled="isDisabled" placeholder="Optional" pattern="[0-9]{11}">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="roleId !== 1" class="stop-bang-form">
                <div class="buttons">
                    <div v-if="isDisabled === true">
                        <button type="button" @click="editSurvey" style="background-color: red; color: white;"
                            class="button">Edit Answer <i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                    <div v-else>
                        <button type="button" @click="cancel" style="background-color: red; color: white;"
                            class="button">Cancel
                            <i class="fa-solid fa-square"></i></button>
                    </div>
                    <div v-if="isDisabled === false">
                        <button type="button" @click="saveProfileAndSurvey" style="background-color: #11499C; color: white;"
                            class="button">Save Changes <i class="fa-solid fa-check"></i></button>
                    </div>
                </div>
                <div class="title">
                    <h1>Stop Bang Screening</h1>
                </div>
                <div class="form-container">
                    <div class="column">
                        <h2>STOP</h2>
                        <div class="form-group">
                            <label for="Snoring">Snoring?</label>
                            <div class="question">
                                <p>Do you Snore Loudly (loud enough to be heard through closed
                                    doors or your bed-partnerelbows you for snoring at night)?
                                    <span class="answer-btn">
                                        <input type="radio" name="snoring" :value="true" v-model="surveyForm.snoring"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="snoring" :value="false" v-model="surveyForm.snoring"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Tired">Tired?</label>
                            <div class="question">
                                <p>Do you often feel Tired, Fatigued, or Sleepy during the daytime
                                    (such as falling asleep during driving or talking to someone)?
                                    <span class="answer-btn">
                                        <input type="radio" name="tired" :value="true" v-model="surveyForm.tired"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="tired" :value="false" v-model="surveyForm.tired"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="Observed">Observed?</label>
                            <div class="question">
                                <p>Has anyone Observed you Stop Breathing or Choking/Gasping during your sleep?
                                    <span class="answer-btn">
                                        <input type="radio" name="observed" :value="true" v-model="surveyForm.observed"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="observed" :value="false" v-model="surveyForm.observed"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="Pressure">Pressure?</label>
                            <div class="question">
                                <p>Do you have or are being treated for High Blood Pressure ?
                                    <span class="answer-btn">
                                        <input type="radio" name="pressure" :value="true" v-model="surveyForm.pressure"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="pressure" :value="false" v-model="surveyForm.pressure"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <h2>BANG</h2>
                        <div class="form-group">
                            <label for="BMI">BMI:</label>
                            <div class="question">
                                <p>Are you more than 35 kg/m2??
                                    <span class="answer-btn">
                                        <input type="radio" name="bmi" :value="true" v-model="surveyForm.bmi"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="bmi" :value="false" v-model="surveyForm.bmi"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Age">Age:</label>
                            <div class="question">
                                <p> Are you older than 50 ?
                                    <span class="answer-btn">
                                        <input type="radio" name="testage" :value="true" v-model="surveyForm.testage"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="testage" :value="false" v-model="surveyForm.testage"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Neck">Neck size large ? (Measured around Adams apple)</label>
                            <div class="question">
                                <p>Is your shirt collar 16 inches / 40cm or larger?
                                    <span class="answer-btn">
                                        <input type="radio" name="neck" :value="true" v-model="surveyForm.neck"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="neck" :value="false" v-model="surveyForm.neck"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="Gender">Gender:</label>
                            <div class="question">
                                <p>Are you a Male?
                                    <span class="answer-btn">
                                        <input type="radio" name="testgender" :value="true" v-model="surveyForm.testgender"
                                            :disabled="isDisabled">Yes
                                        <input type="radio" name="testgender" :value="false" v-model="surveyForm.testgender"
                                            :disabled="isDisabled">No
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
span {
    font-weight: 1000;
}

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

.patient-photo-container {
    position: relative;
    display: flex;
    height: 20vh;
    width: 20vw;
    background-size: contain;
}

.patient-photo {
    height: 100%;
    width: 100%;
    background-size: contain;
}

.patient-photo.female {
    background: url(images/patient-profile1.png) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.patient-photo:not(.female) {
    background: url(images/patient-profile2.png) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.hidden {
    display: none;
}

.patient-photo-container1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: 10vh;
    width: 10vw;
    background-size: contain;
}


.patient-photo1.female {
    background: url(images/profile2.jpg) no-repeat center center/cover;
    height: 100%;
    width: 100%;
    background-size: contain;
}

.patient-photo1:not(.female) {
    background: url(images/profile1.jpg) no-repeat center center/cover;
    height: 100%;
    width: 100%;
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* height: 180vh; */
    width: 100%;
}

@keyframes zoomIn {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
}

.view-profile-form {
    max-width: 90%;
    width: 100%;
    margin: 0 auto;
    margin-top: 15px;
    padding: 2rem;
    background: linear-gradient(#326ABD, white, white, white, #326ABD);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
    animation: zoomIn 0.5s ease-in-out;
    /* Adjust duration and timing function as needed */
}

.stop-bang-form {
    max-width: 90%;
    width: 100%;
    margin: 0 auto;
    margin-top: 15px;
    padding: 2rem;
    background: linear-gradient(#326ABD, white, white, white, #326ABD);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
    animation: zoomIn 0.5s ease-in-out;
    /* Adjust duration and timing function as needed */
}


.buttons {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    border-radius: 10px;
    border: none;
    font-size: 1.3rem;
    font-weight: bold;
    padding: 10px 20px;
    letter-spacing: 1px;
    cursor: pointer;
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

