# Web Mouse

A quick for full-stack experiment for learning **Vue** and **Socket.io**. 

## What it is

A very simple Vue front end that establishes a Websocket (via socket.io) connection. Connected clients send their mouse coordinates to server. Server stores connected users received mouse coordingates and serves aggregated info back to clients. Clients render all connected clients' mouse positions on a canvas overlay of rest of DOM.