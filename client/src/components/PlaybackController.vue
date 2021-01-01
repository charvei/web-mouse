<template>
    <div id="playback-controller-container">
        <div id="controls">
            <button id="play-button" v-on:click="play">play</button>
            <button id="pause-button">pause</button>
            <button id="stop-button" v-on:click="stop">stop</button>
        </div>
    </div>
</template>

<script>
import Beep from "../assets/beep.mp3"

export default {
  name: 'PlaybackController',
  data() {
      return {
          start: 0,
          end: 3,
          playInterval: null,
          beep: new Audio(Beep)
      }
  },
  props: {
      sequence: Object
  },
  methods: {
      play: function() {
          console.log("play!")
          let position = this.start
          let notes = this.sequence.notes
          this.playInterval = setInterval(() => {
              console.log("bar position: "+ position)
              notes.forEach((note) => {
                if (note.start === position) {
                    console.log("play note @ position:" + note.start)
                    this.beep.play()
                }
              })
              position < this.end ? position++ : position = 0
          }, 1000);
      },
      stop: function() {
          clearInterval(this.playInterval)
      }
  },
  mounted() {
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playback-controller-container {
    display: flex;
}


</style>
