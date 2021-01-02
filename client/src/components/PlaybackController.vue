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
import Beep from "../assets/square.wav"
import A from "../assets/sine/a.wav"
import B from "../assets/sine/b.wav"
import C from "../assets/sine/midc.wav"
import D from "../assets/sine/d.wav"
import E from "../assets/sine/e.wav"
import F from "../assets/sine/f.wav"
import G from "../assets/sine/g.wav"


export default {
  name: 'PlaybackController',
  data() {
      return {
          start: 0,
          end: 3,
          playInterval: null,
          beep: new Audio(Beep),
          c_sine: new Audio(C),
          e_sine: new Audio(E),
          g_sine: new Audio(G),

      }
  },
  props: {
      sequence: Array
  },
  methods: {
      play: function() {
          console.log("play!")
          let position = this.start
          //let notes = this.sequence
          this.playInterval = setInterval(() => {
              console.log("bar position: "+ position)
              this.sequence.forEach((note) => {
                if (note.start === position) {
                    console.log("play note @ position:" + note.start)
                    if (note.pitch === "C") {
                        this.c_sine.play()
                    } else if (note.pitch === "E") {
                        this.e_sine.play()
                    } else if (note.pitch === "G") {
                        this.g_sine.play()
                    }
                }
              })
              position < this.end ? position++ : position = 0
          }, 500);
      },
      stop: function() {
          clearInterval(this.playInterval)
      },
      playNote: function(pitch, duration) {
          switch(pitch) {
            case A:
                
                break
            case B:
                break
            case C:
                break
            case D:
                break
            case E:
                break
            case F:
                break
            case G:
                break
          }

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
