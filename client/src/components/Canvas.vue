<template>
  <div id="canvas-container">
    <canvas id="mouse-canvas" height="480" width="640"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Canvas',
  props: {
    msg: String,
  },
  methods: {
    drawToCanvas: function() {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.$store.state.roomMouseData.forEach(client => {
        this.context.fillStyle = client.colourHex
        this.context.fillRect(client.mouse.x * this.canvas.width, client.mouse.y * this.canvas.height, 10, 10)
      })
    }
  },
  mounted() {
    this.canvas = document.getElementById("mouse-canvas")
    this.context = this.canvas.getContext("2d")
    setInterval(this.drawToCanvas, 10)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mouse-canvas {
    border: 1px solid blue;
    margin: 0px;

    position: fixed;
    top: 0;
    left: 0;

    pointer-events: none;
}

#canvas-container {
  margin: 0px;
  height: 100%;
}
</style>
