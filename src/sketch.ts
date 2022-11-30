import p5 from 'p5';
import { Draggable } from './Draggable';

const sketch = (p: p5): void => {

  let triangle : Draggable;
  let longRect: Draggable;

  let allShapes : Draggable[] = [];

  p.preload = (): void => {};

  p.setup = (): void => {
    
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    for(let i : number = 0; i < 7; i++) { // vertical
      let rect = new Draggable(100 + i * 10, 100 + i * 10, 100, 20, 0, p);
      allShapes.push(rect);
    }

    for(let i: number = 0; i < 4; i++) { // horizontal
      let rect = new Draggable(150+ i * 10, 100+ i * 10, 20, 100, 0, p);  
      allShapes.push(rect);
    }
    longRect = new Draggable(90, 90, 20, 150, 0, p);
    allShapes.push(longRect);
    triangle = new Draggable(600, 600, 10, 50, 0, p);
    allShapes.push(triangle);
  };

  p.windowResized = (): void => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = (): void => {
    p.background(100);

    // translate the brush back to 0,0
    p.translate(-p.windowWidth / 2,-p.windowHeight / 2);

    for(let shape of allShapes) {
      shape.over();
      shape.update();
      shape.show();
    }

  };

  p.mousePressed = ():void => {
    for(let shape of allShapes) {
      shape.pressed();
    }
  }

  p.mouseReleased = ():void => {
    for(let shape of allShapes) {
      shape.released();
    }
  }
};

new p5(sketch);
