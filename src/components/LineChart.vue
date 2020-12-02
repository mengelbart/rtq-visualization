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
        title: `${this.experiment.file}-${this.experiment.bandwidth}-${this.experiment.congestionControl}-${this.experiment.feedbackFrequency}`,
      };
    },
  },
  methods: {
    onChartReady() {
      fetch(this.experiment.data[`${this.metric}.log`])
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
      fetch(this.experiment.data[`${this.metric}.log`])
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
