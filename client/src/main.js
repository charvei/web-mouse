import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'

import App from './App.vue'
import * as Tone from "tone"

Vue.config.productionTip = false

Vue.use(Vuex)

/**
 * Vuex store
 * 
 * Access store in components via:
 *  - this.$store.state.key
 * 
 * Dispatch actions from components via:
 *  - store.dispatch('setClientId', myClientId)
 * 
 */
const store = new Vuex.Store({
  state: {
    sequence: [], //Notes[]
    socket: io(),   // could potentially hide socket from state even? is that a good idea?
    clientId: null,
    roomMouseData: [],

    // TONE.JS PLAYBACK
    tone: Tone
  },
  mutations: {
    // CLIENT ID
    setClientId (state, clientId) {
      state.clientId = clientId
    },

    // ROOM MOUSE DATA
    setRoomMouseData (state, roomMouseData) {
      state.roomMouseData = roomMouseData
    },

    // SEQUENCE
    setSequence (state, sequence) {
      state.sequence = sequence
    },
    addNoteToSequence (state, note) {
      state.sequence.push(note)
    },
    removeNoteFromSequenceByIndex (state, index) {
      state.sequence.splice(index, 1)
    }

    // TONE.JS PLAYBACK
    //setCurrent... do i even need to save it?


  },
  actions: {
    // CLIENT ID
    setClientId (context, clientId) {
      context.commit('setClientId', clientId)
    },

    // ROOM MOUSE DATA
    setRoomMouseData (context, roomMouseData) {
      context.commit('setRoomMouseData', roomMouseData)
    },

    // SEQUENCE
    setSequence (context, sequence) {
      console.log("set sequence action")
      context.commit('setSequence', sequence)
    },
    addNoteToSequence (context, note) {
      console.log("add note to sequence action")
      context.commit('addNoteToSequence', note)
    },
    removeNoteFromSequenceByIndex (context, index) {
      console.log("remove note from sequence by id action")
      context.commit('removeNoteFromSequenceByIndex', index)
    }

  }
})

/**
 * Web Sockets
 */
store.state.socket.on('connect', () => {
  console.log("client connect")
})

store.state.socket.on("generatedClientId", (myClientId) => {
  store.dispatch('setClientId', myClientId)
})

store.state.socket.on("generatedSequence", (sequence) => {
  store.dispatch('setSequence', sequence)
})

store.state.socket.on("serverMouseCoords", (roomMouseData) => {
  store.dispatch('setRoomMouseData', roomMouseData)
})

store.state.socket.on("sequenceUpdated", (sequence) => {
  store.dispatch('setSequence', sequence)
})



new Vue({
  render: h => h(App),
  store: store,
}).$mount('#app')


