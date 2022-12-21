import * as paper from 'paper';
import piece1 from 'Assets/Piece1Ji.svg'

export default function SetUpPaper(canvas : HTMLCanvasElement) {
    paper.setup(canvas);
    paper.project.importSVG(piece1);

}