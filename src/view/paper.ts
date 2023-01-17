import * as paper from 'paper';
import { Project, Path, Color, Size, SymbolItem } from 'paper/dist/paper-core';
import { pieces, positions, symbols } from './helpers/svgs';
import { getPath, loadSvg } from './helpers/svg';

declare global {
  interface Window {
    svgs: string[];
  }
}

// install paper to the global environment
// this will pollute the environment
// might not be a good idea;
// paper.install(window);

function importSVG(piece : string) {
  return new Promise<paper.Item>(resolve => {
    paper.project.importSVG(piece, (data : paper.Item) => resolve(data as paper.Item))
  })
}

function importSVGasPath(piece: string) {
  return new Promise<paper.Path>(resolve => {
    loadSvg(piece).then(svg => {
      const pathNodes = svg.querySelectorAll('path');
      // console.log(pathNodes, piece)
      const nodelist = Array.from(pathNodes);
      const pitem = new Path();
      for (let pathNode of nodelist) {
        const d = pathNode.getAttribute('d');
        const t = new Path(d);
        pitem.addSegments(t.segments);
      }
      // pitem.scale(0.1);
      resolve(pitem);
    });
    // resolve(pitem);
  });
}

function dist(p1: paper.Point, p2: paper.Point) {
  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
}

const usedPuzzle = [];
let select;

export default async function SetUpPaper(canvas: HTMLCanvasElement) {
  // these two seem like doing the same thing
  // not sure what are the differences
  // need investigate
  // new Project(canvas);
  paper.setup(canvas);
  

  const project: paper.Project = new Project(canvas);
  console.log(project.view.size);


  const spaces: paper.Path[] = await Promise.all(
    pieces.map(p => importSVGasPath(p)),
  );
  const puzzles: paper.Path[] = await Promise.all(
    pieces.map(p => importSVGasPath(p)),
  );
  const puzzleSymbols: any[] = [];
  const scale = 0.001 * project.view.size.width;

  puzzles.forEach((item, index) => {
    // item.position = new paper.Point(100 + 150 * index, 100 + 10 * index);
    item.position = new paper.Point(
      100 + Math.random() * (canvas.width - 100),
      100 + Math.random() * (canvas.height - 100),
    );

    item.scale(scale);

    item.style = {
      ...item.style,
      fillColor: new paper.Color('black'),
    };

    if (symbols[index]) {
      // console.log(item)
      let raster: paper.Raster = new paper.Raster(symbols[index]);

      let symbol = new SymbolItem(raster);
      symbol.position = item.position;
      symbol.scale(scale);
      puzzleSymbols.push(symbol);
    }
  });

  spaces.forEach((item, index) => {
    item.position = new paper.Point(
      (positions[index][0] + 300) * scale,
      (positions[index][1] + 100) * scale,
    );
    item.style = {
      ...item.style,
      fillColor: new paper.Color('white'),
      strokeColor: new paper.Color('white'),
      strokeWidth: 1,
    };

    item.scale(scale);

    // item.idx = index;
  });

  paper.view.onFrame = event => {
    // for (var i = 0; i < project.activeLayer.children.length; i++) {
    //     var item = project.activeLayer.children[i];
    //     item.position.y += item.bounds.height / 80;
    //     if (item.bounds.bottom > paper.view.size.height) {
    //         item.position.y = -item.bounds.height;
    //     }
    // }
  };
  paper.view.onResize = () => {
    paper.view.scale(canvas.width / window.innerWidth);
  };

  paper.view.onMouseEnter = event => {
    let c = 0;
    for (let p of puzzles) {
      if (!usedPuzzle.includes(p.id)) {
        if (p.contains(event.point)) {
          select = {
            item: p,
            id: c,
          };
        }
      }
      c++;
    }
  };

  paper.view.onClick = event => {
    let c = 0;
    for (let p of puzzles) {
      if (!usedPuzzle.includes(p.id)) {
        if (p.contains(event.point)) {
          select = {
            item: p,
            id: c,
          };
        }
      }
      c++;
    }
  };

  paper.view.onMouseDrag = (event: paper.MouseEvent) => {
    if (!select) return;
    const p = select.item;
    if (!usedPuzzle.includes(p.id)) {
      p.position = new paper.Point(
        p.position.x + event.delta.x,
        p.position.y + event.delta.y,
      );
      if (puzzleSymbols[select.id])
        puzzleSymbols[select.id].position = p.position;
      if (dist(spaces[select.id].position, p.position) < 100) {
        p.position = spaces[select.id].position;
        if (puzzleSymbols[select.id])
          puzzleSymbols[select.id].position = p.position;
        usedPuzzle.push(p.id);
        select = undefined;
      }
    }
  };

}
