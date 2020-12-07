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
        :metric="selectedMetric.metric"/>
    </div>
    <div class="two">
      <h3>datagram</h3>
      <component
        :is="selectedMetric.component"
        v-for="(d, index) in datagram"
        :key="index"
        :experiment="d"
        :metric="selectedMetric.metric"/>
    </div>
    <div class="three">
      <h3>streamperframe</h3>
      <component
        :is="selectedMetric.component"
        v-for="(s, index) in streamPerFrame"
        :key="index"
        :experiment="s"
        :metric="selectedMetric.metric"/>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import CumulativeChart from '@/components/CumulativeChart.vue';

export default {
  name: 'ExperimentOverview',
  components: { LineChart, CumulativeChart },
  props: {
    experiments: Array,
  },
  data() {
    return {
      metrics: [
        { text: 'SSIM', metric: 'SSIM', component: 'LineChart' },
        { text: 'SSIM CDF', metric: 'SSIM', component: 'CumulativeChart' },
        { text: 'PSNR', metric: 'PSNR', component: 'LineChart' },
        { text: 'PSNR CDF', metric: 'PSNR', component: 'CumulativeChart' },
        { text: 'scream-bitrate', metric: 'scream-bitrate', component: 'LineChart' },
        { text: 'scream-congestion', metric: 'scream-congestion', component: 'LineChart' },
        { text: 'scream-queue-length', metric: 'scream-queue-length', component: 'LineChart' },
      ],
      selectedMetric: {
        text: 'SSIM',
        metric: 'SSIM',
        component: 'LineChart',
      },
    };
  },
  methods: {
    expSort(a, b) {
      return a.file.localeCompare(b.file)
        || a.congestionControl.localeCompare(b.congestionControl)
        || a.bandwidth - b.bandwidth
        || a.feedbackFrequency - b.feedbackFrequency
        || a.requestKeyframes - b.requestKeyframes
        || a.iperf - b.iperf;
    },
    metricFilter(exp, metric) {
      return exp.data[metric];
    },
  },
  computed: {
    udp() {
      return this.experiments.filter((e) => e.handler === 'udp'
        && this.metricFilter(e, this.selectedMetric.metric)).sort(this.expSort);
    },
    datagram() {
      return this.experiments.filter((e) => e.handler === 'datagram'
        && this.metricFilter(e, this.selectedMetric.metric)).sort(this.expSort);
    },
    streamPerFrame() {
      return this.experiments.filter((e) => e.handler === 'streamperframe'
        && this.metricFilter(e, this.selectedMetric.metric)).sort(this.expSort);
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
