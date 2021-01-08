<template>
    <div class="step" v-on:click="paintStep">
        <div class="paint" v-if="isStepPainted()"/>
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
          stepValue: this.parentBeat + ":" + this.stepIndex
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
      }
  },
  mounted() {
    // Debugging:
    //   if (this.stepValue === "0:0:0"){
    //   }
      
      
  }
}
</script>

<style scoped>
    .step {
        padding: 0.5%;
        background-color: #050505;

        display: flex;

        width: 100%;
        padding: 1%;
        border-right: 1px #666666 dashed;
    }
    
    .paint {
        width: 100%;
        background-color: #1111DD;
    }
</style>
