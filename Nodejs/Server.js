var websocket = require('ws');

var callbackInitServer = () => {
    console.log("Server is running")
}

var websocketserver = new websocket.Server({ port: 25500 }, callbackInitServer);

var wsList = [];
//var callbackConnection = 

websocketserver.on("connection", (ws,) => {
    console.log("client conected");
    wsList.push(ws);
    ws.on("message", (data) => {
        console.log("send from client : " + data);
        Boardcast(data);
    })

    ws.on("close", () => {
        console.log("client disconnected.");
        wsList = ArrayRemove(wsList, ws);
    });
});
function ArrayRemove(arr, value) {
    return arr.filter((Element) => {
        return Element != value;
    });
}

function Boardcast(data) {
    for (var i = 0; i < wsList.length; i++) {
        wsList[i].send(data);
    }
}