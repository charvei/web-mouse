<template>
  <div id="app" v-on:mousemove="updateMyMouseCoordinates" >
    <div id="content-container">
      <div id="top-nav">
        <h1 id="title">S e q u e n c . e r</h1>
      </div>
      <!-- <h1>S e q u e n c e . w i t   h . F r i e n d s</h1> -->
      <PlaybackController />
      <Sequencer @stepPainted="stepPainted"/> 
      <div id="footer"></div>
    </div>
    <Canvas msg="Canvas" />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'
import Sequencer from './components/sequencer/Sequencer.vue'
import PlaybackController from './components/PlaybackController.vue'

export default {
  name: 'App',
  components: {
    Canvas,
    PlaybackController,
    Sequencer
  },
  data() {
    return {
      mouse: {
        x: 0,
        y: 0,
      },
    }
  },
  methods: {
    updateMyMouseCoordinates: function(event) {
      this.mouse.x = event.clientX / window.innerWidth
      this.mouse.y = event.clientY / window.innerHeight
    },
    startEmittingMyMouseCoordinates: function() {
      setInterval(() => {
        this.$store.state.socket.emit("clientMouseCoords", this.$store.state.clientId, this.mouse)
      }, 10);
    },
    stepPainted: function(pitch, position) {
      console.log("received step painted at app, for position " + position + ", pitch => " + pitch)
      this.$store.state.socket.emit("stepPainted", pitch, position)
    }
    
  },
  mounted() {
    this.startEmittingMyMouseCoordinates()
  }
}
</script>

<style>
#app {
  font-family:  'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif, Helvetica, Arial, Avenir, sans-serif, 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #F0F0F0;
  background-color: #bbbbbbbb;

  display: flex;

  margin: 0px;
  height: 100%;
  width: 100%;
}

#content-container {
    position: fixed;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    display:flex;
    flex-direction: column;
    justify-content: start;

    background-color: #101010;
}

#top-nav {
  display: flex;
  width: 100%;

  flex: 1 0 10%;
}

#title {
  margin-left: 2.5%;
  align-self: center;
}

#footer {
  height: 10%;
  flex: 1 0 10%;
}


html, body {
  margin: 0px;
  height: 100%;
}

h1 {
  margin: 0;
}
</style>
