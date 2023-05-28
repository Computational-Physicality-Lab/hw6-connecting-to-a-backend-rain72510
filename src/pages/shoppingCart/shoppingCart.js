import React, { useEffect, useState } from "react";
import './shoppingCart.css'

import baseShirt from "../../assets/images/shirt-base.png";
import shirts from '../../shared/shirts.js';

import routing from '../../routing.js';

import { Link } from 'react-router-dom'

class Title extends React.Component {
  render () {
    return (
      <div>
        <p className="title" style={{fontWeight: "500", marginLeft: "7vw"}}>My Cart ({this.props.itemNumber})</p>
      </div>
    )
  }
}

class CartItem extends React.Component {
  changeQuantity = (v) => {
    this.props.changeQuantity(this.props.index, v);
  }

  removeItem = () => {
    this.props.removeItem(this.props.index);
  }

  render () {
    const tshirt = this.props.tshirt;
    const quantityList = Array(20).fill().map((_, i) => {
      return (
        <option key={i} value={i+1}>{i+1}</option>
      )
    })
    let tshirtImage;
    try {
      tshirtImage = shirts[tshirt.id].colors[`${tshirt.color}`].front;
    } catch {
      tshirtImage = baseShirt
    }
    return (
      <div className="cartItem flexbox" style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <div>
          <p className="tshirtName" style={{color: "black", marginLeft: "-1.5vw", fontWeight: "100"}}>
            {(shirts[tshirt.id] || tshirt).name}
          </p>
        </div>
        <div className="flexbox" style={{width: "100%", justifyContent: "flex-start"}}>
          <Link to={`${routing.products}/${tshirt.id}`} exact="true" style={{margin: "0", width: "40%"}}>
            <img src={tshirtImage} style={{width: "100%"}} alt="Shirt"></img>
						{tshirt.id === undefined?
							<img src={tshirt.puttedImg} alt="The tshirt based you choosed." style={{position: "relative", left: "6.5vw", top: "-15vw", width: "7vw"}}></img>:
							<></>
						}
          </Link>
          <div className="flexbox cartItemDesc" style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", margin: "2vw"}}>
            <div className="flexbox select">
              <div>
                <p>Quantity:</p>
              </div>
              <div>
                <select value={tshirt.quantity} className="quantityDropdown textMedium" onChange={(e) => {this.changeQuantity(e.target.value);}}>
                  {quantityList}
                </select>
              </div>
            </div>
						{tshirt && tshirt.color && tshirt.color[0] ? 
							<div className="flexbox select">
								<div>
									<p>Color:</p>
								</div>
								<div>
										<p className="description">{tshirt.color[0].toUpperCase() + (tshirt || {}).color.slice(1)}</p> 
								</div>
							</div>:
							<></>
						}
            <div className="flexbox select">
              <div>
                <p>Size:</p>
              </div>
              <div>
                <p className="description">{(tshirt || {}).size}</p>
              </div>
            </div>
            <div className="flexbox select">
              <div>
                <p>Price (each):</p>
              </div>
              <div>
                <p className="description">{(shirts[tshirt.id] || {price: 20}).price}</p>
              </div>
            </div>
            <div className="flexbox select">
              <div className="flexbox">
                <button className="tshirtBtn detailBtn flexbox" type="button" onClick={() => {this.removeItem()}}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class Fee extends React.Component {
  render () {
    return (
      <div className="flexbox" style={{width: "100%", flexDirection: "column", alignItems: "flex-start"}}>
        <div style={{marginBottom: "1vw"}}>
          <p style={{fontSize: "larger"}}>Order Summary</p>
        </div>
        <div style={{width: "100%"}}>
          <div className="flexbox" style={{width: "100%", justifyContent: "space-between"}}>
            <p>Subtotal:</p>
            <p className="description" style={{paddingRight: "1vw"}}>${this.props.fee}</p>
          </div>
          <div className="flexbox" style={{width: "100%", justifyContent: "space-between"}}>
            <p>Est. Shipping:</p>
            <p className="description" style={{paddingRight: "1vw"}}>$9527</p>
          </div>
          <div className="flexbox" style={{width: "100%", justifyContent: "space-between"}}>
            <p style={{fontSize: "large"}}>Total:</p>
            <p className="description feeTotalDollar" style={{fontSize: "large", paddingRight: "1vw"}}>${Number(this.props.fee) + Number(9527)}</p>
          </div>
        </div>
        <div className="flexbox select" style={{width: "100%", justifyContent: "center"}}>
          <div className="flexbox">
            <Link to={routing.notImplemented} className="tshirtBtn detailBtn flexbox" type="button">Sign in and Checkout</Link>
          </div>
        </div>
      </div>
    )
  }
}

const Cart = () => {

  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [tshirtCnt, setTshirtCnt] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  const changeQuantity = (id, v) => {
    setCartItems([...cartItems.slice(0, id), {...cartItems[id], quantity: v,}, ...cartItems.slice(id + 1)])
  }

  const removeItem = (id) => {
    setCartItems([...cartItems.slice(0, id), ...cartItems.slice(id + 1)]);
  }

  var cartItemsRender;
  const cartItemsRerender = (cartItems) => {
    var cnt = 0;
    var fee = 0;
    const cartItemsMaker = () => {
      return cartItems.map((tshirt, index) => {
        cnt += Number(tshirt.quantity);
				if (shirts[tshirt.id] && shirts[tshirt.id].price) {
          fee += Number(tshirt.quantity) * Number(shirts[tshirt.id].price.slice(1));
        }
				if (tshirt.id === undefined) {
					// console.log(tshirt);
					fee += 20 * tshirt.quantity;
				}
				// console.log(tshirt)
        return (
          <CartItem key={index} tshirt={tshirt} index={index} changeQuantity={changeQuantity} removeItem={removeItem}/>
        )
      })
    }
    const ret = cartItemsMaker();
    setTshirtCnt(cnt);
    setTotalFee(fee.toFixed(2));
    return ret;
  }
  window.addEventListener('storage', () => {
    setCartItems(JSON.parse(localStorage.getItem('cartItems')) || []);
    cartItemsRender = cartItemsRerender(cartItems);
  });

  cartItemsRender = cartItems.map((tshirt, index) => {
    return (
      <CartItem key={index} tshirt={tshirt} index={index} changeQuantity={changeQuantity} removeItem={removeItem}/>
    )
  });

  const changeCnt = new Event('changeCnt');
  
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    window.dispatchEvent(changeCnt);
    cartItemsRender = cartItemsRerender(cartItems);
  }, [cartItems])

  return (
    <div className="flexbox fullWidth productContent" style={{backgroundColor: "white", flexDirection: "column"}}>
      <Title itemNumber={tshirtCnt} className="detailTitle flexbox"/>
      <div className="flexbox" style={{alignItems: "flex-start"}}>
        <div className="flexbox cartItems" style={{flexDirection: "column"}}>
          {cartItems.length === 0?
            <p style={{width: "100%", paddingLeft: "2vw", fontSize: "calc(20px + 0.5vw)"}}>
              Your Cart is Empty
            </p>
          :cartItemsRender.slice(0).reverse()}
        </div>
        <div>
          <div className="flexbox fee">
            <Fee fee={totalFee}/>
          </div>
          <div className="flexbox select" style={{width: "100%", justifyContent: "center", marginTop: "2vw"}}>
            <div className="flexbox">
              <Link to={routing.products}
                className="tshirtBtn detailBtn flexbox"
                type="button"
                style={{paddingLeft: "3vw", paddingRight: "3vw"}}
                exact={true}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;
