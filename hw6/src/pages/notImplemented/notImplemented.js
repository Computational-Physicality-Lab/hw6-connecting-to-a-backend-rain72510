
import React from "react";
import scotty from '../../assets/images/scotty.png'

import './notImplemented.css'

const notImplemented = () => {
  return (
    <div className="flexbox" style={{backgroundColor: "white", flexDirection: "column"}}>
      <img id="notImplementedScotty" src={scotty} alt="A cute dooog"/>
      <p id="notImplementedText">Oops, this page doesn't exist yet... how about a shirt from the last page?</p>
    </div>
  );
}

export default notImplemented;