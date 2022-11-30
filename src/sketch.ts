import p5 from 'p5';
import { Draggable } from './Draggable';

const sketch = (p: p5): void => {
  let shape1 : Draggable;
  let shape2 : Draggable;

  p.preload = (): void => {};

  p.setup = (): void => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    shape1 = new Draggable(100, 100, 50, 50, p);
    shape2 = new Draggable(150, 100, 50, 50, p);
  };

  p.windowResized = (): void => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = (): void => {
    p.background(0);

    // translate the brush back to 0,0
    p.translate(-p.windowWidth / 2,-p.windowHeight / 2);

    shape1.over();
    shape1.update();
    shape1.show();
    shape2.over();
    shape2.update();
    shape2.show();
  };

  p.mousePressed = ():void => {
    shape1.pressed();
    shape2.pressed();
  }

  p.mouseReleased = ():void => {
    shape1.released();
    shape2.released();
  }
};

new p5(sketch);
