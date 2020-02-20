const socketio = require('socket.io')
const parseStringAsArray = require('../src/models/utils/ParseStringAsArray')
const calculateDistance = require('../src/models/utils/calculateDistance')
const connection = [];
let io;
exports.setupWebsocket = (server)=>{
    io = socketio(server)

    io.on('connection',socket=>{
        //console.log(socket.id);
        const {latitude,longitude,techs} = socket.handshake.query

        connection.push({
            id:socket.id,
            coordinates:{
                latitude: Number(latitude),
                longitude: Number(longitude),
              },
              techs:parseStringAsArray(techs)
        })
     

    });
};

exports.findConnections=(coordinates,techs)=>{
    return connections.filter(connection=>{
        return calculateDistance(coordinates,connection.coordinates)<10
            && connection.techs.some(item=>techs.incledes(item))
    })
}
exports.sendMessage=(to,message,data)=>{
    to.forEach(connection => {
        io.to(connection.id).emit(message,data)
    });
}