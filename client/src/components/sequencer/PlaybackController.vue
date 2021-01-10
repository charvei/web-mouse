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
        this.$store.state.tone.start()
            
        this.part.loop = true
        this.part.loopEnd = '1m'

        this.$store.state.tone.Transport.bpm.value = 80
        this.$store.state.tone.Transport.start()
      },
      stop: function() {
        this.$store.state.tone.Transport.stop()
      },
  },
  mounted() {
        //this.synth = new Tone.PolySynth(Tone.Synth).toDestination()
        this.synth = new this.$store.state.tone.PolySynth(this.$store.state.tone.Synth).toDestination()

        this.part = new this.$store.state.tone.Part((time, value) => {
            this.synth.triggerAttackRelease(value.pitch, value.duration, time, 0.9) //note = ["note.time", [note.pitch]]
        }, []).start()

        // // Draw tracker
        // this.$store.state.tone.Transport.scheduleRepeat((time) => {
        //     this.$store.state.tone.Draw.schedule(() => {
        //         // save current play position into state
        //         console.log(this.$store.state.tone.Transport.position)
                
        //     }, time)
        // },
        // "32n",  // repeat interval
        // "0m"    // when to start
        // )
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playback-controller-container {
    display: flex;  
    flex-direction: left;

    flex: 0 0 3%;

    padding: 0.25% 0% 0.5% 0%;

    /* background-color: #EEE; */
    border-top: 1px solid #555555;
}

#controls-container {
    display: flex;
    justify-content: start;
    width: 100%;
}

.control-button {
    flex: 0 0 5.75%;

}


</style>
