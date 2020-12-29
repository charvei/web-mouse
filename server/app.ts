import express from "express"
import { Server, Socket } from "socket.io"
import http from "http"

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

let clients = []


io.on("connection", (socket: Socket) => {
    console.log("on connect event detected by server")
    
    let makeColour = () => {
        let r = (10 + Math.floor(Math.random() * 150)).toString(16)
        let g = (10 + Math.floor(Math.random() * 150)).toString(16)
        let b = (10 + Math.floor(Math.random() * 150)).toString(16)
        return "#" + r + "" + b + "" + g
    }
    
    //users.push(user)

    // set up receive event handling
    socket.on("clientMouseCoords", (clientId, mouse) => {
        let clientIndex = clients.findIndex(client => client.id === clientId)
        console.log(clientIndex)
        if (clientIndex >= 0) {
            console.log(clients)
            clients[clientIndex].mouse = mouse
        } else {
            clients.push({
                id: clientId,
                colourHex: makeColour(),
                mouse: {
                    x: 0,
                    y: 0
                }
            })
        }
    })

    setInterval(() => {
        socket.emit("serverMouseCoords", clients)
    }, 25)
    
})

console.log("Server listening on port " + PORT)

httpServer.listen(PORT)