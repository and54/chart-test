<template>
  <div id="app">
    <round-graph 
      :due-value="20.50" 
      :new-value="60.10" 
      :show-values="true" 
      due-title="Due (01/10/2021)"
      new-title="Total Balance"
    />
    <e-g-charts :dataSource="dataSource" />
    <button @click="changeBg('/assets/water2.jpg')">water</button>
    <button @click="changeBg('/assets/money1.jpg')">money</button>
  </div>
</template>

<script>
import RoundGraph from './components/RoundGraph.vue';
import EGCharts from './components/Charts';

const chartData = [
  {
    label: "Venezuela",
    value: "290",
  },
  {
    label: "Saudi",
    value: "260",
  },
  {
    label: "Canada",
    value: "180",
  },
  {
    label: "Iran",
    value: "140",
  },
  {
    label: "Russia",
    value: "115",
  },
  {
    label: "UAE",
    value: "100",
  },
  {
    label: "US",
    value: "30",
  },
  {
    label: "China",
    value: "30",
  },
];
const dataSource = {
  chart: {
    caption: "Countries With Most Oil Reserves [2017-18]",
    subcaption: "In MMbbl = One Million barrels",
    xaxisname: "Country",
    yaxisname: "Reserves (MMbbl)",
    numbersuffix: "K",
    theme: "fusion",
    bgImage: '/assets/water1.jpg'
  },
  data: chartData,
};

export default {
  name: 'App',
  components: {
    RoundGraph,
    EGCharts
  },
  data: () => ({
    dataSource,
  }),
  methods: {
    changeBg(img) {
      this.dataSource.chart.bgImage = img;
      this.dataSource = { ...this.dataSource };
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
