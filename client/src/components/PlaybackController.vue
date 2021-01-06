<template>
    <div id="playback-controller-container">
        <div id="controls-container">
            <button id="play-button" class="control-button" v-on:click="play">Play</button>
            <button id="pause-button" class="control-button">Pause</button>
            <button id="stop-button" class="control-button" v-on:click="stop">Stop</button>
        </div>
        <!-- <div id="seek-container">
            hello
        </div> -->
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
                console.log(note)
                this.part.at(note.time, note)
                //this.part.at(note.time, ["16n", ["C5", "E5"]])
                //this.part.at(note.time, {pitch: "C5", duration: "16n"} )
                //this.part.at(note.time, ["C5", "G5"])
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
        //this.part.start()

        Tone.Transport.bpm.value = 80
        Tone.Transport.start()
      },
      stop: function() {
          //this.part.stop()
          Tone.Transport.stop()
      },
  },
  mounted() {
      this.synth = new Tone.Synth().toDestination()

      this.part = new Tone.Part((time, value) => {
          console.log("trying to play a sound")
          this.synth.triggerAttackRelease(value.pitch, value.duration, time, 0.9)
          //this.synth.triggerAttackRelease(value, time, 0.9) //note = ["note.time", [note.pitch]]
      }, []).start()
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playback-controller-container {
    width: 100%;

    

    /* background-color: #EEE; */
    background-color: #222222;
    border-top: 1px solid #444444;
}

/* #controls {
    height: 100%;
} */

#controls-container {
    margin-left: 0.5%;
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: center;
    justify-content: start;
    /* border: 1px solid red; */
}

#seek-container {
    width: 100%;
    height: 50%;
}

.control-button {
    width: 20%;
    height: 50%;
    margin-right: 1%;
    margin-top: 5%;
    margin-bottom: 4%;

    border: 1px solid #222222;
}


</style>
