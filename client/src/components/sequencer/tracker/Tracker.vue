<template>
    <div id="tracker">
        <div class="note-area"></div>
        <div id="step-container">
            <TrackerMeasure 
                v-bind:measureIndex="0"
                v-bind:beatsPerMeasure="4"
            />
            <TrackerMeasure 
                v-bind:measureIndex="1"
                v-bind:beatsPerMeasure="4"
            />
        </div>
    </div>
</template>

<script>
import TrackerMeasure from './TrackerMeasure'

export default {
  name: 'Tracker',
  components: {
      TrackerMeasure
  },
  props: {
      
  },
  data() {
      return {
          
      }
  },
  methods: {
  },
  mounted() {    
  }
}
</script>

<style scoped>
    #tracker {
        flex: 1 0 auto;

        height: 2.5%;

        display: flex;
        flex-direction: row;
        align-self: center;
        width: 100%;
        justify-content: start;

        overflow-y: hidden;
        border-bottom: 1px solid white;
        border-left: 1px solid #555555;
    }

    .note-area {
        padding: 0.5%;
        height: 100%;
        width: 5%;
        text-align: center;
        background-color: #050505;

        border-right: 1px solid white;
    }

    #step-container {
        display: flex;
        flex-direction: row;
    }

</style>
