<template>
  <div class="measure">
      <Beat 
          v-for="index in beatsPerMeasure"
          v-bind:key="index - 1"
          v-bind:beatIndex="index - 1"
          v-bind:stepsPerBeat="4"
          v-bind:parentMeasureIndex="measureIndex"
          v-bind:pitch="pitch"
          @stepPainted="stepPainted"
      />
  </div>
</template>

<script>
import Beat from "./Beat.vue"

export default {
  name: 'Measure',
  components: {
      Beat,
  },
  props: {
    measureIndex: Number,
    beatsPerMeasure: Number,
    pitch: String,
  },
  methods: {
      stepPainted: function(step) {
          this.$emit("stepPainted", this.pitch, step)
      }
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .measure {
        display: flex;
        flex-direction: row;

        flex: 0 0 90vw;

        height: 4vh;

        background-color: pink;
    }


</style>
