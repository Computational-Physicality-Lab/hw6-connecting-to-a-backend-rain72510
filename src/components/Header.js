import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import './Header.css';
import { Link } from 'react-router-dom'
import routing from '../routing.js';

import cart from "../assets/images/cart.png";
import logo from "../assets/images/logo.png";

class Cart extends React.Component {
  render () {
    console.log("here")
    return (
      <Link className="flexbox shoppingCart" to={routing.cart}>
        <img src={cart} alt="Shooping-Cart"></img>
        <p> {this.props.cart_cnt} </p>
      </Link>
    );
  }
}



function Header () {
  
  const [tshirtCnt, setTshirtCnt] = useState(0);
  const changeCntHandler = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cnt = 0;
    cartItems.map((tshirt) => {
      cnt += Number(tshirt.quantity);
      return null;
    })
    setTshirtCnt(cnt);
  }
  window.addEventListener('changeCnt', changeCntHandler);
  window.addEventListener('storage', changeCntHandler);
  window.onload = () => {
    changeCntHandler();
  }

  return (
    <div className="flexbox header">
      <Link to={routing.home} exact="true">
        <img className="logo" src={logo} alt="Logo"></img>
      </Link>
      <div>
        <p className="title">Scotty Shirts U Illustrate (SSUI)</p>
      </div>
      <Cart cart_cnt={tshirtCnt}/>
    </div>
  );
}

export default Header;