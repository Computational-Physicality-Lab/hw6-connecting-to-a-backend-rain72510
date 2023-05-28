import React from 'react';

import './homePage.css';
import banner from '../../assets/images/banner.png'

const homePage = () => {
  return (
    <>
      <div>
        <img className="fullWidth banner" src={banner} alt="Banner"/>
      </div>
      <div id="introduction" className="fullWidth flexbox" style={{backgroundColor: "white"}}>
        <div>
          <p className="introductionTitle">
            We don't ship. We're not real.
          </p>
          <p className="introductionContent">
            We sell shirts. We are passionate about selling shirts. But keep
            in mind we have no infrastructure, supply chain, or mechanism
            to actually produce these shirts or fulfill the orders. But the
            shirts will always be real in your imagination.
          </p>
        </div>
        <div>
          <p className="introductionTitle">
            Design your own shirt! But help us do that...
          </p>
          <p className="introductionContent">
            Not only do we not sell shirts, but we let you design your own!;
            Eventually. We actually kinda need your help implementing
            that. If you could build an actual paint-style interface that you
            can make designs in that would be great :)
          </p>
        </div>
      </div>
    </>
  )
};

export default homePage;