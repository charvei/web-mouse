<template>
    <div id="note-container">
        <div class="note" id="note1">{{ this.pitch }}</div>
        <div id="step-container">
          <Measure 
            v-bind:measureIndex="0"
            v-bind:beatsPerMeasure="4"
            v-bind:pitch="pitch"
            @stepPainted="stepPainted"
          />
        </div>
    </div>
</template>

<script>
import Measure from "./Measure.vue"

export default {
  name: 'Note',
  components: {
    Measure
  },
  props: {
    pitch: String,
  },
  methods: {
      stepPainted: function(step) {
        this.$emit('stepPainted', this.pitch, step)
      }
  },
  mounted() {
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<style scoped>
#note-container {
  flex: 1 0 auto;

  display: flex;
  flex-direction: row;
  align-self: center;
  width: 100%;
  justify-content: start;
  border-top: 1px solid #444444;
  border-bottom: 1px solid #444444;
}

#step-container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.note {
    padding: 0.5%;
    width: 5%;
    text-align: center;
    background-color: cadetblue;
}
</style>
