<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';
import { onMounted } from 'vue';


const labels = [
    '0:00', '0.10', '0:20', '0.30', '0:40', '0.50', 
    '1:00', '1:10','1:20', '1.30', '1:40', '1.50',
    '2:00', '2.10', '2:20', '2.30', '2:40', '2.50',
    '3:00', '3.10', '3:20', '3.30', '3:40', '3.50', 
    '4:00', '4:10', '4:20', '4:30', '4:40', '4:50', 
    '5:00', '5:10', '5:20', '5:30', '5:40', '5:50', 
    '6:00', '6:10', '6:20', '6:30', '6:40', '6:50', 
    '7:00', '7:10', '7:20', '7:30', '7:40', '7:50', 
    '8:00',
];


///// CHART DATA /////
const heartratedata = {
    labels: labels,
    datasets: [{
        label: 'Heart Rate',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        data:  [72, 68, 76, 82, 78, 85, 90, 88, 95, 92, 89, 93, 84, 79, 75, 71, 
        69, 83, 87, 94, 91, 86, 81, 77, 73, 70, 74, 80, 84, 90, 95, 99, 97, 93,
         89, 85, 81, 77, 73, 69, 75, 80, 86, 91, 96, 100, 98, 94, 90]
        ,
    },]
};

const oxygenleveldata = {
    labels: labels,
    datasets: [{
        stepped: true,
        label: 'Oxygen Level',
        backgroundColor: 'rgb(0, 100, 0)',
        borderColor: 'rgb(0, 255, 0)',
        data: [98, 96, 94, 97, 92, 95, 93, 99, 91, 96, 98, 95, 97, 92, 94, 93, 97,
         95, 90, 96, 98, 94, 92, 93, 99, 96, 97, 94, 95, 93, 98, 92, 91, 96, 97, 94, 95,
          93, 99, 96, 98, 94, 92, 93, 97, 96, 95, 93, 91, 90]
        ,
    },
    ]
};

const airflowdata = {
    labels: labels,
    datasets: [{
        fill: true,
        tension: 0.4,
        label: 'AirFlow Level',
        backgroundColor: 'rgb(0, 0, 255, 0.4)',
        borderColor: 'rgb(0, 0, 255)',
        data: [22.5, 18.9, 24.3, 20.1, 23.8, 19.6, 21.4, 25.2, 17.8, 22.9, 23.5, 19.7, 20.8, 24.9,
        18.3, 21.9, 19.1, 23.2, 25.6, 17.5, 20.4, 24.7, 22.1, 19.4, 21.7, 18.6, 23.4, 22.8, 19.8,
        20.3, 24.1, 17.9, 22.7, 23.9, 18.2, 21.2, 25.1, 20.6, 19.3, 23.6, 18.5, 24.5, 22.3, 19.2,
        21.6, 25.4, 17.6, 20.7, 23.1, 22.6, 19.5, 21.1]

        ,
    }
    ]
};


const snoreleveldata = {
    labels: labels,
    datasets: [{
        label: 'Snore Level',
        backgroundColor: 'rgb(255, 165, 0)',
        borderColor: 'rgb(255, 165, 0)',
        data: [43.2, 37.8, 45.5, 41.6, 39.9, 48.7, 42.1, 38.4, 44.9, 46.3, 40.5,
        47.2, 36.9, 43.8, 39.1, 47.9, 42.6, 38.7, 45.2, 41.3, 46.7, 37.5, 44.4,
        40.7, 49.3, 36.2, 43.1, 38.3, 46.9, 39.8, 45.6, 41.2, 48.9, 37.7, 42.4, 
        40.1, 47.4, 36.7, 43.6, 39.4, 46.1, 38.5, 44.1, 41.8, 49.2, 37.2, 43.9, 
        38.2, 45.8, 40.3, 47.8, 36.4]

        ,
    },]
};

const ECGdata = {
    labels: labels,
    datasets: [{
        label: 'ECG',
        backgroundColor: 'rgb(255, 0, 255)',
        borderColor: 'rgb(255, 0, 255)',
        data: [0.12, 0.16, 0.14, 0.11, 0.09, 0.08, 0.13, 0.16, 0.18, 0.21, 0.25, 0.29,
         0.31, 0.28, 0.26, 0.23, 0.19, 0.15, 0.11, 0.07, 0.04, 0.02, 0.01, 0.03, 0.06,
          0.09, 0.14, 0.17, 0.19, 0.22, 0.24, 0.28, 0.29, 0.27, 0.24, 0.21, 0.18, 0.14,
           0.11, 0.08, 0.05, 0.02, 0.01, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18, 0.21, 0.24]
        ,
    },]
};

const thermistorflowdata = {
    labels: labels,
    datasets: [{
        stepped: true,
        label: 'Thermistor Flow',
        backgroundColor: 'rgb(160, 32, 240)',
        borderColor: 'rgb(160, 32, 240)',
        data: [0, 13, 82, 34, 47, 75, 19, 63, 91, 6, 29, 97, 1, 76, 42, 9,
         50, 85, 32, 3, 65, 99, 11, 24, 72, 93, 89, 69, 37, 58, 40, 96, 55, 
         30, 80, 66, 16, 44, 87, 26, 7, 68, 98, 52, 45, 83, 14, 61, 0]
        ,
    },]
};

