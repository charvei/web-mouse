<template>
    <div id="note-container">
        <div class="note" id="note1">{{ this.pitch }}</div>
        <div id="step-container">
            <div class=step id="step1" v-on:click="paintStep(0)">
              <div v-if="isStepPainted(0)">selected</div>
            </div>
            <div class=step id="step2" v-on:click="paintStep(1)">
              <div v-if="isStepPainted(1)">selected</div>
            </div>
            <div class=step id="step3" v-on:click="paintStep(2)">
              <div v-if="isStepPainted(2)">selected</div>
            </div>
            <div class=step id="step4" v-on:click="paintStep(3)">
              <div v-if="isStepPainted(3)">selected</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    pitch: String,
    sequence: Array
  },
  methods: {
      paintStep: function(position) {
        console.log("emitting from note container")
        this.$emit('stepPainted', this.pitch, position)
      },
      isStepPainted: function(stepPosition) {
        if (this.sequence.find(note => note.start === stepPosition)) {
          return true
        }
      }
  },
  mounted() {
    console.log("this is my props key: " + this.pitch)
    console.log("this is my sequence: ")
    console.log(this.sequence)
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  width: 2%;
  text-align: center;
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
