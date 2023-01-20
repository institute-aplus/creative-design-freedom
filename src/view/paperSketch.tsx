import * as paper from 'paper';

export default async function SetUpSketch(canvas: HTMLCanvasElement) {
  paper.setup(canvas);

  let myPath : paper.Path;

  paper.view.onMouseDown = () => {
    myPath = new paper.Path();
    myPath.style = {
      ...myPath.style,
      // fillColor: new paper.Color('black'),
      strokeColor: new paper.Color('black')
    }

    console.log("mouse down");
    // myPath.strokeColor = 'black';
  };

  paper.view.onMouseDrag = (event) => {
    const curPoint = new paper.Point(event.point.x, event.point.y + document.body.scrollTop);

    myPath.add(curPoint);
  };
}
