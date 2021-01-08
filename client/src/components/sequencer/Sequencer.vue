<template>
    <div id="sequencer-container">

      <PlaybackController />

      <div id="sequencer">
        <div id="tracker-container">
          <Tracker />
        </div>
        <div id="notes-container">
          <NoteSequence
            v-for="note in notes"
            :key="note"

            v-bind:pitch="note"

            @stepPainted="stepPainted"/>
        </div>
      </div>
      
    </div>
</template>

<script>
import NoteSequence from "./NoteSequence.vue"
import PlaybackController from './PlaybackController.vue'
import Tracker from './tracker/Tracker.vue'


export default {
  name: 'Sequencer',
  components: {
    NoteSequence,
    PlaybackController,
    Tracker
  },
  data() {
    return {
      notes: [
        "B5", "A5", "G5", "F5", "E5", "D5", "C5",
        "B4", "A4", "G4", "F4", "E4", "D4", "C4", 
        "B3", "A3", "G3", "F3", "E3", "D3", "C3", 
        "B2", "A2", "G2", "F2", "E2", "D2", "C2",
      ]
    }
  },
  props: {
  },
  methods: {
      stepPainted: function(pitch, position) {
        console.log("Sequencer emit: stepPainted, pos: " + position + ", pitch: " + pitch)
        this.$emit('stepPainted', pitch, position)
      }
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sequencer-container {
  display: flex;
  flex-direction: column;
  
  height: 80%;

  background-color: #444444;

  padding-left: 0.5%;
  padding-bottom: 1%;
}

#sequencer {
  display: flex;
  flex-direction: column;

  height: 95%;
  
  overflow-x: scroll;

}

#tracker-container {
  display: flex;
  flex-direction: column;

  /* overflow-y simply so that it is same size as notes-container */
  overflow-y: scroll;
  overflow-x: visible;
}

#notes-container {
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: visible;
  height: 100%;

}

</style>
