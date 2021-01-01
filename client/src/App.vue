<template>
  <div id="app" v-on:mousemove="updateMyMouseCoordinates" >
    <div id="content-container">
      <div id="top-nav">
        <h1 id="title">S e q u e n c . e r</h1>
      </div>
      <!-- <h1>S e q u e n c e . w i t   h . F r i e n d s</h1> -->
      <PlaybackController v-bind:sequence="sequence"/>
      <Sequencer @stepPainted="stepPainted"/> 
    </div>
    <Canvas msg="Canvas" v-bind:clientData="clientData"  />
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'
import Sequencer from './components/sequencer/Sequencer.vue'
import PlaybackController from './components/PlaybackController.vue'
import io from 'socket.io-client'

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
      socket: io(),
      clientId: null,
      clientData: [],
      sequence: null
    }
  },
  methods: {
    updateMyMouseCoordinates: function(event) {
      this.mouse.x = event.clientX / window.innerWidth
      this.mouse.y = event.clientY / window.innerHeight
    },
    startEmittingMyMouseCoordinates: function() {
      setInterval(() => {
        this.socket.emit("clientMouseCoords", this.clientId, this.mouse)
      }, 10);
    },
    stepPainted: function(position) {
      console.log("received step painted at app, for position " + position)
      this.socket.emit("stepPainted", 1, position)
    }
    
  },
  mounted() {
    this.socket.on('connect', () => {
      console.log("client connect")
    })

    this.socket.on("generatedClientId", (myClientId) => {
      this.clientId = myClientId
    })

    this.socket.on("generatedSequence", (bar) => {
      this.sequence = bar
    })

    this.startEmittingMyMouseCoordinates()

    this.socket.on("serverMouseCoords", (clients) => {
      this.clientData = clients
    })

    this.socket.on("sequenceUpdated", (bar) => {
      console.log("received sequence updated, new bar: ")
      console.log(bar)
      this.sequence = bar
    })

    this.socket.on("serverButtonClicked", (funk) => {
      console.log("received server button clicked event")
      alert(funk.print)
    })
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

#top-nav {
  display: flex;
  width: 100%;
}

#title {
  margin-left: 5%;
  align-self: center;
}

#content-container {
    position: fixed;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    background-color: #101010;
}

html, body {
  margin: 0px;
  height: 100%;
}
</style>
