<template>
  <div id="content-container">
      <button id="hello-butt" v-on:click="testAlert">hello</button>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
  },
  methods: {
      testAlert: function() {
          alert("The button was clicked!")
      }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content-container {
    position: fixed;
    top: 0;
    left: 0;

    height: 100%;
    width: 100%;

    background-color: tomato;
}
</style>
