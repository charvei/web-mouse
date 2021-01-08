<template>
  <div id="tracker-measure">
      <TrackerBeat
          v-for="index in beatsPerMeasure"
          v-bind:key="index - 1"
          v-bind:beatIndex="index - 1"
          v-bind:stepsPerBeat="4"
          v-bind:parentMeasureIndex="measureIndex"
      />
  </div>
</template>

<script>
import TrackerBeat from "./TrackerBeat.vue"

export default {
  name: 'TrackerMeasure',
  components: {
      TrackerBeat,
  },
  props: {
    measureIndex: Number,
    beatsPerMeasure: Number,
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #tracker-measure {
        display: flex;
        flex-direction: row; 

        width: 90vw;
        /* background-color: pink; */
    }


</style>
