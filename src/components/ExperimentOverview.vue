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
        { text: 'SSIM', component: 'LineChart' },
        { text: 'PSNR', component: 'LineChart' },
        { text: 'scream-bitrate', component: 'LineChart' },
        { text: 'scream-congestion', component: 'LineChart' },
        { text: 'scream-queue-length', component: 'LineChart' },
      ],
      selectedMetric: {
        text: 'SSIM',
        component: 'LineChart',
      },
    };
  },
  methods: {
    expSort(a, b) {
      return a.congestionControl - b.congestionControl
        || a.bandwidth - b.bandwidth
        || a.feedbackFrequency - b.feedbackFrequency;
    },
  },
  computed: {
    udp() {
      return this.experiments.filter((e) => e.handler === 'udp').sort(this.expSort);
    },
    datagram() {
      return this.experiments.filter((e) => e.handler === 'datagram').sort(this.expSort);
    },
    streamPerFrame() {
      return this.experiments.filter((e) => e.handler === 'streamperframe').sort(this.expSort);
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
