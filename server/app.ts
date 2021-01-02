import express from "express"
import { Server, Socket } from "socket.io"
import http from "http"
import { v4 as uuidv4 } from "uuid"
import { Sequence, Note, Pitch } from "./models/sequence"

const views_path = __dirname + "/views/"
const PORT = 3010

const app = express()

app.use(express.static(views_path))

app.get('/', function(req, res) {
    res.sendFile(views_path + "index.html")
})

const httpServer = http.createServer(app)
const options = {}
const io = new Server(httpServer, options)


let randColourHex = () => { return (10 + Math.floor(Math.random() * 150)).toString(16) }
let makeColour = () => { return "#" + randColourHex() + randColourHex() + randColourHex() }

let connections = []

let sequence = new Sequence()


io.on("connection", (socket: Socket) => {
    console.log("on connect event detected by server")
    
    let generatedClientId = uuidv4()

    connections.push({
        socket: socket,
        clientData: {
            id: generatedClientId,
            colourHex: makeColour(),
            mouse: {
                x: 0,
                y: 0
            }
        }
    })

    //send client id back
    socket.emit("generatedClientId", generatedClientId)
    
    //send over sequence
    socket.emit("generatedSequence", sequence)
    
    // set up receive event handling
    socket.on("clientMouseCoords", (clientId, mouse) => {
        let clientIndex = connections.findIndex(connection => {
            return connection.clientData.id === clientId
        })
        if (clientIndex >= 0) {
            connections[clientIndex].clientData.mouse = mouse
        }
    })

    socket.on("stepPainted", (pitch, position) => {
        console.log(position)
        let existingStepIndex = sequence.notes.findIndex((note) => {
            return (note.start === position && note.pitch === pitch)
        })
        if (existingStepIndex < 0) {
            console.log("adding to notes")
            sequence.notes.push({length: 1, start: position, pitch: pitch})
        } else {
            console.log("removing notes")
            sequence.notes.splice(existingStepIndex, 1)
        }

        
        connections.forEach(connection => {
            connection.socket.emit("sequenceUpdated", sequence)
        })
    })

    setInterval(() => {
        socket.emit("serverMouseCoords", connections.map((connection) => {
            return connection.clientData
        }))
    }, 25)

    // Disconnect
    socket.on("disconnect", () => {
        console.log(connections.length)
        let clientIndex = connections.findIndex(connection => {
            return connection.clientData.id === generatedClientId
        })
        connections.splice(clientIndex, 1)
        console.log(connections.length)
    })
    
})

console.log("Server listening on port " + PORT)

httpServer.listen(PORT)