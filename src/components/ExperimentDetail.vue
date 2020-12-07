<template>
  <div>
    <div class="detail" v-if="exists">
      <div class="meta">
        <pre>{{this.experiment | pretty}}</pre>
      </div>
      <LineChart class="ssim" :experiment="this.experiment" metric="SSIM"/>
      <CumulativeChart class="ssim-cdf" :experiment="this.experiment" metric="SSIM"/>
      <LineChart class="psnr" :experiment="this.experiment" metric="PSNR"/>
      <CumulativeChart class="psnr-cdf" :experiment="this.experiment" metric="PSNR"/>
      <LineChart class="scream-congestion"
                 v-if="this.experiment.congestionControl === 'scream'"
                 :experiment="this.experiment"
                 metric="scream-congestion"/>
      <LineChart class="scream-bitrate"
                 v-if="this.experiment.congestionControl === 'scream'"
                 :experiment="this.experiment"
                 metric="scream-bitrate"/>
      <LineChart class="scream-queue-length"
                 v-if="this.experiment.congestionControl === 'scream'"
                 :experiment="this.experiment"
                 metric="scream-queue-length"/>
    </div>
    <div v-else>Experiment not found</div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import Experiment from '@/experiment';
import firestore from '@/db';
import CumulativeChart from '@/components/CumulativeChart.vue';

export default {
  name: 'ExperimentDetail',
  components: { CumulativeChart, LineChart },
  props: {
    id: String,
  },
  data() {
    return {
      exists: false,
      experiment: [],
    };
  },
  async mounted() {
    firestore.then((db) => {
      db.collection('experiments')
        .doc(this.id)
        .get()
        .then((doc) => {
          this.exists = doc.exists;
          if (doc.exists) {
            this.experiment = new Experiment(doc.id, doc.data());
          }
        });
    });
  },
  filters: {
    pretty(value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>

<style scoped>
.detail {
  display: grid;
  grid-template-columns: 50% 50%;
}
.meta {
  text-align: left;
  grid-row: 1;
  grid-column: auto;
}
.ssim {
  grid-row: 2;
  grid-column: 1;
}
.ssim-cdf {
  grid-row: 2;
  grid-column: 2;
}
.psnr {
  grid-row: 3;
  grid-column: 1;
}
.psnr-cdf {
  grid-row: 3;
  grid-column: 2;
}
.scream-congestion {
  grid-row: 4;
  grid-column: 1;
}
.scream-bitrate {
  grid-row: 4;
  grid-column: 2;
}
.scream-queue-length {
  grid-row: 5;
  grid-column: span 2;
}
</style>
