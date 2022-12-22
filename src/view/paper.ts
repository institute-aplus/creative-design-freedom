import * as paper from 'paper';
import { Project, Tool, view } from 'paper/dist/paper-core';
import { pieces } from './helpers/svgs';

declare global {
  interface Window { svgs: SVGElement[]; }
}

paper.install(window);

function importSVG(piece, project) {
  return new Promise<paper.Item>(resolve => {
    project.importSVG(piece, data => resolve(data as paper.Item))
  })
}

export default async function SetUpPaper(canvas : HTMLCanvasElement) {
  // paper.setup(canvas);
  const project = new Project(canvas);

  const puzzles = await Promise.all(pieces.map(p => importSVG(p, project)));

  puzzles.forEach((item, index) => {
    item.position = new paper.Point(50 + 200 * index, 50 + 10 * index);

  })

  view.onMouseDrag = (event) => {
    for(let p of puzzles){

      if(p.contains(event.point)) {
        p.position = new paper.Point(p.position.x + event.delta.x, p.position.y + event.delta.y);
        break;
      }
      
    }
  }



}