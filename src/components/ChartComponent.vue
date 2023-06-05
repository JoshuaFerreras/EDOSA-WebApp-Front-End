<script setup lang="ts">
import Chart, { ChartConfiguration, ChartItem } from 'chart.js/auto';
import { onMounted } from 'vue';


const labels = [
    '1hr', '2hr', '3hr', '4hr', '5hr', '6hr', '7hr', '8hr',
];


///// CHART DATA /////
const heartratedata = {
    labels: labels,
    datasets: [{
        label: 'Heart Rate',
        backgroundColor: 'rgb(255, 0, 0)',
        borderColor: 'rgb(255, 0, 0)',
        data: [0, 10, 50, 20, 40, 30, 45, 50],
    },]
};

const oxygenleveldata = {
    labels: labels,
    datasets: [{
        label: 'Oxygen Level',
        backgroundColor: 'rgb(0, 255, 0)',
        borderColor: 'rgb(0, 255, 0)',
        data: [0, 15, 35, 25, 50, 40, 45, 30],
    },
    ]
};

const airflowdata = {
    labels: labels,
    datasets: [{
        label: 'AirFlow Level',
        backgroundColor: 'rgb(0, 0, 255)',
        borderColor: 'rgb(0, 0, 255)',
        data: [0, 20, 25, 30, 35, 50, 45, 40],
    }
    ]
};


const snoreleveldata = {
    labels: labels,
    datasets: [{
        label: 'Snore Level',
        backgroundColor: 'rgb(255, 165, 0)',
        borderColor: 'rgb(255, 165, 0)',
        data: [0, 10, 30, 10, 40, 20, 25, 50],
    },]
};

const ECGdata = {
    labels: labels,
    datasets: [{
        label: 'ECG',
        backgroundColor: 'rgb(255, 0, 255)',
        borderColor: 'rgb(255, 0, 255)',
        data: [0, 10, 40, 35, 20, 10, 45, 15],
    },]
};

const thermistorflowdata = {
    labels: labels,
    datasets: [{
        label: 'Thermistor Flow',
        backgroundColor: 'rgb(160, 32, 240)',
        borderColor: 'rgb(160, 32, 240)',
        data: [0, 50, 30, 45, 30, 25, 20, 10],
    },]
};

////// CHART CONFIGURATION /////
const heartconfig: ChartConfiguration = {
    type: 'line',
    data: heartratedata,
    options: {}
};

const oxygenconfig: ChartConfiguration = {
    type: 'line',
    data: oxygenleveldata,
    options: {}
};
const airconfig: ChartConfiguration = {
    type: 'line',
    data: airflowdata,
    options: {}
};
const snoreconfig: ChartConfiguration = {
    type: 'line',
    data: snoreleveldata,
    options: {}
};

const ECGconfig: ChartConfiguration = {
    type: 'line',
    data: ECGdata,
    options: {}
};

const thermistorconfig: ChartConfiguration = {
    type: 'line',
    data: thermistorflowdata,
    options: {}
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

    heartrateChart; oxygenlevelChart;
    airflowChart; snorelevelChart;
    ECGChart; thermistorflowChart;
})

</script>

<template>
    <h2>MY POST RESULT</h2>
    <div class="row">
        <div class="chartview">
            <canvas id="heartrateChart"></canvas>
        </div>
        <div class="chartview">
            <canvas id="oxygenlevelChart"></canvas>
        </div>
    </div>
    <div class="row">
        <div class="chartview">
            <canvas id="airflowChart"></canvas>
        </div>
        <div class="chartview">
            <canvas id="snorelevelChart"></canvas>
        </div>
    </div>
    <div class="row">
        <div class="chartview">
            <canvas id="ECGChart"></canvas>
        </div>
        <div class="chartview">
            <canvas id="thermistorflowChart"></canvas>
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
}

.chartview {
    height: 50%;
    width: 100%;
    background-color: whitesmoke;
    padding: 20px;
    border-radius: 40px;
    margin: 5px;
    margin-bottom: 20px;
    box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.5);
}
</style>