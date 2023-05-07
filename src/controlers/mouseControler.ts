import {
  mouse, left, right, up, down,
} from '@nut-tree/nut-js';

class Mouse {
  async mouseMove(coords: string) {
    const coordsArr = coords.split(' ');

    switch (coordsArr[0]) {
      case 'left':
        await this.mouseLeft(coordsArr[1]);
        break;
      case 'right':
        await this.mouseRight(coordsArr[1]);
        break;
      case 'up':
        await this.mouseUp(coordsArr[1]);
        break;
      case 'down':
        await this.mouseDown(coordsArr[1]);
        break;
      case 'position': {
        const pos = await this.setMousePosition();
        return pos;
      }
      default:
        break;
    }

    return undefined;
  }

  private async mouseLeft(coord: string) {
    await mouse.move(left(+coord));
  }

  private async mouseRight(coord: string) {
    await mouse.move(right(+coord));
  }

  private async mouseUp(coord: string) {
    await mouse.move(up(+coord));
  }

  private async mouseDown(coord: string) {
    await mouse.move(down(+coord));
  }

  private async setMousePosition() {
    const coords = await mouse.getPosition();
    return coords;
  }
}

const mouseControler = new Mouse();

export default mouseControler;
