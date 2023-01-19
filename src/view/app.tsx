import React from 'react';
import Header from './header';
import SetUpPaper from './paper';
import PopUp from './popup';
import { concepts } from './helpers/contents';
import about from 'Assets/about.json';
import './styles.css';

export default function App() {
  const canvasRef = React.useRef();
  const [width, setWidth] = React.useState(0);
  const [popup, setPop] = React.useState(undefined);

  React.useLayoutEffect(() => {
    window.addEventListener('puzzle-correct', (e: any) => {
      console.log(e.detail);
      setPop(e.detail);
    });
  });

  React.useEffect(() => {
    SetUpPaper(canvasRef.current);
    setWidth(canvasRef.current ? width : 0);
  }, []);

  return (
    <div className="container" key={0}>
      <Header />
      {popup != undefined && <PopUp detail={popup} />}
      {/* <button>test button</button> */}
      <div className="container form">
        {/* <h1>Play Puzzle</h1> */}
        <canvas className="puzzle" ref={canvasRef}></canvas>
        <div className="contents"></div>
        <div>
          <h1>Concepts</h1>
          {Object.keys(concepts).map((key, ind) => (
            <div key={ind}>
              <a>{key}</a>
              <br />
              <a>{concepts[key]}</a>
              <br />
              <br />
            </div>
          ))}
        </div>

        <div className="about">
          <h1>About us</h1>
          {about.map((value, index) => 
            <div key={index}>
              <h2>{value['name']}</h2>
              <a>{value['intro']}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
