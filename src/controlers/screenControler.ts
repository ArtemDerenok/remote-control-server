/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  screen, saveImage, Region, FileType, ScreenClass,
} from '@nut-tree/nut-js';
// import * as fs from 'fs';

class Screen {
  async getScreen() {
    const file = await screen.capture('screen.png', FileType.PNG, 'screen');
    console.log(file);
  }
}

const screenControler = new Screen();

export default screenControler;
