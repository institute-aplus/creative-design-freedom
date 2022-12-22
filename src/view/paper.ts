import * as paper from 'paper';
import { Project, Tool, view } from 'paper/dist/paper-core';
import { pieces } from './helpers/svgs';

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

export default async function SetUpPaper(canvas : HTMLCanvasElement) {

  // these two seem like doing the same thing
  // not sure what are the differences
  // need investigate
  paper.setup(canvas)
  // const project : paper.Project = new paper.Project(canvas);

  const puzzles : paper.Item[] = await Promise.all(pieces.map(p => importSVG(p)));

  puzzles.forEach((item, index) => {
    item.position = new paper.Point(50 + 200 * index, 50 + 10 * index);
  })

  paper.view.onMouseDrag = (event : paper.MouseEvent) => {

    for(let p of puzzles){
      if(p.contains(event.point)) {
        p.position = new paper.Point(p.position.x + event.delta.x, p.position.y + event.delta.y);
        break;
      }
    }
  }



}