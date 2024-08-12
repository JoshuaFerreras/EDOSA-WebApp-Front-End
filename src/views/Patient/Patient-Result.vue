<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ChartComponent from '../../components/ChartComponent.vue';
import Sidebar from '../../components/Sidebar.vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface UserProfile {
    fname: string;
    lname: string;
    mname: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
}
const dataLoaded = ref(false);
const user = ref<UserProfile | null>(null);
const calculatedBMI = ref<number>(0); // Initialize the calculated BMI to 0
const generatePDF = () => {
    // Get the HTML content of the entire page
    const htmlContent = document.documentElement;

    // Capture the entire webpage as an image using html2canvas
    html2canvas(htmlContent, {
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
        useCORS: true // Allow capturing cross-origin resources
    }).then(canvas => {
        // Convert the captured image to a data URL
        const imageData = canvas.toDataURL('image/png');

        // Initialize jsPDF
        const doc = new jsPDF('p', 'px', [canvas.width, canvas.height]);

        // Add the captured image to the PDF
        doc.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);

        // Save the PDF
        doc.save('webpage.pdf');
    });
};

// Fetch user profile data on component mount
onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:5000/profile', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });

        if (response.status === 200) {
            user.value = response.data.profile;
            setTimeout(function () {
                dataLoaded.value = true;
            }, 900);
            // Calculate BMI using weight (in kg) and height (in meters)
            if (user.value?.weight && user.value?.height) {
                const weightInKg = user.value.weight;
                const heightInMeters = user.value.height / 100; // Convert height to meters
                calculatedBMI.value = weightInKg / (heightInMeters * heightInMeters);
            }
        } else {
            console.error('Failed to fetch profile:', response.data.message);
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
    console.log("AHI DATA: ");
    retrieveUserData();
});

// Function to get BMI category based on BMI value
function getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi <= 29.9) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}

// Function to go back to the previous page
const goBack = () => {
    window.history.back();
};


const userData = ref([]);
const retrieveUserData = async () => {
    try {
        const response = await axios.post("http://localhost:5000/retrieveUserData", {
            UserID: localStorage.getItem("userId"),
        });
        if (response.status === 200) {
            let data = await response.data;
            userData.value.push({ data }); // Update the user data

            retrieveAHIData(data.Time[0].TimeIn, data.Time[0].TimeOut);

            console.log(data);
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// const userAHIData = ref([]);
const Severity = ref(""); // for add
const AHI = ref(""); // for add
const Normal = ref(""); // for add
const Apnea = ref(""); // for add
const Hypopnea = ref(""); // for add
const retrieveAHIData = async (timeIn, timeOut) => {
    try {
        const response = await axios.post("http://localhost:5000/retrieveAHItable", {
            UserID: localStorage.getItem("userId"), // Replace with localStorage.getItem("userId") if needed
            TimeIn: timeIn,
            TimeOut: timeOut,
        });

        if (response.status === 200) {

            let data = await response.data;
            // console.log("dsadasdas", data.Severity)
            // userAHIData.value.push(data);
            Severity.value = data.Severity; // for add
            AHI.value = data.AHI; // for add
            Normal.value = data.Normal; // for add
            Apnea.value = data.Apnea; // for add
            Hypopnea.value = data.Hypopnea; // for add


            console.log("Request Succesful")
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

</script>

<template>
    <div class="container" v-if="dataLoaded">
        <header>
            <div class="patient-photo-container">
                <div class="patient-photo"
                    :class="{ 'female': user && user.gender.toLowerCase() === 'female', 'hidden': !user || !user.gender }">
                </div>
            </div>

            <ul>
                <div class="patient-info">
                    <h1> Name: <a> {{ user?.fname }} {{ user?.mname }} {{ user?.lname }}</a></h1>
                </div>
                <div class="patient-info">
                    <h2> Age: {{ user?.age }}</h2>
                </div>
                <div class="patient-info">
                    <h3>Gender: <a>{{ user?.gender }}</a></h3>
                </div>
                <div class="patient-info">
                    <h3>BMI: {{ calculatedBMI.toFixed(1) }}</h3>
                </div>
                <div class="patient-info">
                    <h3>Category: <a>{{ getBMICategory(calculatedBMI) }}</a></h3>
                </div>
            </ul>
            <div class="title-logo"></div>
        </header>

        <div class="buttons">
            <button class="button" style="background-color: whitesmoke; border: 2px solid #11499C; color: #11499C;"
                @click="goBack"><i class="fa-solid fa-backward"></i> Back</button>
            <button class="button" style="background-color: #11499C; color: white;" @click="generatePDF"><i
                    class="fa-solid fa-file-pdf"></i> Save as PDF</button>
        </div>

        <ChartComponent />

    </div>
    <div v-else>
        <div class="loading"><i class="fa-solid fa-spinner"></i>
            <h1>Loading...</h1>
        </div>
        <Sidebar />
    </div>
</template>

<style scoped>
.container {
    position: absolute;
    /* height: 100%; */
    width: 100%;
    background: whitesmoke;
}

h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

header {
    background-color: #326ABD;
    color: white;
    display: flex;
    flex-direction: row;
    background-size: contain;
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

.title-logo {
    position: relative;
    background: url(images/edosa-logo.png) no-repeat center center/cover;
    background-size: contain;
    border-radius: 10px;
    width: 400px;
    margin-left: auto;
    margin-right: 10px;
}

img {
    position: relative;
    width: 15%;
}

.buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 50px;


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
    margin-top: 10px;
    text-decoration: none;
    margin-bottom: 10px;
}

.button:hover {
    transform: scale(1.1);
}

.patient-info a {
    text-transform: uppercase;
}


.loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-0%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 50px;
    color: #326ABD;
}

.loading h1 {
    margin-top: 10px;
    font-size: 25px;
    color: #444;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Apply animation to the spinner icon */
.fa-spinner {
    animation: spin 2s linear infinite;
    /* Spin continuously */
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

    .result-cards>div {
        flex-basis: 100%;
    }

    .card {
        width: 90%;
    }

    .buttons {
        flex-direction: column;
        align-items: center;
    }

    .button {
        margin: 0;
        margin-top: 10px;
        margin-bottom: 10px;
        justify-content: center;
    }

    h1 {
        font-size: 30x;
    }

    h2 {
        font-size: 25px;
    }

    h3 {
        font-size: 20px;
    }

    .title-logo {
        width: 200px;
    }

    .patient-photo h1 {
        background-size: cover;
    }

    @media (max-width: 650px) {

        .patient-photo h1 {
            display: none;
        }

        .title-logo {
            display: none;
        }

        .card {
            height: 100%;
            width: 100%;
        }

        .card2 {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
