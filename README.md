# Web Mouse

An online collaborative sequencer for music collaboration (similar to Miro) and quick experiment for learning **Vue** and **Socket.io**.

![image001](https://user-images.githubusercontent.com/30401158/166687878-3fec394f-8061-400c-93a8-40df10d8f27d.gif)

## Summary

Vue front end that establishes a Websocket (via socket.io) connection. Connected clients send their mouse coordinates to server. Server stores connected users received mouse coordingates and serves aggregated info back to clients. Clients render all connected clients' mouse positions on a canvas overlay of rest of DOM.
