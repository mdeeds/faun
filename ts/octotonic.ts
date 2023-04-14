import { Organ } from "./organ";
import { EventType, TouchCanvas } from "./touchCanvas";

export class Octotonic {
  constructor(tc: TouchCanvas, organ: Organ) {
    let j = 0;
    const stride = 60;
    const radius = 30;
    for (let i = 0; i < 48; ++i) {
      const x = (Math.floor(i / 3) + 0.5 * j) * stride + radius;
      const y = (4 - j) * stride * Math.sqrt(3) / 2;
      tc.addCircle(x, y, radius, (et: EventType) => {
        switch (et) {
          case 'on': organ.pluck(i + 30); break;
          case 'off': organ.mute(i + 30); break;
        }
      }, []);

      j = (j + 1) % 3;
    }
  }
}