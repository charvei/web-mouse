<template>
    <div id="note-sequence">
        <div class="note" id="note1">{{ this.pitch }}</div>
        <div id="step-container">
          <Measure 
            v-bind:measureIndex="0"
            v-bind:beatsPerMeasure="4"
            v-bind:pitch="pitch"
            @stepPainted="stepPainted"
          />
          <Measure 
            v-bind:measureIndex="1"
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
  name: 'NoteSequence',
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
#note-sequence {
  display: flex;
  flex-direction: row;
  align-self: left;
  border-top: 1px solid #555555;
  border-bottom: 1px solid #555555;
  border-left: 1px solid #555555;
}

#step-container {
  display: flex;
  flex-direction: row;
}

.note {
    padding: 0.5%;
    width: 100px;
    text-align: center;
    background-color: #050533;
    border-right: 1px solid white;
}
</style>
