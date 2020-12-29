<template>
  <div id="app" v-on:mousemove="updateMyMouseCoordinates">
    <Content /> 
    <Canvas msg="Canvas" v-bind:clientData="clientData" />
    
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue'
import Content from './components/Content.vue'
import io from 'socket.io-client'

export default {
  name: 'App',
  components: {
    Canvas,
    Content
  },
  data() {
    return {
      mouse: {
        x: 0,
        y: 0,
      },
      socket: io(),
      clientId: Math.floor(Math.random() * 10000),
      clientData: []
    }
  },
  methods: {
    updateMyMouseCoordinates: function(event) {
      this.mouse.x = event.clientX / window.innerWidth
      this.mouse.y = event.clientY / window.innerHeight
    },
    emitMyMouseCoordinates: function() {
      setInterval(() => {
        this.socket.emit("clientMouseCoords", this.clientId, this.mouse)
      }, 25);
    },
    
  },
  mounted() {
    this.socket.on('connect', () => {
      console.log("client connect")
    })

    this.emitMyMouseCoordinates()

    this.socket.on("serverMouseCoords", (clients) => {
      this.clientData = clients
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5c3e50;
  background-color: #bbbbbbbb;

  margin: 0px;

  height: 100%;
  width: 100%;
}

html, body {
  margin: 0px;
  height: 100%;
}
</style>
