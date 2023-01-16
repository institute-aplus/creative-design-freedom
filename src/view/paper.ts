import * as paper from 'paper';
import { Project, Tool, view } from 'paper/dist/paper-core';
import { pieces, positions } from './helpers/svgs';

declare global {
  interface Window { svgs: SVGElement[]; }
}

// install paper to the global environment
// this will pollute the environment
// might not be a good idea;
// paper.install(window);

function importSVG(piece : SVGElement) {
  return new Promise<paper.Item>(resolve => {
    paper.project.importSVG(piece, (data : paper.Item) => resolve(data as paper.Item))
  })
}

function dist(p1 : paper.Point, p2 : paper.Point) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

export default async function SetUpPaper(canvas : HTMLCanvasElement) {

  // these two seem like doing the same thing
  // not sure what are the differences
  // need investigate
  paper.setup(canvas)
  // const project : paper.Project = new paper.Project(canvas);

  const spaces : paper.Item[] = await Promise.all(pieces.map(p => importSVG(p)));
  const puzzles : paper.Item[] = await Promise.all(pieces.map(p => importSVG(p)));
  

  puzzles.forEach((item, index) => {
    item.position = new paper.Point(50 + 200 * index, 50 + 10 * index);
    // item.idx = index;
    console.log(item.id);
  })

  
  spaces.forEach((item, index) => {
    item.position = new paper.Point(positions[index][0] + 300, positions[index][1] + 100);
    item.style = {
      ...item.style,
      fillColor: new paper.Color('white'),
      strokeColor: new paper.Color('red'),
      strokeWidth: 1
  };
    // item.idx = index;
  })
  


  paper.view.onMouseDrag = (event : paper.MouseEvent) => {

    let c = 0;
    for(let p of puzzles){
      if(p.contains(event.point)) {
        p.position = new paper.Point(p.position.x + event.delta.x, p.position.y + event.delta.y);
        break;
      }

      if (dist(spaces[p.id].position, p.position) < 100) {
        p.position = spaces[p.id].position;
        puzzles.slice(p.id, 1);
      }

      c++;
    }

  }



}