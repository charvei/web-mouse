<template>
    <div id="note-container">
        <div class="note" id="note1">note1</div>
        <div id="step-container">
            <div class=step id="step1" v-on:click="paintStep(0)">step1</div>
            <div class=step id="step2" v-on:click="paintStep(1)">step2</div>
            <div class=step id="step3" v-on:click="paintStep(2)">step3</div>
            <div class=step id="step4" v-on:click="paintStep(3)">step4</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Note',
  methods: {
      paintStep: function(position) {
        console.log("emitting from note container")
        this.$emit('stepPainted', position)
      }
  },
  mounted() {
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
