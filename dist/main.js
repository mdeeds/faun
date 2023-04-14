/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 703:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Arabic = void 0;
class Arabic {
    constructor(tc, organ) {
        let j = 0;
        const stride = 95;
        const radius = 50;
        let x = radius - stride;
        const inScaleMods = new Set();
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
            let currentInScale;
            let y;
            if (inScaleMods.has(i % 12)) {
                currentInScale = true;
                y = 3 * radius;
            }
            else {
                currentInScale = false;
                y = 1 * radius;
            }
            if (lastInScale != currentInScale) {
                lastInScale = currentInScale;
                x += stride * 0.5;
            }
            else {
                x += stride;
            }
            tc.addCircle(x, y, radius, (et) => {
                switch (et) {
                    case 'on':
                        organ.pluck(i + 30);
                        break;
                    case 'off':
                        organ.mute(i + 30);
                        break;
                }
            }, []);
        }
    }
}
exports.Arabic = Arabic;
//# sourceMappingURL=arabic.js.map

/***/ }),

/***/ 148:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AutoHarp = void 0;
class AutoHarp {
    constructor(tc, organ) {
        const allPipes = [];
        // const lineMap = new Map<number, TouchLine>();
        {
            const noteCount = 37;
            const stride = 16;
            let x = 600;
            let y = noteCount * stride + 20;
            const firstNote = Math.trunc((88 - noteCount) / 2);
            for (let i = 0; i < noteCount; ++i) {
                const l = tc.addLine(x, y, x + 200, y, (et) => {
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
    }
}
exports.AutoHarp = AutoHarp;
//# sourceMappingURL=autoharp.js.map

/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const arabic_1 = __webpack_require__(703);
const autoharp_1 = __webpack_require__(148);
const midiHelper_1 = __webpack_require__(398);
const octotonic_1 = __webpack_require__(500);
const organ_1 = __webpack_require__(58);
const touchCanvas_1 = __webpack_require__(448);
const audioButton = document.createElement('button');
audioButton.textContent = 'Speakers';
document.body.appendChild(audioButton);
audioButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    document.body.innerHTML = '';
    const audioContext = new AudioContext();
    const organ = new organ_1.Organ(audioContext);
    {
        const button = document.createElement('button');
        button.textContent = 'Autoharp';
        document.body.appendChild(button);
        button.addEventListener('click', () => {
            document.body.innerHTML = '';
            const canvas = document.createElement('canvas');
            canvas.classList.add('touchArea');
            document.body.appendChild(canvas);
            const tc = new touchCanvas_1.TouchCanvas(canvas);
            new autoharp_1.AutoHarp(tc, organ);
        });
    }
    {
        const button = document.createElement('button');
        button.textContent = 'Octotonic';
        document.body.appendChild(button);
        button.addEventListener('click', () => {
            document.body.innerHTML = '';
            const canvas = document.createElement('canvas');
            canvas.classList.add('touchArea');
            document.body.appendChild(canvas);
            const tc = new touchCanvas_1.TouchCanvas(canvas);
            new octotonic_1.Octotonic(tc, organ);
        });
    }
    {
        const button = document.createElement('button');
        button.textContent = 'Arabic';
        document.body.appendChild(button);
        button.addEventListener('click', () => {
            document.body.innerHTML = '';
            const canvas = document.createElement('canvas');
            canvas.classList.add('touchArea');
            document.body.appendChild(canvas);
            const tc = new touchCanvas_1.TouchCanvas(canvas);
            new arabic_1.Arabic(tc, organ);
        });
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

/***/ }),

/***/ 398:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MIDIHelper = void 0;
class MIDIHelper {
    static getDefaultOutput() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!navigator.requestMIDIAccess)
                throw new Error("Your browser does not support WebMIDI API");
            const access = yield navigator.requestMIDIAccess();
            return new Promise((resolve, reject) => {
                document.body.innerHTML = '';
                for (const [name, o] of access.outputs.entries()) {
                    const button = document.createElement('button');
                    button.textContent = `${o.name} ${o.id} ${o.manufacturer} ${o.type}`;
                    button.addEventListener('click', function () {
                        resolve(o);
                    }.bind(o));
                    document.body.appendChild(button);
                }
            });
        });
    }
    static getDefaultInput() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!navigator.requestMIDIAccess)
                throw new Error("Your browser does not support WebMIDI API");
            const access = yield navigator.requestMIDIAccess();
            return new Promise((resolve, reject) => {
                document.body.innerHTML = '';
                for (const [name, i] of access.inputs.entries()) {
                    const button = document.createElement('button');
                    button.textContent = `${i.name} ${i.id} ${i.manufacturer} ${i.type}`;
                    button.addEventListener('click', function () {
                        resolve(i);
                    }.bind(i));
                    document.body.appendChild(button);
                }
            });
        });
    }
}
exports.MIDIHelper = MIDIHelper;
//# sourceMappingURL=midiHelper.js.map

