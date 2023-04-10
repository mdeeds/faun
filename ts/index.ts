import { MIDIHelper } from "./midiHelper";
import { Organ } from "./organ";
import { EventType, TouchCanvas, TouchLine } from "./touchCanvas";

const button = document.createElement('button');
button.textContent = 'Go';
document.body.appendChild(button);

button.addEventListener('click', async () => {
  const audioContext = new AudioContext();
  const o = await MIDIHelper.getDefaultOutput();
  document.body.innerHTML = '';
  const i = await MIDIHelper.getDefaultInput();
  document.body.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.classList.add('touchArea');
  document.body.appendChild(canvas);
  const tc = new TouchCanvas(canvas);

  const organ = new Organ(audioContext);

  const allPipes: TouchLine[] = [];
  const lineMap = new Map<number, TouchLine>();
  {
    const stride = 8;
    let x = 800;
    let y = 88 * stride + 20;
    for (let i = 0; i < 88; ++i) {
      const l = tc.addLine(x, y, x + 200, y, (et: EventType) => {
        switch (et) {
          case 'on':
            organ.pluck(i);
            break;
          case 'off':
            organ.mute(i);
            break;
        }
      });
      lineMap.set(i, l);
      allPipes.push(l);
      y -= stride;
    }
  }

  {
    const stride = 120;
    const radius = 90;
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 3; ++j) {
        let y = j * stride * (Math.sqrt(3.0) / 2.0) + radius
        let x = i * stride + radius;
        if (j % 2 != 0) { x += stride / 2.0; }
        tc.addCircle(x, y, radius, (et: EventType) => { }, allPipes);
      }
    }
  }

});