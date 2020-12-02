<template>
  <div class="main">
    <nav class="main-nav">
      <ExperimentList :files="files"/>
    </nav>
    <ExperimentOverview class="content" :experiments="experiments"/>
  </div>
</template>

<script>
import ExperimentList from '@/components/ExperimentList.vue';
import ExperimentOverview from '@/components/ExperimentOverview.vue';
import db from '@/db';
import Experiment from '@/experiment';

export default {
  name: 'Home',
  components: {
    ExperimentList,
    ExperimentOverview,
  },
  data() {
    return {
      files: [],
      currentFile: '',
      experiments: [],
    };
  },
  mounted() {
    db.collection('experiments')
      .get()
      .then((querySnapshot) => {
        this.experiments = querySnapshot.docs.map((doc) => {
          const d = doc.data();
          return new Experiment({
            Handler: d.Handler,
            File: d.File,
            Data: d.Data,
          });
        });
        this.files = this.experiments.map((e) => e.file).filter((v, i, a) => a.indexOf(v) === i);
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
