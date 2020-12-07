<template>
  <div>
    <GChart
      type="LineChart"
      :data="chartData"
      :options="chartOptions"
      @ready="onChartReady"
      :events="chartEvents"
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
      chartEvents: {
        click: () => {
          this.$emit('click', this.experiment.id);
        },
      },
    };
  },
  computed: {
    chartOptions() {
      return {
        legend: {
          position: 'bottom',
        },
        vAxis: this.vAxis,
        title: this.experiment.title(),
        chartArea: {
          width: '80%',
        },
      };
    },
    vAxis() {
      switch (this.metric) {
        case 'SSIM':
          return {
            minValue: 0,
            maxValue: 1,
          };
        case 'PSNR':
          return {
            minValue: 0.6,
            maxValue: 1,
          };
        default:
          return {
            minValue: 0,
            maxValue: 1,
          };
      }
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
