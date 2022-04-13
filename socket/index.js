const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = [];

const addUser = (userId, socketid) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketid })
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketid !== socketId)
}

const getUser = (recieverId) => {
    return users.find(user => user.userId === recieverId)
}

io.on('connection', (socket) => {
    console.log('A user connected!');
    // io.emit("welcome", "Welcome bro");
    socket.on("addUser", userid => {
        addUser(userid, socket.id)
        io.emit("getUsers" , users)
    })

    // Messages
    socket.on("sendmessage", ({senderId,recieverId,message}) => {
        const user = getUser(recieverId);
        console.log("senderId",senderId)

        io.to(user.socketid).emit("getMessage",{
            senderId,
            text
        })
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected")
        removeUser(socket.id);
        io.emit("getUsers" , users)
    })
});