import * as paper from 'paper';
import { pieces, positions, symbols } from './helpers/svgs';
import { loadSvg } from './helpers/svg';

declare global {
  interface Window {
    svgs: string[];
  }
}

// install paper to the global environment
// this will pollute the environment
// might not be a good idea;
// paper.install(window);

function importSVG(piece: string) {
  return new Promise<paper.Item>(resolve => {
    paper.project.importSVG(piece, (data: paper.Item) =>
      resolve(data as paper.Item),
    );
  });
}

function importSVGasPath(piece: string) {
  return new Promise<paper.Path>(resolve => {
    loadSvg(piece).then(svg => {
      const pathNodes = svg.querySelectorAll('path');
      // console.log(pathNodes, piece)
      const nodelist = Array.from(pathNodes);
      const pitem = new paper.Path();
      for (let pathNode of nodelist) {
        const d = pathNode.getAttribute('d');
        const t = new paper.Path(d);
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
  // paper.project.view.translate(new paper.Point(0, -100))
  // paper.project.view.autoUpdate = true;

  const spaces: paper.Item[] = await Promise.all(pieces.map(p => importSVG(p)));
  const puzzles: paper.Item[] = await Promise.all(
    pieces.map(p => importSVG(p)),
  );
  const puzzleSymbols: any[] = [];
  const scale = 1;

  puzzles.forEach((item, index) => {
    if(index === 5) {
      item.position = new paper.Point(-500, -500);
      return
    }

    item.position = new paper.Point(
      100 + Math.random() * ( paper.project.view.size.width - 200),
      100 + Math.random() * ( paper.project.view.size.height - 200),
    );

    item.scale(scale);

    item.style = {
      ...item.style,
      fillColor: new paper.Color('black'),
    };

    if (symbols[index]) {
      // console.log(item)
      let raster: paper.Raster = new paper.Raster(symbols[index]);

      let symbol = new paper.SymbolItem(raster);
      // item.addChild(symbol)
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
    console.log(event.point);
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
    // console.log(event.point);
    const curPoint = new paper.Point(event.point.x, event.point.y + document.body.scrollTop);

    for (let p of puzzles) {
      if (!usedPuzzle.includes(p.id)) {
        if (p.contains(curPoint)) {
          // console.log(event.point, p.position, p.bounds);
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
    // console.log(document.body.scrollTop);

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

        window.dispatchEvent(
          new CustomEvent('puzzle-correct', { detail: select.id } as any),
        );
        select = undefined;

        if(usedPuzzle.length === 5) puzzles[5].position = new paper.Point(700, 300);

      }
    }
  };
}
