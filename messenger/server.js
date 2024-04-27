var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 8080, perMessageDeflate: false});

wss.on('connection', function connection(ws, req) {
    ws.on('message', function message(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                const ip = req.socket.remoteAddress;
                data = JSON.parse(data);
                data.ip = ip;
                client.send(JSON.stringify(data));
            }
        });
    });
});
