<template>
    <div id="playback-controller-container">
        <div id="controls-container">
            <button id="play-button" class="control-button" v-on:click="play">Play</button>
            <button id="pause-button" class="control-button">Pause</button>
            <button id="stop-button" class="control-button" v-on:click="stop">Stop</button>
        </div>
        <div id="seek-container">
            hello
        </div>
    </div>
</template>

<script>
import * as Tone from "tone"

export default {
  name: 'PlaybackController',
  data() {
      return {
          start: 0,
          end: 3,
          playInterval: null,
        //   synth: null,
          part: null,
      }
  },
  data() {
      return {
          sequence: this.$store.state.sequence,
          sampleNotes: [
            { time: "1:0:0", pitch: "A2", duration: "16n" },
            { time: "1:0:2", pitch: "A2", duration: "16n" },
            { time: "1:1:0", pitch: "B2", duration: "16n" },
            { time: "1:1:2", pitch: "B2", duration: "16n" },
            { time: "1:2:0", pitch: "C2", duration: "16n" },
            { time: "1:2:2", pitch: "C2", duration: "16n" },
            { time: "1:3:0", pitch: "D2", duration: "16n" },
            { time: "1:3:2", pitch: "D2", duration: "16n" },
        ]
      }
  },
  props: {
  },
  watch: {
      '$store.state.sequence': {
          immediate: true,
          handler(newSequence, oldSequence) {
            this.part.clear()
            newSequence.forEach(note => {
                this.part.at(note.time, note)
            })
          }
      }
  },
  methods: {
      play: function() {
        console.log("play button hit")
        Tone.start()
            
        this.part.loop = true
        this.part.loopEnd = '1m'
        this.part.start()

        Tone.Transport.bpm.value = 120
        Tone.Transport.start()
      },
      stop: function() {
          this.part.stop()
          Tone.Transport.stop()
      },
  },
  created() {
      this.synth = new Tone.Synth().toDestination()

      this.part = new Tone.Part((time, value) => {
          console.log("trying to play a sound")
          this.synth.triggerAttackRelease(value.pitch, value.duration, time, 0.9)
      }, [])
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playback-controller-container {
    width: 100%;

    flex: 1 0 5%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #ddd;
}

/* #controls {
    height: 100%;
} */

#controls-container {
    width: 15%;
    display: flex;
    flex-direction: center;
    justify-content: start;
    border-bottom: 1px solid black;
}

#seek-container {
    width: 100%;
    height: 50%;
}

.control-button {
    margin-right: 2.5%;
}


</style>
