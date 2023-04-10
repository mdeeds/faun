import { AutoHarp } from "./autoharp";
import { MIDIHelper } from "./midiHelper";
import { Octotonic } from "./octotonic";
import { Organ } from "./organ";
import { TouchCanvas } from "./touchCanvas";

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

  {
    const button = document.createElement('button');
    button.textContent = 'Autoharp';
    document.body.appendChild(button);
    button.addEventListener('click', () => { new AutoHarp(tc, organ); });
  }

  {
    const button = document.createElement('button');
    button.textContent = 'Octotonic';
    document.body.appendChild(button);
    button.addEventListener('click', () => { new Octotonic(tc, organ); });
  }

});