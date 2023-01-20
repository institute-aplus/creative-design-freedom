import React from 'react';
import Header from './header';
import SetUpPaper from './paper';
import PopUp from './popup';
import PopUpSketch from './popupSketch';
import { concepts } from './helpers/contents';
import about from 'Assets/about.json';
import './styles.css';
import Footer from './footer';

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
      {popup != undefined && popup < 5 && <PopUp detail={popup} />}
      {popup === 5 && <PopUpSketch detail={popup} />}
      <div className="container form">
        <canvas className="puzzle" ref={canvasRef}></canvas>
        <div className="contents"></div>
        <br/>
        <br/>
        <div id="concept">
          <h1>Concepts</h1>
          {Object.keys(concepts).map((key, ind) => (
            <div key={ind}>
              <h2>{key}</h2>
              <br />
              <a>{concepts[key]}</a>
              <br />
              <br />
            </div>
          ))}
        </div>

        <div className="about" id="aboutus">
          <h1>About us</h1>
          {about.map((value : any, index : number) => 
            <div key={index}>
              <h2>{value['name']}</h2>
              <a>{value['intro']}</a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
