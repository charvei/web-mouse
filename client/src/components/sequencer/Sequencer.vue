<template>
    <div id="sequencer-container">
      <NoteContainer
        v-for="note in notes"
        :key="note"

        v-bind:pitch="note"
        v-bind:sequence="getRelevantNoteSequence(note)"

        @stepPainted="stepPainted"/>
    </div>
</template>

<script>
import NoteContainer from "./NoteContainer.vue"

export default {
  name: 'Sequencer',
  components: {
    NoteContainer
  },
  data() {
    return {
      notes: [
         "B", "A", "G", "F", "E", "D", "C"
      ]
    }
  },
  props: {
    sequence: Array
  },
  methods: {
      stepPainted: function(pitch, position) {
        console.log("emitting from sequencer, pos: " + position + ", pitch: " + pitch)
        this.$emit('stepPainted', pitch, position)
      },
      getRelevantNoteSequence: function(pitch) {
        let resultSequence = []
        this.sequence.forEach(note => {
          if (note.pitch === pitch) {
            resultSequence.push(note)
          }
        })
        return resultSequence
        
        
        // return this.sequence.map((note) => {
        //   if (note.pitch === pitch) {
        //     return note
        //   }
        // })
      }
  },
  mounted() {
    console.log("mounted sequencer")
    console.log(this.sequence)
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sequencer-container {
  display: flex;
  justify-content: center;
  flex-direction: column;


  background-color: #555555;
}

#note-container {
  display: flex;
  flex-direction: row;
  align-self: center;

  width: 80%;
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
  background-color: cadetblue;
  border-right: 1px white solid;
}

.step {
  padding: 0.5%;
  background-color: black;
  width: 100%;
  border-right: 1px white solid;
}
</style>
