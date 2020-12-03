<template>
  <div>
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
  name: 'CumulativeChart',
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
        title: `${this.experiment.file} ${this.experiment.bandwidth / 1000} kbps, cc: ${this.experiment.congestionControl} ${this.experiment.congestionControl !== 'none' ? this.experiment.feedbackFrequency : ''} ${this.experiment.congestionControl !== 'none' ? 'ms' : ''}`,
      };
    },
  },
  methods: {
    updateData(data) {
      function arrayShareBelowPivot(a, pivot) {
        return a.filter((x) => (x <= pivot)).length / a.length;
      }

      const dataArr = data.rows;
      const d = [];

      dataArr.forEach((x) => d.push(1 * x.c[1].v));
      d.sort((a, b) => a - b);

      const min = d[0];
      const max = d[d.length - 1];
      const resolution = d.length;

      const stepSize = (max - min) / resolution;

      const res = [];

      for (let i = 0; i <= resolution; i += 1) {
        res.push([min + i * stepSize, arrayShareBelowPivot(d, min + i * stepSize)]);
      }

      this.chartData = [['x', 'y']].concat(res);
    },
    onChartReady() {
      fetch(this.experiment.data[`${this.metric}`])
        .then((response) => response.json())
        .then(this.updateData, (error) => {
          console.log(error);
        });
    },
  },
  watch: {
    metric(newVal) {
      this.metric = newVal;
      fetch(this.experiment.data[`${this.metric}`])
        .then((response) => response.json())
        .then(this.updateData, (error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>

</style>
