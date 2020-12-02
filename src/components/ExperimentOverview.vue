<template>
  <div class="overview">
    <select class="option" v-model="selectedMetric">
      <option disabled value="">Please select a metric to show</option>
      <option v-for="metric in metrics" :value="metric" :key="metric.text">
        {{ metric.text }}
      </option>
    </select>
    <div class="one">
      <h3>udp</h3>
      <component
        :is="selectedMetric.component"
        v-for="(u, index) in udp"
        :key="index"
        :experiment="u"
        :metric="selectedMetric.text"/>
    </div>
    <div class="two">
      <h3>datagram</h3>
      <component
        :is="selectedMetric.component"
        v-for="(d, index) in datagram"
        :key="index"
        :experiment="d"
        :metric="selectedMetric.text"/>
    </div>
    <div class="three">
      <h3>streamperframe</h3>
      <component
        :is="selectedMetric.component"
        v-for="(s, index) in streamPerFrame"
        :key="index"
        :experiment="s"
        :metric="selectedMetric.text"/>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';

export default {
  name: 'ExperimentOverview',
  components: { LineChart },
  props: {
    experiments: Array,
  },
  data() {
    return {
      metrics: [
        { text: 'ssim', component: 'LineChart' },
        { text: 'psnr', component: 'LineChart' },
      ],
      selectedMetric: {
        text: 'ssim',
        component: 'LineChart',
      },
    };
  },
  computed: {
    udp() {
      return this.experiments.filter((e) => e.handler === 'udp');
    },
    datagram() {
      return this.experiments.filter((e) => e.handler === 'datagram');
    },
    streamPerFrame() {
      return this.experiments.filter((e) => e.handler === 'streamperframe');
    },
  },
};
</script>

<style scoped>
.overview {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.option {
  grid-column: auto;
  grid-row: 1;
}
.one {
  grid-column: 1;
  grid-row: 2;
}
.two {
  grid-column: 2;
  grid-row: 2;
}
.three {
  grid-column: 3;
  grid-row: 2;
}
</style>
