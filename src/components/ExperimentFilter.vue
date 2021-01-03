<template>
  <div>
    <select class="option" v-model="selectedCommit">
      <option disabled value=""></option>
      <option v-for="commit in commits" :value="commit" :key="commit">
        {{ commit }}
      </option>
    </select>
    <div class="main">
      <fieldset class="filter">
        <legend>Video Files</legend>
        <div
          v-for="(f, i) in files"
          :key="i">
          <input
            type="checkbox"
            :id="'f'+i"
            :value="f"
            v-model="selectedFiles">
          <label :for="'f'+i">{{ f }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Transport</legend>
        <div
          v-for="(h, i) in handlers"
          :key="i">
          <input
            type="checkbox"
            :id="'h'+i"
            :value="h"
            v-model="selectedHandlers">
          <label :for="'h'+i">{{ h }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Bandwidth Limit</legend>
        <div
          v-for="(b, i) in bandwidths"
          :key="i">
          <input
            type="checkbox"
            :id="'b'+i"
            :value="b"
            v-model="selectedBandwidths">
          <label :for="'b'+i">{{ b === 0 ? 'no limit' : `${b / 1000} kbps` }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Congestion Control</legend>
        <div
          v-for="(c, i) in congestionControls"
          :key="i">
          <input
            type="checkbox"
            :id="'c'+i"
            :value="c"
            v-model="selectedCongestionControls">
          <label :for="'c'+i">{{ c }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Scream Feedback Frequency</legend>
        <div
          v-for="(f, i) in feedbackFrequencies"
          :key="i">
          <input
            type="checkbox"
            :id="'ff'+i"
            :value="f"
            v-model="selectedFeedbackFrequencies">
          <label :for="'ff'+i">{{ f === 0 ? '' : `${f / 1000000}ms` }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Additional Keyframes (SCReAM)</legend>
        <div
          v-for="(r, i) in requestKeyframes"
          :key="i">
          <input
            type="checkbox"
            :id="'r'+i"
            :value="r"
            v-model="selectedRequestKeyframes">
          <label :for="'r'+i">{{ r ? 'keyframe requests' : 'no keyframe requests' }}</label>
        </div>
      </fieldset>
      <fieldset class="filter">
        <legend>Parallel stream 15s-30s</legend>
        <div
          v-for="(ip, i) in iperf"
          :key="ip">
          <input
            type="checkbox"
            :id="'ip'+i"
            :value="ip"
            v-model="selectedIperf">
          <label :for="'ip'+i">
            {{ ip ? 'additional iperf stream' : 'no additional iperf stream' }}
          </label>
        </div>
      </fieldset>
      <div class="total">
        selected: {{ selectedExperiments.length }}
      </div>
      <ExperimentOverview class="content" :experiments="selectedExperiments" @click="details"/>
    </div>
  </div>
</template>

<script>
import ExperimentOverview from '@/components/ExperimentOverview.vue';
import firestore from '@/db';
import Experiment from '@/experiment';

export default {
  name: 'ExperimentFilter',
  components: { ExperimentOverview },
  data() {
    return {
      selectedHandlers: [],
      selectedFiles: [],
      selectedCongestionControls: [],
      selectedBandwidths: [],
      selectedFeedbackFrequencies: [],
      selectedRequestKeyframes: [],
      selectedIperf: [],
      experiments: [],

      commits: [],
      selectedCommit: null,
    };
  },
  computed: {
    files() {
      return this.experiments.map((e) => e.file)
        .sort((a, b) => a.localeCompare(b))
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    handlers() {
      return this.experiments.map((e) => e.handler)
        .sort((a, b) => a.localeCompare(b))
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    bandwidths() {
      return this.experiments
        .map((e) => e.bandwidth)
        .sort((a, b) => a - b)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    congestionControls() {
      return this.experiments.map((e) => e.congestionControl)
        .sort((a, b) => a.localeCompare(b))
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    feedbackFrequencies() {
      return this.experiments
        .map((e) => e.feedbackFrequency)
        .sort((a, b) => a - b)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    requestKeyframes() {
      return this.experiments
        .map((e) => e.requestKeyframes)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    iperf() {
      return this.experiments
        .map((e) => e.iperf)
        .filter((v, i, a) => a.indexOf(v) === i);
    },
    selectedExperiments() {
      return this.experiments.filter((v) => this.selectedFiles.includes(v.file)
          && this.selectedHandlers.includes(v.handler)
          && this.selectedBandwidths.includes(v.bandwidth)
          && this.selectedCongestionControls.includes(v.congestionControl)
          && this.selectedFeedbackFrequencies.includes(v.feedbackFrequency)
          && this.selectedRequestKeyframes.includes(v.requestKeyframes)
          && this.selectedIperf.includes(v.iperf));
    },
  },
  watch: {
    selectedCommit() {
      firestore.then((db) => {
        db.collection(`experiments/${this.selectedCommit}/runs`)
          .get()
          .then((querySnapshot) => {
            this.experiments = querySnapshot.docs.map((doc) => {
              const d = doc.data();
              return new Experiment(doc.id, d);
            });
          });
      });
    },
    experiments() {
      this.selectedHandlers = [];
      this.selectedHandlers = this.handlers;
      this.selectedFiles = [];
      this.selectedFiles.push(this.files[0]);
      this.selectedBandwidths = [];
      this.selectedBandwidths.push(this.bandwidths[0]);
      this.selectedCongestionControls = [];
      this.selectedCongestionControls.push(this.congestionControls[0]);
      this.selectedFeedbackFrequencies = [];
      this.selectedFeedbackFrequencies.push(this.feedbackFrequencies[0]);
      this.selectedRequestKeyframes = [];
      this.selectedRequestKeyframes.push(false);
      this.selectedIperf = [];
      this.selectedIperf.push(false);
    },
  },
  async mounted() {
    firestore.then((db) => {
      db.collection('experiments/')
        .get()
        .then((qs) => {
          this.commits = qs.docs.map((d) => {
            const { Commit } = d.data();
            return Commit;
          });
        });
    });
  },
  methods: {
    details(id) {
      const routeData = this.$router.resolve(`/${this.selectedCommit}/${id}`);
      window.open(routeData.href, '_blank');
    },
  },
};
</script>

<style scoped>
.main {
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
}
.filter {
  grid-column: span 3;
}
.content {
  grid-column-start: 1;
  grid-column-end: span 12;
}
</style>
