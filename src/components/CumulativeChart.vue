<template>
  <div>
    <LineChart
      class="container"
      v-if="loaded"
      :chartdata="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import Experiment from '@/experiment';
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'CumulativeChart',
  components: {
    LineChart,
  },
  props: {
    experiment: Experiment,
    metric: String,
  },
  data: () => ({
    loaded: false,
    chartData: null,
    options: {
      title: {
        display: true,
      },
      events: ['click'],
      animation: {
        duration: 0,
      },
      scales: {
        yAxes: [{
          id: '1',
          type: 'linear',
        }],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    click() {
      this.$emit('click', this.experiment.firebaseID);
    },
    arrayShareBelowPivot(a, pivot) {
      return a.filter((x) => (x <= pivot)).length / a.length;
    },
    async update() {
      this.loaded = false;
      try {
        const { cols, rows } = await fetch(this.experiment.data[`${this.metric}`])
          .then((response) => response.json());

        const dataArr = rows;
        const d = [];

        dataArr.forEach((x) => d.push(1 * x.c[1].v));
        d.sort((a, b) => a - b);

        const min = d[0];
        const max = d[d.length - 1];
        const resolution = d.length;

        const stepSize = (max - min) / resolution;

        const res = [];

        for (let i = 0; i <= resolution; i += 1) {
          res.push([min + i * stepSize, this.arrayShareBelowPivot(d, min + i * stepSize)]);
        }

        this.chartData = {
          labels: res.map((r) => r[0].toFixed(2)),
          datasets: [{
            pointRadius: 0.2,
            borderColor: 'blue',
            borderWidth: 1,
            fill: false,
            label: cols[1].label,
            data: res.map((r) => r[1]),
            yAxisID: '1',
          }],
        };
        this.options.title.text = this.experiment.title();
        this.options.onClick = this.click;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
  },
  async mounted() {
    await this.update();
  },
  watch: {
    async metric() {
      await this.update();
    },
    async experiment() {
      await this.update();
    },
  },
};
</script>

<style scoped>

</style>
