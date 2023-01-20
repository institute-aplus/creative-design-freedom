import React from 'react';
import SetUpSketch from './paperSketch';
import { sendSketchToEmail } from './helpers/helpers';

export default function PopUpSketch({ detail }: { detail: any }) {
  const canvasRef = React.useRef();
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('Finished');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    setShow(true);
    if (detail === 5) SetUpSketch(canvasRef.current);
  }, [detail]);

  return (
    <>
      {show && (
        <div className="popup" style={{ display: show ? 'block' : 'hidden' }}>
          <div className="right-corner">
            <div className="btn close" onClick={() => setShow(!show)}>
              X
            </div>
          </div>

          <div className="overview">
            <h1>Draw your own Freedom</h1>
          </div>
          {detail === 5 && (
            <div>
              {status !== 'Send' && (
                <canvas className="sketch" ref={canvasRef}></canvas>
              )}

              <div className="emailform">
                {status === 'Send' && (
                  <form>
                    <label>
                      <a>Send the image to your Email</a>
                      <input
                        type="text"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                      />
                    </label>
                  </form>
                )}
              </div>

              <div className="sendform">
                <div
                  className="btn border"
                  onClick={() => {
                    if (status !== 'Send') setStatus('Send');
                    else location.reload();
                  }}
                >
                  {status === 'Send' ? 'Send & End Journey' : status}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
