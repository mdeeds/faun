import { Organ } from "./organ";
import { EventType, TouchCanvas } from "./touchCanvas";

export class Arabic {
  constructor(tc: TouchCanvas, organ: Organ) {
    let j = 0;
    const stride = 95;
    const radius = 50;

    let x = radius - stride;

    const inScaleMods = new Set<number>();
    inScaleMods.add(1);
    inScaleMods.add(2);
    inScaleMods.add(3);
    inScaleMods.add(6);
    inScaleMods.add(7);
    inScaleMods.add(9);
    inScaleMods.add(10);
    inScaleMods.add(11);

    let lastInScale = false;
    for (let i = 0; i < 48; ++i) {
      let currentInScale: boolean;
      let y: number;
      if (inScaleMods.has(i % 12)) {
        currentInScale = true;
        y = 3 * radius;
      } else {
        currentInScale = false;
        y = 1 * radius;
      }
      if (lastInScale != currentInScale) {
        lastInScale = currentInScale;
        x += stride * 0.5;
      } else {
        x += stride;
      }
      tc.addCircle(x, y, radius, (et: EventType) => {
        switch (et) {
          case 'on': organ.pluck(i + 30); break;
          case 'off': organ.mute(i + 30); break;
        }
      }, []);
    }
  }
}