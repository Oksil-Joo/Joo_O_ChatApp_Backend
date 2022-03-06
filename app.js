import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000;

httpServer.listen(port, () => {
    console.log(`chat server up and running on ${port}`);
})

io.on('connection', (socket) => {
    console.log('a user connceted');

    socket.emit("CONNECTED", socket.id);

    socket.emit("TEST_FOR_EVENT", { eyecolor: "blue" });

    //listen for incoming messages
    socket.on('SEND_MESSAGE', function(data) {
        console.log('SEND_MESSAGE event!', data);

        io.emit('MESSAGE', data);
    })

    socket.on("TYPING", (data) => {
        console.log(`${data.username} is typing`);
    })

    socket.on("disconnect", () => {
        console.log('user disconnected');
      })

});

