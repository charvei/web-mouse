<template>
    <div id="tracker">
        <div id="spacer-column" class="sequence-table-main-left-col note-sequence-scroll-synced">
            <div id="space">
            </div>
        </div>
        <div id="tracker-step-column" class="sequence-table-main-right-col note-sequence-scroll-synced">
            <div id="tracker-measures-container">
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
          transportPosition: null
      }
  },
  methods: {
    synchScroll: function(selector) {
      let active = null

      document.querySelectorAll(selector).forEach(element => {
        element.addEventListener("mouseenter", e  => {
          active = e.target
        })

        element.addEventListener("scroll", e => {
          if (e.target !== active) return

          document.querySelectorAll(selector).forEach(target => {
            if (active === target) return

            target.scrollTop = active.scrollTop
            target.scrollLeft = active.scrollLeft
          })
        })
      })
    }
  },
  mounted() {
    this.synchScroll(".note-sequence-scroll-synced")

    // Draw tracker
    // this.$store.state.tone.Transport.scheduleRepeat((time) => {
    //     this.$store.state.tone.Draw.schedule(() => {
    //         // save current play position into state
    //         console.log(this.$store.state.tone.Transport.position)
    //         this.transportPosition = this.$store.state.tone.Transport.position
    //     }, time)
    // },
    // "32n",  // repeat interval
    // "0m"    // when to start
    // )
  }
}
</script>

<style scoped>
    #tracker {
        display: flex;
        flex-direction: row;

        flex: 0 0 2.5%;

        background-color: black;
        border-right: 1px #666666 dashed;
        border-bottom: 1px #666666 solid;
    }

    #tracker-measures-container {
        height: 100%;

        display: flex;
        flex-direction: row;

    }

    #spacer-column {
    }

    .sequence-table-main-left-col {
        display: flex;
        flex-direction: column;

        flex: 0 0 5.75%;

        overflow-x: scroll;
        overflow-y: hidden;
    }

    .sequence-table-main-right-col {
        display: flex;
        flex-direction: column;

        flex: 0 0 94.25%;

        overflow: scroll;
    }

    #tracker *::-webkit-scrollbar {
        visibility: hidden;
        height: 0px;
    }

    /* #tracker {
        flex: 0 0 5%;

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
    } */

</style>
