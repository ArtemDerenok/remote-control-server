import { WebSocketServer } from 'ws';
import mouseControler from './controlers/mouseControler';
import drawControler from './controlers/drawingControler';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    const command = data.toString();
    console.log(command);

    if (command.includes('mouse')) {
      if (command.includes('position')) {
        const coord = mouseControler.mouseMove(command.split('_')[1]);
        coord.then((point) => {
          wss.clients.forEach((client) => {
            client.send(`mouse_position ${point.x},${point.y}`);
          });
        }).catch((error) => {
          console.log(error.message);
        });
      } else {
        mouseControler.mouseMove(command.split('_')[1]);
      }
    } else if (command.includes('draw')) {
      drawControler.drawing(command.split('_')[1]);
    }
  });

  ws.send('something');
});
