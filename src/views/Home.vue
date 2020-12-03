<template>
  <div class="main">
    <nav class="main-nav">
      <ExperimentList :files="files"/>
    </nav>
    <ExperimentOverview v-if="view==='overview'" class="content" :experiments="experiments"/>
    <ExperimentDetail v-if="view==='detail'"/>
  </div>
</template>

<script>
import ExperimentList from '@/components/ExperimentList.vue';
import ExperimentOverview from '@/components/ExperimentOverview.vue';
import firestore from '@/db';
import Experiment from '@/experiment';
import ExperimentDetail from '@/components/ExperimentDetail.vue';

export default {
  name: 'Home',
  components: {
    ExperimentDetail,
    ExperimentList,
    ExperimentOverview,
  },
  data() {
    return {
      files: [],
      currentFile: '',
      experiments: [],
      view: 'overview',
    };
  },
  async mounted() {
    firestore.then((db) => {
      db.collection('experiments')
        .get()
        .then((querySnapshot) => {
          this.experiments = querySnapshot.docs.map((doc) => {
            const d = doc.data();
            return new Experiment({
              Handler: d.Handler,
              File: d.File,
              Bandwidth: d.Bandwidth,
              CongestionControl: d.CongestionControl,
              FeedbackFrequency: d.FeedbackFrequency,
              Version: d.Version,
              Data: d.Data,
            });
          });
          this.files = this.experiments.map((e) => e.file)
            .filter((v, i, a) => a.indexOf(v) === i);
        });
    });
  },
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
}
.main-nav {
  grid-column-start: 1;
  grid-column-end: span 2;
}
.content {
  grid-column-start: 3;
  grid-column-end: span 10;
}
</style>
