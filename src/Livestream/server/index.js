const { data } = require("jquery");

const io = require("socket.io")(process.env.PORT ||  3111, {cors:{origin: "*"}});
//const io = require("socket.io")(3005,{cors:{origin: "*"}});
const arrPeerId = new Array();
const arrnickname = new Array();
console.log('run');
io.on('connection',(socket) => {
    socket.on('NEW_PEER_ID',data => {
        var peerId = data.peerId;
        var nickname = data.nickname;
        socket.peerId = peerId;
        socket.nickname = nickname;
        var set1 = io.sockets.adapter.rooms.get(socket.room);
        if(set1.has(socket.id))
        {
            arrPeerId[socket.room].push(peerId);
            arrnickname[socket.room].push(nickname);
        }
        else{
            console.log("false");
        }
        io.sockets.in(socket.room).emit('NEW_CLIENT_CONNECT', {peerId: peerId, nickname:nickname});
    });
    socket.on('disconnect', () => {
        const index = arrPeerId[socket.room].indexOf(socket.peerId);
        arrPeerId[socket.room].splice(index,1);
        const index1 = arrnickname[socket.room].indexOf(socket.nickname);
        arrnickname[socket.room].splice(index1,1);
        io.emit('SOMEONE_DISCONNECTED', {peerId: socket.peerId, nickname:socket.nickname});
    })
    socket.on("Client-send-data", function(data){
        io.sockets.in(socket.room).emit("Server-send-data",data);
    })
    socket.on('create-room',function(data){
        if (typeof(arrPeerId[data]) == 'undefined')
        {
            arrPeerId[data] = new Array();
        }
        if (typeof(arrnickname[data]) == 'undefined')
        {
            arrnickname[data] = new Array();
        }
        socket.join(data);
        socket.room = data;
        socket.emit("server-send-room-socket",data);
        socket.emit("ONLINE_PEER_ARRAY",{arrPeerId: arrPeerId[socket.room], arrnickname: arrnickname[socket.room]});
    })
    socket.on("signal_to_Server", function(source) {
        io.sockets.in(socket.room).emit("signal_to_Clients", source);
    })
});


