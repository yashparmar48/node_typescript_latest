import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import userRoutes from './routes/user.routes';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config()

const app = express();
const PORT = 3000;

app.use(cors({
  origin: '*', // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());
app.use('/api', userRoutes);

const server = http.createServer(app);

mongoose.connect('mongodb://localhost:27017/myappdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
