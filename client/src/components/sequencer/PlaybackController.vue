<template>
    <div id="playback-controller-container">
        <div id="controls-container">
            <button id="play-button" class="control-button" v-on:click="play">Play</button>
            <button id="pause-button" class="control-button">Pause</button>
            <button id="stop-button" class="control-button" v-on:click="stop">Stop</button>
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
                this.part.add(note.time, note)
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

        Tone.Transport.bpm.value = 80
        Tone.Transport.start()
      },
      stop: function() {
        Tone.Transport.stop()
      },
  },
  mounted() {
      this.synth = new Tone.PolySynth(Tone.Synth).toDestination()

      this.part = new Tone.Part((time, value) => {
          this.synth.triggerAttackRelease(value.pitch, value.duration, time, 0.9) //note = ["note.time", [note.pitch]]
      }, []).start()

  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playback-controller-container {
    display: flex;  
    flex-direction: left;

    height: 2.5%;

    padding: 0.5% 0% 0.5% 0%;

    /* background-color: #EEE; */
    border-top: 1px solid #555555;
}

#controls-container {
    display: flex;
    flex-direction: center;
    justify-content: start;
}

.control-button {
    margin-right: 1%;

    border: 1px solid #333333;
}


</style>
