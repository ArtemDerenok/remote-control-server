import { WebSocketServer } from 'ws';
import {
  mouse, left, right, up, down,
} from '@nut-tree/nut-js';

(async () => {
  await mouse.move(left(500));
  await mouse.move(right(500));
  await mouse.move(up(500));
  await mouse.move(down(500));
})();

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('message', (data) => {
    console.log('received: %s', data);
  });

  ws.send('something');
});
