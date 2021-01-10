<template>
    <div class="step" v-on:click="paintStep">
        <div class="tracker-line" v-if="currentlyPlaying"/>

    </div>
</template>

<script>
export default {
  name: 'TrackerStep',
  props: {
      stepIndex: Number,
      parentBeat: String,
      sequence: Array,
      pitch: String
  },
  data() {
      return {
          stepValue: this.parentBeat + ":" + this.stepIndex,
          currentlyPlaying: false
      }
  },
  methods: {
      paintStep: function() {
          this.$emit('stepPainted', this.stepValue)
      },
      isStepPainted: function() {
        if ((this.$store.state.sequence).find(note => ((note.time === this.stepValue) && (note.pitch === this.pitch)))) {
            return true
        }
      },
  },
  mounted() {
    // Debugging:
    //   if (this.stepValue === "0:0:0"){
    //   }

    // if (this.$store.state.tone.Transport.position ===)

        // Draw tracker
    this.$store.state.tone.Transport.scheduleRepeat((time) => {
        this.$store.state.tone.Draw.schedule(() => {
            // save current play position into state
            if ("0:"+this.$store.state.tone.Transport.position.substring(2,5) === this.stepValue) {
                this.currentlyPlaying = true
            } else {
                this.currentlyPlaying = false
            }
            
        }, time)
    },
    "16n",  // repeat interval
    "0m"    // when to start
    )
      
      
  }
}
</script>

<style scoped>
    .step {
        

        display: flex;

        width: 100%;

        background-color: white;
        border-right: 1px #666666 dashed;
    }
    
    .tracker-line {
        width: 100%;
        background-color: red;
    }
</style>
