/* eslint-disable no-await-in-loop */
import {
  mouse, up, down, left, right, Button, Point, straightTo,
} from '@nut-tree/nut-js';

class Draw {
  async drawing(coords: string) {
    const coordsArr = coords.split(' ');

    switch (coordsArr[0]) {
      case 'circle': {
        await this.drawCircle(coordsArr[1]);
        break;
      }
      case 'rectangle': {
        await this.drawRectangle(coordsArr[1], coordsArr[2]);
        break;
      }
      case 'square': {
        await this.drawSquare(coordsArr[1]);
        break;
      }
      default:
        break;
    }

    return undefined;
  }

  private async drawCircle(size: string) {
    const radius = +size;
    const { x, y } = await mouse.getPosition();
    await mouse.pressButton(Button.LEFT);
    for (let i = 0; i < 360; i += 1) {
      const rad = (i / 180) * Math.PI;
      const cx = radius * Math.cos(rad) + x - radius;
      const cy = radius * Math.sin(rad) + y;
      await mouse.move(straightTo(new Point(cx, cy)));
    }
    await mouse.releaseButton(Button.LEFT);
  }

  private async drawRectangle(sizeOne: string, sizeTwo: string) {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(up(+sizeOne));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(+sizeTwo));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(+sizeOne));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(left(+sizeTwo));
    await mouse.releaseButton(Button.LEFT);
  }

  private async drawSquare(size: string) {
    await mouse.pressButton(Button.LEFT);
    await mouse.move(up(+size));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(right(+size));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(down(+size));
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
    await mouse.move(left(+size));
    await mouse.releaseButton(Button.LEFT);
  }
}

const drawControler = new Draw();

export default drawControler;
