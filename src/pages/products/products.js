import React from 'react';

import './products.css';
import shirts from '../../shared/shirts.js';
import routing from '../../routing.js';
import { Link } from 'react-router-dom'

const products = () => {
  

  return (
    <div className="fullWidth flexbox productContent" style={{backgroundColor: 'white', width: 'calc(100vw - 16px)', marginLeft: '0'}}>
      <div>
        <p className="title">Our T-Shirts</p>
      </div>
        <div id="tshirts" className="flexbox">
        {
          shirts.map((shirt, id) => {
            let shirtImage;
            try {
              shirtImage = shirt.colors.white.front;
            } catch {
              shirtImage = shirt.default.front;
            }
            return (
              <div key={id} className="tshirt flexbox">
                <div className="flexbox">
                  <Link to={`${routing.products}/${id}`} exact="true">
                    <img src={shirtImage} alt="Show the tshirt."/>
                  </Link>
                </div>
                <div className="tshirtDetail flexbox" style={{flexDirection: "column"}}>
                  <div>
                  <p className="tshirtName wordWrap">{shirt.name}</p>
                  </div>
                  <div>
                    <p className="tshirtAvailable">Available in {Object.keys(shirt.colors).length + (Object.keys(shirt.colors).length === 1? ' color':' colors')}</p>
                  </div>
                  <div className="flexbox">
                    <Link className="tshirtBtn flexbox" to={`${routing.products}/${id}`} exact="true">
                      See Page
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
};

export default products;