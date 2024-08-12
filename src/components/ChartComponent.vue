<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';
import { onMounted, ref, } from 'vue';
import axios from 'axios';
import zoomPlugin from 'chartjs-plugin-zoom';
// import 'chartjs-adapter-date-fns';

Chart.register(zoomPlugin);

const showChartView = ref(false);
const showLoadingModalState = ref(false);
const dataLoaded = ref(false);

// const toggleChartView = () => {
//     showChartView.value = !showChartView.value;
// };

// Create a reactive variable for userData CHART TABLES
const userData = ref([]);
const heartData = ref([]);
const oxygenData = ref([]);
const airData = ref([]);
const snoreData = ref([]);
const ecgData = ref([]);
const thermData = ref([]);


// Summary Tables
const severity = ref('');
const AHI = ref('');
const apnea = ref('');
const hypopnea = ref('');
const normal = ref('');
const MT = ref('');
const avg_HR = ref('');
const lowest_HR = ref('');
const highest_HR = ref('');
const ODI3 = ref('');
const ODI4 = ref('');
const lowest_SpO2 = ref('');
const avg_SpO2 = ref('');
const highest_SpO2 = ref('');
const repeat_study = ref('');
const recommendations = ref('');



const updateSummaryData = (data) => {
    severity.value = data.Severity;
    AHI.value = data.AHI;
    apnea.value = data.Apnea;
    hypopnea.value = data.Hypopnea;
    normal.value = data.Normal;
    MT.value = data.MT;
    avg_HR.value = data.avg_HR;
    lowest_HR.value = data.lowest_HR;
    highest_HR.value = data.highest_HR;
    ODI3.value = data.ODI3;
    ODI4.value = data.ODI4;
    lowest_SpO2.value = data.lowest_SpO2;
    avg_SpO2.value = data.avg_SpO2;
    highest_SpO2.value = data.highest_SpO2;
    repeat_study.value = data.repeat_study;
    recommendations.value = data.recommendations;
};

