<template>
    <div id="sequencer-container">

      <PlaybackController />


      <div id="sequencer">
          
          <!-- top row -->
          <Tracker />

          <!-- 2nd & last'main' body row -->
          <div id="notes-section">
            <div id="note-column" class="sequence-table-main-left-col note-sequence-scroll-synced">
              <div id="note-container">
                <Note 
                  v-for="note in notes"
                  :key="note"
                  v-bind:pitch="note"
                  />
              </div>
            </div>
            <div id="step-column" class="sequence-table-main-right-col note-sequence-scroll-synced">
              <div id="measures-container" v-for="note in notes" :key="note">
                <Measure 
                    v-bind:measureIndex="0"
                    v-bind:beatsPerMeasure="4"
                    v-bind:pitch="note"
                    @stepPainted="stepPainted"
                  />
                  <Measure 
                    v-bind:measureIndex="1"
                    v-bind:beatsPerMeasure="4"
                    v-bind:pitch="note"
                    @stepPainted="stepPainted"
                  />
                  
              </div>
            </div>
          </div>
      </div> 
      
    </div>
</template>

<script>
import NoteSequence from "./NoteSequence.vue"
import PlaybackController from './PlaybackController.vue'
import Tracker from './tracker/Tracker.vue'

import Note from "./Note.vue"
import Measure from "./Measure.vue"

export default {
  name: 'Sequencer',
  components: {
    Note,
    NoteSequence,
    PlaybackController,
    Tracker,
    Measure,
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
    },
    synchScroll: function(selector) {
      let active = null

      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener("mouseenter", e  => {
          active = e.target
        })

        element.addEventListener("scroll", e => {
          if (e.target !== active) return

          document.querySelectorAll(selector).forEach(target => {
            if (active === target) return

            target.scrollTop = active.scrollTop
            target.scrollLeft = active.scrollLeft
          })
        })
      })
    }
  },
  mounted() {
    this.synchScroll(".note-sequence-scroll-synced")
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sequencer-container {
  display: flex;
  flex-direction: column;
  
  flex: 0 0 90%;

  background-color: #444444;

  padding-left: 0.5%;
  padding-bottom: 1%;
}

#sequencer {
  display: flex;
  flex-direction: column;

  flex: 0 0 90%;
}

#notes-section {
  display: flex;
  flex-direction: row;

  height: 70vh;

  background-color: black;

  flex: 1 1 95%;
}

#measures-container {
  height: 100%;

  display: flex;
  flex-direction: row;

}

#note-container {
  height: 100%;
  
  /* display: flex;
  flex-direction: column; */
}

.sequence-table-main-left-col {
  display: flex;
  flex-direction: column;

  flex: 0 0 5.75%;

  overflow-x: scroll;
  overflow-y: hidden;
}

.sequence-table-main-left-col::-webkit-scrollbar {
  /* display: none; */
  visibility:hidden;
}

.sequence-table-main-right-col {
  display: flex;
  flex-direction: column;

  flex: 0 0 94.25%;

  overflow-x: scroll;
  overflow-y: scroll;
  
}




</style>
