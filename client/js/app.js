const bodyElement = document.getElementById('wrapper');
const object = document.getElementById('object');
object.style.backgroundColor = Math.random() < 0.5 ? 'red' : 'green';

// Open websocket connection
const ws = new WebSocket('ws://localhost:2346');

bodyElement.addEventListener('keyup', event => {
    let top = object.style.top ? object.style.top : 0;
    let left = object.style.left ? object.style.left : 0;
    const step = 10;

    if (event.code == 'ArrowUp') {
        object.style.top = parseInt(top) - step + 'px';
    } else if (event.code == 'ArrowDown') {
        object.style.top = parseInt(top) + step + 'px';
    } else if (event.code == 'ArrowLeft') {
        object.style.left = parseInt(left) - step + 'px';
    } else if (event.code == 'ArrowRight') {
        object.style.left = parseInt(left) + step + 'px';
    }

    let positionData = {
        top: object.style.top,
        left: object.style.left
    };

    ws.send(JSON.stringify(positionData));
});

ws.onmessage = response => {
    let positionData = JSON.parse(response.data);
    console.log(positionData);
    object.style.top = positionData.top;
    object.style.left = positionData.left;
};
