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
const autoharp_1 = require("./autoharp");
const midiHelper_1 = require("./midiHelper");
const octotonic_1 = require("./octotonic");
const organ_1 = require("./organ");
const touchCanvas_1 = require("./touchCanvas");
const audioButton = document.createElement('button');
audioButton.textContent = 'Speakers';
document.body.appendChild(audioButton);
audioButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    document.body.innerHTML = '';
    const audioContext = new AudioContext();
    const canvas = document.createElement('canvas');
    canvas.classList.add('touchArea');
    document.body.appendChild(canvas);
    const tc = new touchCanvas_1.TouchCanvas(canvas);
    const organ = new organ_1.Organ(audioContext);
    {
        const button = document.createElement('button');
        button.textContent = 'Autoharp';
        document.body.appendChild(button);
        button.addEventListener('click', () => { new autoharp_1.AutoHarp(tc, organ); });
    }
    {
        const button = document.createElement('button');
        button.textContent = 'Octotonic';
        document.body.appendChild(button);
        button.addEventListener('click', () => { new octotonic_1.Octotonic(tc, organ); });
    }
}));
const midiButton = document.createElement('button');
midiButton.textContent = 'MIDI';
document.body.appendChild(midiButton);
midiButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    document.body.innerHTML = '';
    const o = yield midiHelper_1.MIDIHelper.getDefaultOutput();
    document.body.innerHTML = '';
    const i = yield midiHelper_1.MIDIHelper.getDefaultInput();
    document.body.innerHTML = '';
}));
//# sourceMappingURL=index.js.map