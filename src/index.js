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
    const stride = 120;
    const radius = 90;
    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 3; ++j) {
            let y = j * stride * (Math.sqrt(3.0) / 2.0) + radius;
            let x = i * stride + radius;
            if (j % 2 != 0) {
                x += stride / 2.0;
            }
            tc.addCircle(x, y, radius, (et) => { });
        }
    }
}));
//# sourceMappingURL=index.js.map