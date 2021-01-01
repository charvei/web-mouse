import express from "express"
import { Server, Socket } from "socket.io"
import http from "http"
import { v4 as uuidv4 } from "uuid"
import { Bar, Note } from "./models/bar"

const views_path = __dirname + "/views/"
const PORT = 3008

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

let bar = new Bar()


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
    socket.emit("generatedSequence", bar)
    
    // set up receive event handling
    socket.on("clientMouseCoords", (clientId, mouse) => {
        let clientIndex = connections.findIndex(connection => {
            return connection.clientData.id === clientId
        })
        if (clientIndex >= 0) {
            connections[clientIndex].clientData.mouse = mouse
        }
    })

    socket.on("stepPainted", (note, position) => {
        console.log(position)
        let existingStepIndex = bar.notes.findIndex((note) => {
            return note.start === position
        })
        if (existingStepIndex < 0) {
            console.log("adding to notes")
            bar.notes.push({length: 1, start: position})
        } else {
            console.log("removing notes")
            bar.notes.splice(existingStepIndex, 1)
        }

        
        connections.forEach(connection => {
            connection.socket.emit("sequenceUpdated", bar)
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