<template>
  <div class="beat">
      <Step 
        v-for="index in stepsPerBeat"
        v-bind:key="index - 1"
        v-bind:stepIndex="index - 1"
        v-bind:parentBeat="beatValue"
        v-bind:pitch="pitch"
        @stepPainted="stepPainted"
      />
  </div>
</template>

<script>
import Step from "./Step.vue"

export default {
  name: 'Beat',
  components: {
      Step,
  },
  props: {
    stepsPerBeat: Number,
    parentMeasureIndex: Number,
    beatIndex: Number,
    pitch: String
  },
  methods: {
      stepPainted: function(step) {
          this.$emit('stepPainted', step)
      }
  },
  data() {
      return {
          beatValue: this.parentMeasureIndex + ":" + this.beatIndex
      }
  },
  mounted() {
  }
}
</script>

<style scoped>
    .beat {
        display: flex;
        flex-direction: row;

        width: 25%;
        border-right: 1px white solid;
        background-color: purple;
    }
</style>


