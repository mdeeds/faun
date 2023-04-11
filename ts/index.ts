import { AutoHarp } from "./autoharp";
import { MIDIHelper } from "./midiHelper";
import { Octotonic } from "./octotonic";
import { Organ } from "./organ";
import { TouchCanvas } from "./touchCanvas";

const audioButton = document.createElement('button');
audioButton.textContent = 'Speakers';
document.body.appendChild(audioButton);
audioButton.addEventListener('click', async () => {
  document.body.innerHTML = '';
  const audioContext = new AudioContext();
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

const midiButton = document.createElement('button');
midiButton.textContent = 'MIDI';
document.body.appendChild(midiButton);
midiButton.addEventListener('click', async () => {
  document.body.innerHTML = '';
  const o = await MIDIHelper.getDefaultOutput();
  document.body.innerHTML = '';
  const i = await MIDIHelper.getDefaultInput();
  document.body.innerHTML = '';
});