/***/ }),

/***/ 500:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Octotonic = void 0;
class Octotonic {
    constructor(tc, organ) {
        let j = 0;
        const stride = 60;
        const radius = 30;
        for (let i = 0; i < 48; ++i) {
            const x = (Math.floor(i / 3) + 0.5 * j) * stride + radius;
            const y = (4 - j) * stride * Math.sqrt(3) / 2;
            tc.addCircle(x, y, radius, (et) => {
                switch (et) {
                    case 'on':
                        organ.pluck(i + 30);
                        break;
                    case 'off':
                        organ.mute(i + 30);
                        break;
                }
            }, []);
            j = (j + 1) % 3;
        }
    }
}
exports.Octotonic = Octotonic;
//# sourceMappingURL=octotonic.js.map

/***/ }),

/***/ 58:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Organ = void 0;
class Organ {
    constructor(audioCtx) {
        this.audioCtx = audioCtx;
        this.pipes = [];
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
    pluck(i) {
        console.log(`Pluck: ${i}`);
        const pipe = this.pipes[i];
        const fullTime = this.audioCtx.currentTime + 0.05;
        pipe.gain.linearRampToValueAtTime(1.0, fullTime);
        pipe.gain.setTargetAtTime(0.0, fullTime, 0.5);
    }
    mute(i) {
        const pipe = this.pipes[i];
        const current = pipe.gain.value;
        const nowTime = this.audioCtx.currentTime;
        pipe.gain.cancelScheduledValues(nowTime);
        pipe.gain.setTargetAtTime(0.0, nowTime, 0.1);
    }
}
exports.Organ = Organ;
//# sourceMappingURL=organ.js.map

/***/ }),