// Function to retrieve user data using Axios
const retrieveUserData = async () => {
    try {
        const response = await axios.post("http://localhost:5000/retrieveUserData", {
            UserID: localStorage.getItem("userId"),
        });
        if (response.status === 200) {
            let data = await response.data;
            userData.value.push({ data }); // Update the user data
            dataLoaded.value = true;
            //console.log(data);
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Function to retrieve user data using Axios
let cancelTokenSource;
const retrieveUserInstance = async (timeIn, timeOut) => {
    try {
        // Cancel previous request if it exists
        if (cancelTokenSource) {
            cancelTokenSource.cancel("Request canceled by the user");
        }

        // Create a new cancel token
        cancelTokenSource = axios.CancelToken.source();
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(3000);
        const response = await axios.post("http://localhost:5000/retrieveUserInstance", {
            UserID: localStorage.getItem("userId"), // Replace with localStorage.getItem("userId") if needed
            TimeIn: timeIn,
            TimeOut: timeOut,
        }, {
            cancelToken: cancelTokenSource.token
        });

        if (response.status === 200) {

            const responseData = response.data;
            updateSummaryData(responseData);

            // Parse data
            let heartdata = JSON.parse(response.data.HR);
            let oxygendata = JSON.parse(response.data.SpO2);
            let airdata = JSON.parse(response.data.Airflow);
            let snoredata = JSON.parse(response.data.Snore);
            let ecgdata = JSON.parse(response.data.ECG);
            let thermdata = JSON.parse(response.data.Therm);

            // Update chart datasets
            heartrateChart.data.datasets[0].data = heartdata;
            oxygenlevelChart.data.datasets[0].data = oxygendata;
            airflowChart.data.datasets[0].data = airdata;
            snorelevelChart.data.datasets[0].data = snoredata;
            ecglevelChart.data.datasets[0].data = ecgdata;
            thermflowChart.data.datasets[0].data = thermdata;


            // Update charts
            heartrateChart.update();
            oxygenlevelChart.update();
            airflowChart.update();
            snorelevelChart.update();
            ecglevelChart.update();
            thermflowChart.update();



            console.log(heartdata);
            console.log(oxygendata);
            console.log(airdata);
            console.log(snoredata);
            console.log(ecgdata);
            console.log(thermdata);


            console.log(severity);
            console.log(AHI);
            console.log(apnea);
            console.log(hypopnea);
            console.log(normal);
            console.log(MT);
            console.log(avg_HR);
            console.log(lowest_HR);
            console.log(highest_HR);
            console.log(ODI3);
            console.log(ODI4);
            console.log(lowest_SpO2);
            console.log(avg_SpO2);
            console.log(highest_SpO2);
            console.log(repeat_study);
            console.log(recommendations);


            // console.log(response.status, response.statusText);
            // console.log("userData: ", userData.value); // Output user data to console
            // console.log("HEART DATA: ", heartrateChart.data.labels)
            // console.log("timeOutArray: ", timeOutArray)
            // console.log(timeInArray[0])


            let dateInArray = timeIn.split(' ');
            let dateOutArray = timeOut.split(' ');
            let timeInArray = dateInArray[1].split(':');
            let timeOutArray = dateOutArray[1].split(':');

            //CREATE  8 HOUR  TIMESTAMP
            const startDate = new Date();
            startDate.setHours(parseInt(timeInArray[0]), parseInt(timeInArray[1]), parseInt(timeInArray[2]), 0); // Set the start time to 00:00
            const endDate = new Date();
            endDate.setHours(parseInt(timeOutArray[0]), parseInt(timeOutArray[1]), parseInt(timeOutArray[2]), 0); // Set the end time to 08:00

            const labels = [];

            for (let x = new Date(startDate); x <= endDate; x.setMilliseconds(x.getMilliseconds() + 1)) {
                const hours = x.getHours().toString().padStart(2, '0');
                const minutes = x.getMinutes().toString().padStart(2, '0');
                const milliseconds = x.getMilliseconds().toString().padStart(2, '0');
                const label = `${hours}:${minutes}:${milliseconds}`;
                labels.push(label);
            }

            let heartdataLength = heartdata.length;
            let heartslicedLabels = labels.slice(0, heartdataLength);
            heartrateChart.data.labels = heartslicedLabels;
            heartrateChart.data.datasets[0].data = heartdata;

            let oxygendataLength = oxygendata.length;
            let oxygenslicedLabels = labels.slice(0, oxygendataLength);
            oxygenlevelChart.data.labels = oxygenslicedLabels;
            oxygenlevelChart.data.datasets[0].data = oxygendata;


            let airdataLength = airdata.length;
            let airslicedLabels = labels.slice(0, airdataLength);
            airflowChart.data.labels = airslicedLabels;
            airflowChart.data.datasets[0].data = airdata;

            let snoredataLength = snoredata.length;
            let snoreslicedLabels = labels.slice(0, snoredataLength);
            snorelevelChart.data.labels = snoreslicedLabels;
            snorelevelChart.data.datasets[0].data = snoredata;

            let ecgdataLength = ecgdata.length;
            let ecgslicedLabels = labels.slice(0, ecgdataLength);
            ecglevelChart.data.labels = ecgslicedLabels;
            ecglevelChart.data.datasets[0].data = ecgdata;

            let thermdataLength = thermdata.length;
            let thermslicedLabels = labels.slice(0, thermdataLength);
            thermflowChart.data.labels = thermslicedLabels;
            thermflowChart.data.datasets[0].data = thermdata;


            heartrateChart.update();
            oxygenlevelChart.update();
            airflowChart.update();
            snorelevelChart.update();
            ecglevelChart.update();
            thermflowChart.update();


            console.log("Request Succesful")
            showLoadingModalState.value = false;
            document.body.style.overflow = 'auto';
        } else {
            console.error("Error:", response.status, response.statusText, response.data);
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
};

const toggleChartViewAndRetrieve = (timeIn, timeOut) => {
    showChartView.value = true;
    document.body.style.overflow = 'hidden';
    retrieveUserInstance(timeIn, timeOut);
    showLoadingModalState.value = true; // Set the value to true to display the modal
};

const resetRequest = () => {
    // Cancel the request if it's ongoing
    if (cancelTokenSource) {
        cancelTokenSource.cancel("Request canceled by the user");
        showLoadingModalState.value = false;
        document.body.style.overflow = 'auto';
        showChartView.value = false;
    }
};

///CREATE 100 DATA POINTS
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const ecgdata = Array.from({ length: 2080 }, (_, index) => getRandomInt(1, 100));
const thermdata = Array.from({ length: 2080 }, (_, index) => getRandomInt(1, 65));

///CREATE  8 HOUR  TIMESTAMP
const startDate = new Date();
startDate.setHours(0, 0, 0, 0); // Set the start time to 00:00

const endDate = new Date();
endDate.setHours(8, 0, 0, 0); // Set the end time to 08:00

const labels = [];

for (let x = new Date(startDate); x <= endDate; x.setMinutes(x.getMinutes() + 1)) {
    const hours = x.getHours().toString().padStart(2, '0');
    const minutes = x.getMinutes().toString().padStart(2, '0');
    const label = `${hours}:${minutes}`;
    labels.push(label);
}


///// CHART DATA /////
var heartratedata = {
    labels: labels,
    datasets: [{
        radius: 0,
        label: 'Heart Rate',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        data: heartData
    },]
};



var oxygenleveldata = {
    labels: labels,
    datasets: [{
        stepped: true,
        radius: 0,
        label: 'Oxygen Level',
        backgroundColor: 'rgb(0, 100, 0)',
        borderColor: 'rgb(0, 255, 0)',
        data: oxygenData
    },
    ]
};

var airflowdata = {
    labels: labels,
    datasets: [{
        fill: true,
        radius: 0,
        label: 'AirFlow Level',
        backgroundColor: 'rgb(0, 0, 255, 0.4)',
        borderColor: 'rgb(0, 0, 255)',
        data: airData
        ,
    }
    ]
};


var snoreleveldata = {
    labels: labels,
    datasets: [{
        radius: 0,
        label: 'Snore Level',
        backgroundColor: 'rgb(255, 165, 0)',
        borderColor: 'rgb(255, 165, 0)',
        data: snoreData
        ,
    },]
};

var ecgleveldata = {
    labels: labels,
    datasets: [{
        radius: 0,
        label: 'ECG',
        backgroundColor: 'rgb(255, 0, 255)',
        borderColor: 'rgb(255, 0, 255)',
        data: ecgData
    },]
};

var thermistorflowdata = {
    labels: labels,
    datasets: [{
        radius: 0,
        stepped: true,
        label: 'Thermistor Flow',
        backgroundColor: 'rgb(160, 32, 240)',
        borderColor: 'rgb(160, 32, 240)',
        data: thermData
    },]
};

////// CHART CONFIGURATION /////
const heartconfig: ChartConfiguration = {
    type: 'line',
    data: heartratedata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                },

            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'bpm';
                    },
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};

const oxygenconfig: ChartConfiguration = {
    type: 'line',
    data: oxygenleveldata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                }
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + '%';
                    }
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};
const airconfig: ChartConfiguration = {
    type: 'line',
    data: airflowdata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                }
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'cfm';
                    }
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};
const snoreconfig: ChartConfiguration = {
    type: 'bar',
    data: snoreleveldata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                }
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'db';
                    }
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};

