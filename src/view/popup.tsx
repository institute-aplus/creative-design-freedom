import React from 'react';
import { sources } from './helpers/contents';

export default function PopUp({ detail }: { detail: any }) {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    setShow(true);
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
            <h1>{sources[detail]['name']}</h1>

            <div className="cover-image">
              <img
                src={sources[detail]['image']}
                style={{
                  maxHeight: '200px',
                  alignSelf: 'center',
                  padding: '2%',
                }}
              ></img>
              <a
                dangerouslySetInnerHTML={{
                  __html: sources[detail]['statement'],
                }}
              ></a>
            </div>
            {/* <br /> */}
          </div>
        </div>
      )}
    </>
  );
}
