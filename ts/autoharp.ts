import { Organ } from "./organ";
import { EventType, TouchCanvas, TouchLine } from "./touchCanvas";

export class AutoHarp {
  constructor(tc: TouchCanvas, organ: Organ) {
    const allPipes: TouchLine[] = [];
    // const lineMap = new Map<number, TouchLine>();
    {
      const noteCount = 37;
      const stride = 16;
      let x = 600;
      let y = noteCount * stride + 20;
      const firstNote = Math.trunc((88 - noteCount) / 2);
      for (let i = 0; i < noteCount; ++i) {
        const l = tc.addLine(x, y, x + 200, y, (et: EventType) => {
          switch (et) {
            case 'on':
              organ.pluck(i + firstNote);
              break;
            case 'off':
              organ.mute(i + firstNote);
              break;
          }
        });
        // lineMap.set(i, l);
        allPipes.push(l);
        y -= stride;
      }
    }

    {
      const stride = 80;
      const radius = 60;
      let noteMods = [2, 5, 1];  // D F C#
      for (let j = 0; j < 3; ++j) {
        let noteMod = noteMods[j];
        for (let i = 0; i < 6; ++i) {
          let y = j * stride * (Math.sqrt(3.0) / 2.0) + radius
          let x = i * stride + radius;
          if (j % 2 != 0) { x += stride / 2.0; }
          const pipes: TouchLine[] = [];
          for (let i = 0; i < 88; ++i) {
            if ((i + 21) % 12 == noteMod) {  // Add 21 because that is A0.
              pipes.push(allPipes[i]);
            }
          }
          tc.addCircle(x, y, radius, (et: EventType) => { }, pipes);

          noteMod = (noteMod + 7) % 12;
        }
      }
    }

  }
}