/***/ 448:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TouchCanvas = exports.TouchLine = void 0;
const THREE = __importStar(__webpack_require__(396));
class TouchLine {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.dir = new THREE.Vector2();
        this.enableCount = 0;
        this.tmp = new THREE.Vector2();
        this.dir.copy(b);
        this.dir.sub(a);
        this.length = this.dir.length();
        this.dir.normalize();
    }
    isEnabled() {
        return this.enableCount > 0;
    }
    decrement() {
        this.enableCount--;
    }
    increment() {
        this.enableCount++;
    }
    render(ctx) {
        if (this.isEnabled()) {
            ctx.strokeStyle = '#000';
        }
        else {
            ctx.strokeStyle = '#0004';
        }
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }
    // Returns a positive number if left, negative number if right, zero if on the line
    side(p0) {
        this.tmp.copy(p0);
        this.tmp.sub(this.a);
        const len = this.tmp.dot(this.dir);
        if (len < 0 || len > this.length) {
            // Beyond the extent 
            return 0.0;
        }
        else {
            return this.dir.cross(this.tmp);
        }
    }
    near(p0) {
        this.tmp.copy(p0);
        this.tmp.sub(this.a);
        const len = this.tmp.dot(this.dir);
        if (len < 0 || len > this.length) {
            // Beyond the extent 
            return false;
        }
        else {
            return true;
        }
    }
    // Returns true if moving from p0 to p1 crosses the line.
    crosses(p0, p1) {
        if (!this.near(p0) || !this.near(p1)) {
            // We don't cross the line if either p0 or p1 are beyond the end of the line.
            return false;
        }
        const side0 = this.side(p0);
        const side1 = this.side(p1);
        if (side0 < 0 && side1 >= 0)
            return true;
        if (side0 >= 0 && side1 < 0)
            return true;
        return false;
    }
}
exports.TouchLine = TouchLine;
class TouchCircle {
    constructor(center, radius, enableSet) {
        this.center = center;
        this.radius = radius;
        this.enableSet = enableSet;
        this.tmp = new THREE.Vector2();
        this.isActive = false;
    }
    inside(p0) {
        this.tmp.copy(p0);
        this.tmp.sub(this.center);
        return this.tmp.length() < this.radius;
    }
    setActive(active) {
        if (active == this.isActive)
            return;
        this.isActive = active;
        if (active) {
            for (const l of this.enableSet) {
                l.increment();
            }
        }
        else {
            for (const l of this.enableSet) {
                l.decrement();
            }
        }
    }
    active() { return this.isActive; }
    render(ctx) {
        if (this.isActive) {
            ctx.fillStyle = '#ff08';
        }
        else {
            ctx.fillStyle = '#0004';
        }
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, -Math.PI, Math.PI);
        ctx.fill();
    }
}
class TouchCanvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentPositions = new Map();
        this.circles = [];
        this.circleCallbacks = [];
        this.lines = [];
        this.lineCallbacks = [];
        this.newPosition = new THREE.Vector2();
        this.wasActive = new Set();
        this.nowActive = new Set();
        this.latestIds = new Set();
        this.ctx = canvas.getContext('2d');
        canvas.addEventListener('touchstart', (ev) => { this.handleStart(ev); });
        canvas.addEventListener('touchend', (ev) => { this.handleEnd(ev); });
        canvas.addEventListener('touchmove', (ev) => { this.handleMove(ev); });
        this.render();
    }
    addCircle(x, y, r, h, enableSet) {
        this.circles.push(new TouchCircle(new THREE.Vector2(x, y), r, enableSet));
        this.circleCallbacks.push(h);
    }
    addLine(x0, y0, x1, y1, h) {
        const line = new TouchLine(new THREE.Vector2(x0, y0), new THREE.Vector2(x1, y1));
        this.lines.push(line);
        this.lineCallbacks.push(h);
        return line;
    }
    render() {
        if (this.canvas.width != this.canvas.clientWidth) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#deb';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (const c of this.circles) {
            c.render(this.ctx);
        }
        for (const l of this.lines) {
            l.render(this.ctx);
        }
        this.ctx.fillStyle = '#f00';
        for (const [id, p] of this.currentPositions) {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 20, -Math.PI, Math.PI);
            this.ctx.fill();
        }
        requestAnimationFrame(() => { this.render(); });
    }
    updateTouchPositions(touches) {
        this.wasActive.clear();
        this.nowActive.clear();
        for (let i = 0; i < this.circles.length; ++i) {
            const circle = this.circles[i];
            if (circle.active()) {
                this.wasActive.add(i);
            }
        }
        for (const touch of touches) {
            let touchPosition = null;
            if (this.currentPositions.has(touch.identifier)) {
                touchPosition = this.currentPositions.get(touch.identifier);
                this.newPosition.set(touch.clientX, touch.clientY);
                for (let i = 0; i < this.lines.length; ++i) {
                    const l = this.lines[i];
                    if (l.isEnabled() && l.crosses(touchPosition, this.newPosition)) {
                        console.log(`Cross ${i}`);
                        this.lineCallbacks[i]('on');
                    }
                }
                touchPosition.set(touch.clientX, touch.clientY);
            }
            else {
                touchPosition = new THREE.Vector2(touch.clientX, touch.clientY);
                this.currentPositions.set(touch.identifier, touchPosition);
            }
            for (let i = 0; i < this.circles.length; ++i) {
                const circle = this.circles[i];
                if (circle.inside(touchPosition)) {
                    this.nowActive.add(i);
                }
            }
        }
        for (const i of this.nowActive) {
            const circle = this.circles[i];
            if (!this.wasActive.has(i)) {
                circle.setActive(true);
                this.circleCallbacks[i]('on');
            }
        }
        for (const i of this.wasActive) {
            const circle = this.circles[i];
            if (!this.nowActive.has(i)) {
                circle.setActive(false);
                this.circleCallbacks[i]('off');
            }
        }
    }
    handleStart(ev) {
        ev.preventDefault();
        this.updateTouchPositions(ev.touches);
    }
    handleEnd(ev) {
        ev.preventDefault();
        this.latestIds.clear();
        for (const touch of ev.touches) {
            this.latestIds.add(touch.identifier);
        }
        const toRemove = [];
        for (const [id, p] of this.currentPositions) {
            if (!this.latestIds.has(id)) {
                toRemove.push(id);
                // Touch ended.
            }
        }
        for (const id of toRemove) {
            this.currentPositions.delete(id);
        }
        this.updateTouchPositions(ev.touches);
    }
    handleMove(ev) {
        ev.preventDefault();
        this.updateTouchPositions(ev.touches);
    }
}
exports.TouchCanvas = TouchCanvas;
//# sourceMappingURL=touchCanvas.js.map

/***/ }),

/***/ 396:
/***/ ((module) => {

module.exports = THREE;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map