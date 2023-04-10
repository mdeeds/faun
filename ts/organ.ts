export class Organ {
  private pipes: GainNode[] = [];
  constructor(private audioCtx: AudioContext) {
    const gainOut = new GainNode(audioCtx, { gain: 0.2 });
    // A0 = 21 = 27.5 Hz
    for (let i = 0; i < 88; ++i) {
      const note = 21 + i;
      const freq = 27.5 * Math.pow(2.0, i / 12);
      const osc = new OscillatorNode(audioCtx, { frequency: freq, type: 'triangle' });
      osc.start();
      const pipe = new GainNode(audioCtx, { gain: 0 });
      osc.connect(pipe);
      pipe.connect(gainOut);
      this.pipes.push(pipe);
    }
    gainOut.connect(audioCtx.destination);
  }

  pluck(i: number) {
    console.log(`Pluck: ${i}`)
    const pipe = this.pipes[i];
    const fullTime = this.audioCtx.currentTime + 0.05;
    pipe.gain.linearRampToValueAtTime(1.0, fullTime);
    pipe.gain.setTargetAtTime(0.0, fullTime, 0.5);
  }

  mute(i: number) {
    const pipe = this.pipes[i];
    const current = pipe.gain.value;
    const nowTime = this.audioCtx.currentTime;
    pipe.gain.cancelScheduledValues(nowTime);
    pipe.gain.setTargetAtTime(0.0, nowTime, 0.1);
  }
}