const ECGconfig: ChartConfiguration = {
    type: 'line',
    data: ecgleveldata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                }
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'bpm';
                    }
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};

const thermistorconfig: ChartConfiguration = {
    type: 'line',
    data: thermistorflowdata,
    options: {
        // ... other options
        scales: {
            x: {
                grid: {
                    tickColor: 'black',
                }
            },
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + '°';
                    }
                },
                grid: {
                    tickColor: 'black',
                },
            }
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x', // Enable panning on x-axis only
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x', // Enable zooming on x-axis only
                },
            },
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    },
};


///////// CHART RENDER ///////////
var heartrateChart;
var oxygenlevelChart;
var airflowChart;
var snorelevelChart;
var ecglevelChart;
var thermflowChart;

onMounted(() => {
    retrieveUserData();

    const desiredZoomLevel = 2.5; // 250% zoom level
    const heartTag = <ChartItem>document.getElementById('heartrateChart')
    const oxygenTag = <ChartItem>document.getElementById('oxygenlevelChart')
    const airTag = <ChartItem>document.getElementById('airflowChart')
    const snoreTag = <ChartItem>document.getElementById('snorelevelChart')
    const ECGTag = <ChartItem>document.getElementById('ECGChart')
    const themistorTag = <ChartItem>document.getElementById('thermistorflowChart')

    heartrateChart = new Chart(
        heartTag,
        heartconfig
    );
    heartrateChart.zoom({ x: { from: 0, to: desiredZoomLevel } }); // Adjust 'from' and 'to' values as needed


    oxygenlevelChart = new Chart(
        oxygenTag,
        oxygenconfig
    );
    oxygenlevelChart.zoom({ x: { from: 0, to: desiredZoomLevel } });

    airflowChart = new Chart(
        airTag,
        airconfig
    );
    airflowChart.zoom({ x: { from: 0, to: desiredZoomLevel } });

    snorelevelChart = new Chart(
        snoreTag,
        snoreconfig
    );
    snorelevelChart.zoom({ x: { from: 0, to: desiredZoomLevel } });

    ecglevelChart = new Chart(
        ECGTag,
        ECGconfig
    );
    ecglevelChart.zoom({ x: { from: 0, to: desiredZoomLevel } });

    thermflowChart = new Chart(
        themistorTag,
        thermistorconfig
    );
    thermflowChart.zoom({ x: { from: 0, to: desiredZoomLevel } });

    const containerHeart = document.querySelector('.containerHeart') ?? document.createElement('div') as HTMLElement;
    const heartLabels = heartrateChart.data.labels?.length ?? 0;

    if (heartLabels > 5) {
        const newWidth = 700 + ((heartLabels - 5) * 5);
        (containerHeart as HTMLElement).style.width = `${newWidth}px`;
    }


    const containerOxygen = document.querySelector('.containerOxygen') ?? document.createElement('div') as HTMLElement;
    const oxygenLabels = oxygenlevelChart.data.labels?.length ?? 0;

    if (oxygenLabels > 5) {
        const newWidth = 700 + ((oxygenLabels - 5) * 5);
        (containerOxygen as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerAir = document.querySelector('.containerAir') ?? document.createElement('div') as HTMLElement;
    const airLabels = airflowChart.data.labels?.length ?? 0;

    if (airLabels > 5) {
        const newWidth = 700 + ((airLabels - 5) * 5);
        (containerAir as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerSnore = document.querySelector('.containerSnore') ?? document.createElement('div') as HTMLElement;
    const snoreLabels = snorelevelChart.data.labels?.length ?? 0;

    if (snoreLabels > 5) {
        const newWidth = 700 + ((snoreLabels - 5) * 5);
        (containerSnore as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerECG = document.querySelector('.containerECG') ?? document.createElement('div') as HTMLElement;
    const ecgLabels = ecglevelChart.data.labels?.length ?? 0;

    if (ecgLabels > 5) {
        const newWidth = 700 + ((ecgLabels - 5) * 5);
        (containerECG as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerTherm = document.querySelector('.containerTherm') ?? document.createElement('div') as HTMLElement;
    const thermLabels = thermflowChart.data.labels?.length ?? 0;

    if (thermLabels > 5) {
        const newWidth = 700 + ((snoreLabels - 5) * 5);
        (containerTherm as HTMLElement).style.width = `${newWidth}px`;
    }

    heartrateChart; oxygenlevelChart;
    airflowChart; snorelevelChart;
    ecglevelChart; thermflowChart;
})

</script>

<template>
    <div>
        <div class="my-resulthistory">
            <div class="heading">
                <h2> My Result History</h2>
            </div>
            <table>
                <thead>
                    <td>Date/Time In</td>
                    <td>Date/Time Out</td>
                    <td>Actions</td>
                </thead>
                <tbody v-if="userData.length > 0">
                    <template v-for="data in userData">
                        <tr v-for="time in data.data.Time">
                            <td>{{ time.TimeIn }}</td>
                            <td>{{ time.TimeOut }}</td>
                            <td>
                                <div class="view">
                                    <i class="far fa-eye" @click="toggleChartViewAndRetrieve(time.TimeIn, time.TimeOut)">
                                        View Details</i>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
                <tbody v-else>
                    <div class="note"> No Previous Result Yet</div>
                </tbody>
            </table>
        </div>
        <div>
            <h2>SUMMARY OF FINDINGS</h2>
            <div class="result-cards">
                <div class="card">
                    <div class="name">Severity</div>
                    <img src="images/heart-impulse.png" alt="Avatar">
                    <div class="result">{{ severity }}</div> <!-- for add -->
                </div>
                <div class="card">
                    <div class="name">AHI Score</div>
                    <img src="images/AHI-Score.png" alt="Avatar">
                    <div class="result">{{ typeof AHI === 'number' ? AHI.toFixed(3) : '' }}</div>
                </div>
                <div class="card">
                    <div class="name">Apnea</div>
                    <img src="images/airflow.png" alt="Avatar">
                    <div class="result">{{ apnea }}</div>
                </div>
                <div class="card">
                    <div class="name">Hypopnea</div>
                    <img src="images/oxygen-level.png" alt="Avatar">
                    <div class="result">{{ hypopnea }}</div>
                </div>
                <div class="card">
                    <div class="name">Normal</div>
                    <img src="images/bloodpressure-level.png" alt="Avatar">
                    <div class="result">{{ normal }}</div>
                </div>
            </div>
        </div>
        <footer>
            <div class="my-other-result" v-show="showChartView">
                <div class="heading">
                    <h2>Other Significant Result</h2>
                </div>
                <div class="footer-columns">
                    <div class="footer-column">
                        <table>
                            <tr>
                                <th>Monitoring Time</th>
                                <td>{{ MT }}hr/m</td>
                            </tr>
                            <tr>
                                <th>Lowest Heart rate</th>
                                <td>{{ lowest_HR }} bpm</td>
                            </tr>
                            <tr>
                                <th>Average Heart rate</th>
                                <td>{{ avg_HR }} bpm</td>
                            </tr>
                            <tr>
                                <th>Highest Heart rate</th>
                                <td>{{ highest_HR }} bpm</td>
                            </tr>
                        </table>
                    </div>
                    <div class="footer-column">
                        <table>
                            <tr>
                                <th>Oxygen Desaturation Index at >= 3%</th>
                                <td>{{ ODI3 }}</td>
                            </tr>
                            <tr>
                                <th>Oxygen Desaturation Index at >= 4%</th>
                                <td>{{ ODI4 }}</td>
                            </tr>
                            <tr>
                                <th>Lowest SpO2</th>
                                <td>{{ lowest_SpO2 }}%</td>
                            </tr>
                            <tr>
                                <th>Average SpO2</th>
                                <td>{{ avg_SpO2 }}%</td>
                            </tr>
                            <tr>
                                <th>Highest SpO2</th>
                                <td>{{ highest_SpO2 }}%</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="heading">
                    <h2>Recommendations</h2>
                </div>
                <li>{{ repeat_study }}</li>
                <li>{{ recommendations }}</li>
            </div>
        </footer>
        <h2 v-show="showChartView">RESULT CHARTS</h2>
        <div class="row">
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">HEART RATE</div>
                    <div class="containerHeart">
                        <canvas id="heartrateChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">OXYGEN LEVEL</div>
                    <div class="containerOxygen">
                        <canvas id="oxygenlevelChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">AIRFLOW</div>
                    <div class="containerAir">
                        <canvas id="airflowChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">SNORE LEVEL</div>
                    <div class="containerSnore">
                        <canvas id="snorelevelChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">ECG</div>
                    <div class="containerECG">
                        <canvas id="ECGChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="chartview" v-show="showChartView">
                <div class="container">
                    <div class="chartname">THERMISTOR FLOW</div>
                    <div class="containerTherm">
                        <canvas id="thermistorflowChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <!-- Loading Result Modal -->
        <div v-if="showLoadingModalState" class="overlay" @click="resetRequest"></div>
        <div :class="{ modal: true, show: showLoadingModalState }" id="deleteAppointmentModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="close" @click="resetRequest">
                        <span aria-hidden="false"><i class="fa-solid fa-xmark"></i></span>
                    </div>
                    <div class="loading-logo"><i class="fa-solid fa-spinner"></i></div>
                    <h5 class="modal-title">Loading...</h5>
                </div>
            </div>
        </div>
        <!-- End of Loading Result Modal -->
    </div>
</template>


<style scoped>
.footer-columns {
    display: flex;
    justify-content: space-between;
    padding: 20px;
}

.footer-column {
    width: 45%;
    /* Adjust the width as needed */
}

/* Additional styling for clarity */
.footer-column h2 {
    color: #333;
}

.footer-column table {
    width: 100%;
    border-collapse: collapse;
}

.footer-column table td,
.footer-column table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.footer-column table th {
    background-color: #f2f2f2;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black */
    z-index: 1000;
    /* Ensure overlay is above other content */
}

.loading-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 19px;
    font-size: 50px;
    color: #326ABD;
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

.fa-spinner {
    animation: spin 2s linear infinite;
    /* Spin continuously */
    animation-delay: 3s;
    /* Add delay of 3 seconds */
}

.modal {
    display: none;
    background-color: #114A9c;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    max-width: 90%;
    width: 400px;
    z-index: 9999;
    padding: 10px;
}

.name {
    color: white;
}

.result {
    font-size: 30px;
    font-weight: 600;
}

.modal-title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    text-transform: uppercase;
    margin: auto;
}

.show {
    display: block;
}

.close {
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 9999;
    font-size: 30px;
    font-weight: bold;
    /* color: red; */
}



.heading h2 {
    display: flex;
    justify-content: start;
    width: 100%;
    border-bottom: 3px solid #326ABD;
}

h2 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.chartview {
    height: 50%;
    background-color: white;
    padding: 20px;
    border: solid 3px #326ABD;
    border-radius: 40px;
    margin: 5px;
    margin-bottom: 20px;
    /* box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.5); */
}

.container {
    width: 100%;
    max-width: 850px;
    overflow-x: auto;
}

.chartname {
    position: relative;
    margin-left: 30px;
}

.containerHeart,
.containerOxygen,
.containerAir,
.containerSnore,
.containerECG,
.containerTherm {
    height: 400px;
}

.my-resulthistory {
    position: relative;
    margin: 20px auto;
    min-height: 350px;
    width: 90%;
    background: whitesmoke;
    padding: 20px;
    border: solid 3px #326ABD;
    border-radius: 40px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
}

.my-other-result {
    position: relative;
    margin: 20px auto;
    min-height: 350px;
    width: 90%;
    background: whitesmoke;
    padding: 20px;
    border: solid 3px #326ABD;
    border-radius: 40px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
}

.heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #444;
}

table {
    margin-top: 10px;
    width: 100%;
    border-collapse: collapse;
}

thead td {
    font-weight: 600;
    color: #333;

}


table tr {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

tbody tr:hover {
    background: skyblue;
}

image.png table tbody tr:last-child {
    border-bottom: none;
}

td {
    padding: 9px 5px;
}

td i {
    padding: 7px;
    margin: 2px;
    color: #fff;
    border-radius: 50px;
}

.my-resulthistory table tbody td:last-child {
    white-space: nowrap;
}

.my-other-result table tbody td:last-child {
    white-space: nowrap;
}

.fa-eye {
    background: #32bea6;
}

.fa-eye:hover {
    cursor: pointer;
}

.fa-eye:active {
    transform: scale(.8);
}

.view {
    font-size: 15px;

}

.result-cards {
    min-height: 50%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    box-sizing: border-box;
}

.result-cards>div {
    display: flex;
    flex-basis: calc(50% - 40px);
    justify-content: center;
    flex-direction: column;
    border-radius: 40px;
}

.result-cards {
    position: relative;
    width: 100%;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    /* grid-template-columns: 200px 200px; */
    grid-row: auto auto;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}

.card {
    background: linear-gradient(0deg, whitesmoke, #114A9c);
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    border: #114A9c solid 3px;
    /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5); */


}

img {
    position: relative;
    width: 40%;
}

h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
}

.note {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30px;
    font-weight: bold;
    opacity: 0.5;
}

.bullet-list {
    columns: 2;
    /* Divide list items into two columns */
    list-style: none;
    /* Remove default bullet points */
}

.bullet-list li {
    margin-bottom: 10px;
    /* Add spacing between list items */
}

/* Responsive Styles */

@media (max-width: 1820px) {
    .row {
        display: block;
    }

    .container {
        width: 100%;
        max-width: 100%;
        overflow-x: auto;
    }

    img {
        width: 60%;
    }

    @media(max-width: 820px) {
        img {
            width: 100%;
        }

        .result-cards {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .chartview {
            height: auto;
            margin-bottom: 10px;
        }

        .container {
            overflow-x: auto;
            padding: 0 10px;
        }

        .containerHeart,
        .containerOxygen,
        .containerAir,
        .containerSnore,
        .containerECG,
        .containerTherm {
            height: 300px;
        }
    }

    @media (max-width: 576px) {
        .chartview {
            padding: 10px;
            border-radius: 20px;
        }



        .containerHeart,
        .containerOxygen,
        .containerAir,
        .containerSnore,
        .containerECG,
        .containerTherm {
            height: 200px;
        }
    }
}
</style>
