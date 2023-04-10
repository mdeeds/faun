"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const midiHelper_1 = require("./midiHelper");
const organ_1 = require("./organ");
const touchCanvas_1 = require("./touchCanvas");
const button = document.createElement('button');
button.textContent = 'Go';
document.body.appendChild(button);
button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const audioContext = new AudioContext();
    const o = yield midiHelper_1.MIDIHelper.getDefaultOutput();
    document.body.innerHTML = '';
    const i = yield midiHelper_1.MIDIHelper.getDefaultInput();
    document.body.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.classList.add('touchArea');
    document.body.appendChild(canvas);
    const tc = new touchCanvas_1.TouchCanvas(canvas);
    const organ = new organ_1.Organ(audioContext);
    const allPipes = [];
    const lineMap = new Map();
    {
        const stride = 8;
        let x = 800;
        let y = 88 * stride + 20;
        for (let i = 0; i < 88; ++i) {
            const l = tc.addLine(x, y, x + 200, y, (et) => {
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
        let noteMods = [2, 5, 1]; // D F C#
        for (let j = 0; j < 3; ++j) {
            let noteMod = noteMods[j];
            for (let i = 0; i < 6; ++i) {
                let y = j * stride * (Math.sqrt(3.0) / 2.0) + radius;
                let x = i * stride + radius;
                if (j % 2 != 0) {
                    x += stride / 2.0;
                }
                const pipes = [];
                for (let i = 0; i < 88; ++i) {
                    if ((i + 21) % 12 == noteMod) { // Add 21 because that is A0.
                        pipes.push(allPipes[i]);
                    }
                }
                tc.addCircle(x, y, radius, (et) => { }, pipes);
                noteMod = (noteMod + 7) % 12;
            }
        }
    }
}));
//# sourceMappingURL=index.js.map