import * as THREE from "three";

export class TouchLine {
  private dir = new THREE.Vector2();
  private length: number;
  private enableCount = 0;
  constructor(private a: THREE.Vector2, private b: THREE.Vector2) {
    this.dir.copy(b);
    this.dir.sub(a);
    this.length = this.dir.length();
    this.dir.normalize();
  }

  isEnabled(): boolean {
    return this.enableCount > 0;
  }

  decrement() {
    this.enableCount--;
  }

  increment() {
    this.enableCount++;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.isEnabled()) {
      ctx.strokeStyle = '#000';
    } else {
      ctx.strokeStyle = '#0004'
    }
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.stroke();
  }

  private tmp = new THREE.Vector2();
  // Returns a positive number if left, negative number if right, zero if on the line

  private side(p0: THREE.Vector2): number {
    this.tmp.copy(p0);
    this.tmp.sub(this.a);
    const len = this.tmp.dot(this.dir);
    if (len < 0 || len > this.length) {
      // Beyond the extent 
      return 0.0;
    } else {
      return this.dir.cross(this.tmp);
    }
  }

  private near(p0: THREE.Vector2): boolean {
    this.tmp.copy(p0);
    this.tmp.sub(this.a);
    const len = this.tmp.dot(this.dir);
    if (len < 0 || len > this.length) {
      // Beyond the extent 
      return false;
    } else {
      return true;
    }
  }

  // Returns true if moving from p0 to p1 crosses the line.
  crosses(p0: THREE.Vector2, p1: THREE.Vector2): boolean {
    if (!this.near(p0) || !this.near(p1)) {
      // We don't cross the line if either p0 or p1 are beyond the end of the line.
      return false;
    }
    const side0 = this.side(p0);
    const side1 = this.side(p1);

    if (side0 < 0 && side1 >= 0) return true;
    if (side0 >= 0 && side1 < 0) return true;
    return false;
  }
}

class TouchCircle {
  constructor(private center: THREE.Vector2, private radius: number,
    private enableSet: TouchLine[]) { }
  private tmp = new THREE.Vector2();
  private isActive = false;

  inside(p0: THREE.Vector2): boolean {
    this.tmp.copy(p0);
    this.tmp.sub(this.center);
    return this.tmp.length() < this.radius;
  }

  setActive(active: boolean) {
    if (active == this.isActive) return;
    this.isActive = active;
    if (active) {
      for (const l of this.enableSet) {
        l.increment();
      }
    } else {
      for (const l of this.enableSet) {
        l.decrement();
      }
    }
  }

  active(): boolean { return this.isActive; }

  render(ctx: CanvasRenderingContext2D) {
    if (this.isActive) {
      ctx.fillStyle = '#ff08';
    } else {
      ctx.fillStyle = '#0004';
    }
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, -Math.PI, Math.PI);
    ctx.fill();
  }
}

export type EventType = 'on' | 'off';

export type ButtonHandler = (et: EventType) => void;

export class TouchCanvas {
  private ctx: CanvasRenderingContext2D;
  private currentPositions = new Map<number, THREE.Vector2>();

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    canvas.addEventListener('touchstart', (ev: TouchEvent) => { this.handleStart(ev) });
    canvas.addEventListener('touchend', (ev: TouchEvent) => { this.handleEnd(ev) });
    canvas.addEventListener('touchmove', (ev: TouchEvent) => { this.handleMove(ev) });
    this.render();
  }

  private circles: TouchCircle[] = [];
  private circleCallbacks: ButtonHandler[] = [];
  addCircle(x: number, y: number, r: number, h: ButtonHandler,
    enableSet: TouchLine[]) {
    this.circles.push(new TouchCircle(new THREE.Vector2(x, y), r, enableSet));
    this.circleCallbacks.push(h);
  }

  private lines: TouchLine[] = [];
  private lineCallbacks: ButtonHandler[] = [];
  addLine(x0: number, y0: number, x1: number, y1: number, h: ButtonHandler): TouchLine {
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

  private newPosition = new THREE.Vector2();
  private wasActive = new Set<number>();
  private nowActive = new Set<number>();
  private updateTouchPositions(touches: TouchList) {
    this.wasActive.clear();
    this.nowActive.clear();
    for (let i = 0; i < this.circles.length; ++i) {
      const circle = this.circles[i];
      if (circle.active()) {
        this.wasActive.add(i);
      }
    }
    for (const touch of touches) {
      let touchPosition: THREE.Vector2 = null;
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
      } else {
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


  private handleStart(ev: TouchEvent) {
    ev.preventDefault();
    this.updateTouchPositions(ev.touches);
  }

  private latestIds = new Set<number>();
  private handleEnd(ev: TouchEvent) {
    ev.preventDefault();
    this.latestIds.clear();
    for (const touch of ev.touches) {
      this.latestIds.add(touch.identifier);
    }
    const toRemove: number[] = [];
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

  private handleMove(ev: TouchEvent) {
    ev.preventDefault();
    this.updateTouchPositions(ev.touches);
  }
}