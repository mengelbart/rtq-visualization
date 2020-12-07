<template>
  <div class="main">
    <ExperimentFilter class="content" :experiments="experiments"/>
  </div>
</template>

<script>
import firestore from '@/db';
import Experiment from '@/experiment';
import ExperimentFilter from '@/components/ExperimentFilter.vue';

export default {
  name: 'Home',
  components: {
    ExperimentFilter,
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
            return new Experiment(d);
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
.content {
  grid-column-start: 1;
  grid-column-end: span 12;
}
</style>
