<template>
  <div>
    <p>Experiments</p>
    <a v-for="(f, index) in files" :key="index" href="#">{{ f }}</a>
  </div>
</template>

<script>
export default {
  name: 'ExperimentList',
  props: {
    files: Array,
  },
};
</script>
