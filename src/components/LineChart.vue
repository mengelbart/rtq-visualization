<template>
  <div id="app">
    <GChart
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
      @ready="onChartReady"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import Experiment from '@/experiment';

export default {
  name: 'LineChart',
  components: {
    GChart,
  },
  props: {
    experiment: Experiment,
    metric: String,
  },
  data() {
    return {
      chartData: {},
    };
  },
  computed: {
    chartOptions() {
      return {
        legend: {
          position: 'bottom',
        },
        chartArea: {
          // left: 10,
          // right: 10,
          // top: 10,
          // bottom: 10,
        },
        vAxis: {
          // minValue: -1,
          // maxValue: 1,
        },
        title: `${this.experiment.file} ${this.experiment.bandwidth / 1000} kbps, cc: ${this.experiment.congestionControl} ${this.experiment.congestionControl !== 'none' ? this.experiment.feedbackFrequency : ''} ${this.experiment.congestionControl !== 'none' ? 'ms' : ''}`,
      };
    },
  },
  methods: {
    onChartReady() {
      fetch(this.experiment.data[`${this.metric}`])
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data;
        }, (error) => {
          console.log(error);
        });
    },
  },
  watch: {
    metric(newVal) {
      this.metric = newVal;
      fetch(this.experiment.data[`${this.metric}`])
        .then((response) => response.json())
        .then((data) => {
          this.chartData = data;
        }, (error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

</style>