////// CHART CONFIGURATION /////
const heartconfig: ChartConfiguration = {
    type: 'line',
    data: heartratedata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'bpm';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        }
    }
};

const oxygenconfig: ChartConfiguration = {
    type: 'line',
    data: oxygenleveldata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + '%';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const airconfig: ChartConfiguration = {
    type: 'line',
    data: airflowdata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'cfm';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};
const snoreconfig: ChartConfiguration = {
    type: 'bar',
    data: snoreleveldata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'db';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

const ECGconfig: ChartConfiguration = {
    type: 'line',
    data: ECGdata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return value + 'ms';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

const thermistorconfig: ChartConfiguration = {
    type: 'line',
    data: thermistorflowdata,
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, ticks) {
                        return  value + '°';
                    }
                }
            }
        },
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        }
    }
};

///////// CHART RENDER ///////////
onMounted(() => {
    const heartTag = <ChartItem>document.getElementById('heartrateChart')
    const heartrateChart = new Chart(
        heartTag,
        heartconfig
    );
    const oxygenTag = <ChartItem>document.getElementById('oxygenlevelChart')
    const oxygenlevelChart = new Chart(
        oxygenTag,
        oxygenconfig
    );
    const airTag = <ChartItem>document.getElementById('airflowChart')
    const airflowChart = new Chart(
        airTag,
        airconfig
    );
    const snoreTag = <ChartItem>document.getElementById('snorelevelChart')
    const snorelevelChart = new Chart(
        snoreTag,
        snoreconfig
    );
    const ECGTag = <ChartItem>document.getElementById('ECGChart')
    const ECGChart = new Chart(
        ECGTag,
        ECGconfig
    );
    const themistorTag = <ChartItem>document.getElementById('thermistorflowChart')
    const thermistorflowChart = new Chart(
        themistorTag,
        thermistorconfig
    );

    const containerHeart = document.querySelector('.containerHeart') ?? document.createElement('div') as HTMLElement;
    const heartLabels = heartrateChart.data.labels?.length ?? 0;

    if (heartLabels > 5) {
        const newWidth = 700 + ((heartLabels - 5) * 30);
        (containerHeart as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerOxygen = document.querySelector('.containerOxygen') ?? document.createElement('div') as HTMLElement;
    const oxygenLabels = oxygenlevelChart.data.labels?.length ?? 0;

    if (oxygenLabels > 5) {
        const newWidth = 700 + ((oxygenLabels - 5) * 30);
        (containerOxygen as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerAir = document.querySelector('.containerAir') ?? document.createElement('div') as HTMLElement;
    const airLabels = airflowChart.data.labels?.length ?? 0;

    if (airLabels > 5) {
        const newWidth = 700 + ((airLabels - 5) * 30);
        (containerAir as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerSnore = document.querySelector('.containerSnore') ?? document.createElement('div') as HTMLElement;
    const snoreLabels = snorelevelChart.data.labels?.length ?? 0;

    if (snoreLabels > 5) {
        const newWidth = 700 + ((snoreLabels - 5) * 20);
        (containerSnore as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerECG = document.querySelector('.containerECG') ?? document.createElement('div') as HTMLElement;
    const ecgLabels = ECGChart.data.labels?.length ?? 0;

    if (ecgLabels > 5) {
        const newWidth = 700 + ((ecgLabels - 5) * 30);
        (containerECG as HTMLElement).style.width = `${newWidth}px`;
    }

    const containerTherm = document.querySelector('.containerTherm') ?? document.createElement('div') as HTMLElement;
    const thermLabels = thermistorflowChart.data.labels?.length ?? 0;

    if (thermLabels > 5) {
        const newWidth = 700 + ((snoreLabels - 5) * 30);
        (containerTherm as HTMLElement).style.width = `${newWidth}px`;
    }
    
    heartrateChart; oxygenlevelChart;
    airflowChart; snorelevelChart;
    ECGChart; thermistorflowChart;
})

</script>

<template>
    <h2>POST RESULT</h2>
    <div class="row">
        <div class="chartview">
            <div class="container">
                <div class="chartname">HEART RATE</div>
                <div class="containerHeart">
                    <canvas id="heartrateChart"></canvas>
                </div>
            </div>
        </div>
        <div class="chartview">
            <div class="container">
                <div class="chartname">OXYGEN LEVEL</div>
                <div class="containerOxygen">
                    <canvas id="oxygenlevelChart"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="chartview">
            <div class="container">
                <div class="chartname">AIRFLOW</div>
                <div class="containerAir">
                    <canvas id="airflowChart"></canvas>
                </div>
            </div>
        </div>
        <div class="chartview">
            <div class="container">
                <div class="chartname">SNORE LEVEL</div>
                <div class="containerSnore">
                    <canvas id="snorelevelChart"></canvas>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="chartview">
            <div class="container">
                <div class="chartname">ECG</div>
                <div class="containerECG">
                    <canvas id="ECGChart"></canvas>
                </div>
            </div>
        </div>
        <div class="chartview">
            <div class="container">
                <div class="chartname">THERMISTOR FLOW</div>
                <div class="containerTherm">
                    <canvas id="thermistorflowChart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
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
    box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.5);
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
    .card2 {
        height: 100%;
        width: 100%;
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
