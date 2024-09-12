import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import session from 'express-session';
import cors from 'cors';
import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/router/index.js';
import putAdminDataInReq from './src/middlewares/putAdminDataInReq.js';
import notFoundMiddleware from './src/middlewares/notFound.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Configure view engine
app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Configure assets routes (static folder)
app.use(express.static('src/public'));

app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      'default value si pas de session secret dans le fichier .env',
    resave: false,
    saveUninitialized: true,
    cookie: {
      // 2 heures
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);

// Middleware pour gérer les messages d'erreur et de succès
app.use((req, res, next) => {
  if (req.session.errorMessage) {
    res.locals.errorMessage = req.session.errorMessage;
    req.session.errorMessage = null; // Efface le message d'erreur de la session après l'avoir transféré dans res.locals
  } else {
    res.locals.errorMessage = null;
  }

  if (req.session.successMessage) {
    res.locals.successMessage = req.session.successMessage;
    req.session.successMessage = null; // Efface le message de succès de la session après l'avoir transféré dans res.locals
  } else {
    res.locals.successMessage = null;
  }

  next();
});

app.use(putAdminDataInReq);

app.use(errorHandler);

app.use(router);

app.use(notFoundMiddleware);

let connectedClients = {};  // Store connected clients with socket IDs

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // When a client joins, store their details
  socket.on('joinClient', (userId) => {
    connectedClients[userId] = socket.id;
    console.log(`User ${userId} has joined`);
  });

  // Listen for messages from users
  socket.on('message', (data) => {
    const { sender_id, receiver_id, message } = data;
    
    // Check if the receiver is connected
    const receiverSocketId = connectedClients[receiver_id];
    if (receiverSocketId) {
      // Send message to the specific client
      io.to(receiverSocketId).emit('message', {
        sender_id,
        message,
        timestamp: new Date(),
      });
    }
  });

  // When the client disconnects
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(connectedClients)) {
      if (socketId === socket.id) {
        delete connectedClients[userId];
        console.log(`User ${userId} disconnected`);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
