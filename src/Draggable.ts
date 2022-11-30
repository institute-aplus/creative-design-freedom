// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

import p5 from 'p5';

export class Draggable {

  p: p5;
  dragging: boolean;
  rollover: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  angle: number;
  offsetX: number;
  offsetY: number;

  constructor(x : number, y: number, w: number, h: number, angle: number, p: p5) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.angle = angle;
    this.p = p;
  }

  over() {
    // Is mouse over object
    if (this.p.mouseX > this.x && this.p.mouseX < this.x + this.w && this.p.mouseY > this.y && this.p.mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = this.p.mouseX + this.offsetX;
      this.y = this.p.mouseY + this.offsetY;
    }
  }

  show() {
    this.p.stroke(0);
    // Different fill based on state
    if (this.dragging) {
      this.p.fill(50);
    } else if (this.rollover) {
      this.p.fill(100);
    } else {
      this.p.fill(175, 200);
    }
    this.p.rotate(this.angle);
    this.p.rect(this.x, this.y, this.w, this.h);
    this.p.rotate(-this.angle);
  }

  pressed() {
    // Did I click on the rectangle?
    if (this.p.mouseX > this.x && this.p.mouseX < this.x + this.w && this.p.mouseY > this.y && this.p.mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - this.p.mouseX;
      this.offsetY = this.y - this.p.mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}