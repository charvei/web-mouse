import express from "express"
import { Server, Socket } from "socket.io"
import http from "http"
import { v4 as uuidv4 } from "uuid"
import { Sequence, Note, Pitch } from "./models/sequence"

const views_path = __dirname + "/views/"
const PORT = 3000

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

// let sequence = new Sequence()
let sequence: Note[] = []


io.on("connection", (socket: Socket) => {    
    let generatedClientId = uuidv4()

    let connectionLog = (message: string) => {
        console.log(message + "." + " ".repeat(40 - message.length) + "[" + generatedClientId.substring(0,5) + "]")
    }

    connectionLog("New client connected")

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

    socket.on("stepPainted", (pitch, time) => {
        connectionLog("Step painted for time: " + time)
        let existingStepIndex = sequence.findIndex((note) => {
            return (note.time === time && note.pitch === pitch)
        })
        if (existingStepIndex < 0) {
            connectionLog("Adding to notes")
            sequence.push({duration: "16n", time: time, pitch: pitch})
        } else {
            connectionLog("Removing notes")
            sequence.splice(existingStepIndex, 1)
        }

        
        connections.forEach(connection => {
            connection.socket.emit("sequenceUpdated", sequence)
        })
    })

    setInterval(() => {
        socket.emit("serverMouseCoords", connections.map((connection) => {
            return connection.clientData
        }))
    }, 10)

    // Disconnect
    socket.on("disconnect", () => {
        let clientIndex = connections.findIndex(connection => {
            if (connection.clientData.id === generatedClientId) {
                connectionLog("Client disconnected")
                return true
            }
        })
        connections.splice(clientIndex, 1)
        console.log("Number of connected clients: " + connections.length)
    })
    
})

console.log("Server listening on port " + PORT)

httpServer.listen(PORT)