import { WebSocketServer } from 'ws';
import mouseControler from './controlers/mouseControler';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    const command = data.toString();
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
    }
  });

  ws.send('something');
});
