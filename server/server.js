const express = require('express');
const http = require('http');
const cors = require('cors');  // Import cors for use in express
const { Server } = require('socket.io');

// Create an Express app
const app = express();

// Enable CORS for your entire Express app (optional)
app.use(cors({
  origin: "http://localhost:4200",  // Allow your Angular app
  methods: ["GET", "POST"]
}));

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.IO server and configure CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",  // Allow Angular frontend to connect
    methods: ["GET", "POST"]          // Allow these methods
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle incoming messages
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg);  // Broadcast message to all clients
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
