<template>
  <div class="detail">
    <LineChart class="ssim" :experiment="this.experiment" metric="SSIM"/>
    <LineChart class="psnr" :experiment="this.experiment" metric="PSNR"/>
    <LineChart class="scream-congestion" :experiment="this.experiment" metric="scream-congestion"/>
    <LineChart class="scream-bitrate" :experiment="this.experiment" metric="scream-bitrate"/>
    <LineChart class="scream-queue-length"
      :experiment="this.experiment"
      metric="scream-queue-length"/>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import Experiment from '@/experiment';

export default {
  name: 'ExperimentDetail',
  components: { LineChart },
  props: {
    experiment: Experiment,
  },
};
</script>

<style scoped>
.detail {
  display: grid;
}
.ssim {
  grid-column: 1;
}
.psnr {
  grid-column: 1;
}
.ssim-cdf {
  grid-column: 2;
}
.psnr-cdf {
  grid-column: 2;
}
</style>
