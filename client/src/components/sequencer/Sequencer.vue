<template>
  <div class="padder">
    <div id="sequencer-container">
      
      <NoteContainer
        v-for="note in notes"
        :key="note"

        v-bind:pitch="note"

        @stepPainted="stepPainted"/>
    </div>
  </div>
</template>

<script>
import NoteContainer from "./NoteContainer.vue"

export default {
  name: 'Sequencer',
  components: {
    NoteContainer,
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
  justify-content: center;
  flex-direction: column;
  width: 100%;
  
  overflow-y: scroll;
  overflow-x: hidden;

  background-color: #333333;
}


.padder {
  display: flex;
  flex: 1 0 70%;
  height: 60%;

  background-color: #222;
  
  padding-bottom: 0.5%;
  padding-left: 0.5%;
  padding-right: 0.5%;

  /* border: 5px solid #911; */
  /* border-top: 1px solid #444444;
  margin-top: 1px; */
  
}

</style>
