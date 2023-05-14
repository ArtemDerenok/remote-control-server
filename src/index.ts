import { WebSocketServer, WebSocket } from 'ws';
import mouseControler from './controlers/mouseControler';
import drawControler from './controlers/drawingControler';
import screenControler from './controlers/screenControler';

declare interface MyWS extends WebSocket {
  isAlive?: boolean;
}

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: MyWS, req) => {
  ws.isAlive = true;

  console.log(`${req.socket.remoteAddress} is conected`);

  ws.on('error', console.error);

  ws.on('message', (data) => {
    const command = data.toString();
    console.log(command);
    if (command.includes('mouse')) {
      if (command.includes('position')) {
        const coord = mouseControler.mouseMove(command.split('_')[1]);
        coord.then((point) => {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(`mouse_position ${point.x},${point.y}`);
            }
          });
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        mouseControler.mouseMove(command.split('_')[1]);
      }
    } else if (command.includes('draw')) {
      drawControler.drawing(command.split('_')[1]);
    } else if (command === 'prnt_scrn') {
      screenControler.getScreen();
    }
  });

  ws.send('something');

  ws.on('close', () => {
    console.log('Client is closed');
  });

  ws.on('pong', heartbeat);
});

const interval = setInterval(() => {
  wss.clients.forEach((ws: MyWS) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping();

    return undefined;
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});
