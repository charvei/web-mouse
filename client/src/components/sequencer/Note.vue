<template>
    <div class="note" id="note1">
        <div class="pitch-label">
            <span>{{ this.pitch }}</span>
        </div>
    </div>
</template>

<script>
import Measure from "./Measure.vue"

export default {
  name: 'Note',
  props: {
    pitch: String,
  }
}
//clicking step will add a new note of length 1 step to bar @ position n-1
</script>

<style scoped>
.note {
    height: 4vh;
    text-align: center;
    background-color: #050533;
    border-right: 1px solid white;

    display: flex;

    /* border-bottom: 1px #666666 solid; */
}

.pitch-label {
    border-bottom: 1px #666666 solid;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
