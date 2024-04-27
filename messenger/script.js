var xsocket = 'ws://localhost:8080';
var xwebsocket = new WebSocket(xsocket);

xwebsocket.onopen = function () {
    document.getElementById('xboxmessages').innerHTML += '<div class="xmessege" style="color: darkgreen;">connection open</div>';
};

xwebsocket.onerror = function () {
    document.getElementById('xboxmessages').innerHTML += '<div class="xmessege" style="color: darkred;">connection error</div>';
};

xwebsocket.onclose = function () {
    document.getElementById('xboxmessages').innerHTML += '<div class="xmessege" style="color: darkred;">connection close</div>';
};

xwebsocket.onmessage = function (event) {

    var response = JSON.parse(event.data);
    if (response.message) {
        document.getElementById('xboxmessages').innerHTML += '<div class="xmessege" style="color: darkblue;">' + response.name + ' : ' + response.message + ' [ ' + response.ip + ' ]</div>';
    }

    document.getElementById('xboxmessages').scrollTop = document.getElementById('xboxmessages').scrollHeight;
};

function xmessagesend() {
    var data = {name: document.getElementById('xboxname').value, message: document.getElementById('xboxmessege').value};
    xwebsocket.send(JSON.stringify(data));
}
document.getElementById('xboxmessege').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        xmessagesend();
    }
});
