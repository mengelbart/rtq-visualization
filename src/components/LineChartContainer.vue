<template>
  <div>
    <line-chart
      class="container"
      v-if="loaded"
      :chartdata="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import Experiment from '@/experiment';

const lineColors = [
  'blue',
  'red',
  'green',
];

export default {
  name: 'LineChartContainer',
  components: { LineChart },
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
  methods: {
    click() {
      this.$emit('click', this.experiment.id);
    },
    async update() {
      this.loaded = false;
      try {
        const { cols, rows } = await fetch(this.experiment.data[`${this.metric}`])
          .then((response) => response.json());
        this.chartData = {
          labels: rows.map((r) => r.c[0].v),
          datasets: [],
        };
        for (let i = 1; i < rows[0].c.length; i += 1) {
          this.chartData.datasets.push({
            pointRadius: 0.2,
            borderColor: lineColors[i - 1],
            borderWidth: 1,
            fill: false,
            label: cols[i].label,
            data: rows.map((r) => r.c[i].v),
            yAxisID: '1',
          });
        }
        this.options.title.text = this.experiment.title();
        this.options.scales.yAxes[0].ticks = this.ticks(this.metric);
        this.options.onClick = this.click;
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
    ticks(metric) {
      switch (metric) {
        case 'SSIM':
          return {
            min: 0.4,
            max: 1,
          };
        case 'PSNR':
          return {
            min: 0.6,
            max: 1,
          };
        default:
          return {};
      }
    },
  },
};
</script>

<style>
.container {
  height: 40vh;
}
</style>
