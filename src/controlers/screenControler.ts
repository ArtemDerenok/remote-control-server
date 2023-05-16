import {
  screen, Region, mouse,
} from '@nut-tree/nut-js';
import * as Jimp from 'jimp';

class Screen {
  async getScreen() {
    const cursor = await mouse.getPosition();
    const file = await screen.grabRegion(new Region(cursor.x, cursor.y, 200, 200));

    const imgData = await new Jimp(await file.toRGB()).getBase64Async(Jimp.MIME_PNG);

    return imgData.replace('data:image/png;base64,', '');
  }
}

const screenControler = new Screen();

export default screenControler;
