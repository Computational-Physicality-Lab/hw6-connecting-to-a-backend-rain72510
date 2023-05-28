import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import routing from '../../routing.js';
import baseShirt from "../../assets/images/shirt-base.png";

import './createFromPicture.css';
// import firebase from '../../firebase.js';

import secret from '../../secret.js';

import { makeid } from '../../util.js';

// import testImages from '../../tempResults.json';

const ACCESS_KEY=secret.Unsplash_ACCESS_KEY;

const CreateFromPicture = (props) => {

	let [quantity, setQuantity] = useState('1');
  let [size, setSize] = useState('Size:');
	let [linkStyle, setLinkStyle] = useState({
    backgroundColor: "#8d8d8d",
    cursor: "default",
    pointerEvents: "none",
  });
	let [textInput, setTextInput] = useState((localStorage.getItem("cartItemName") || ''));
	let [images, setImages] = useState((JSON.parse(localStorage.getItem("imgList")) || []));
	let [imgList, setImgList] = useState([]);
	let [puttedImg, setPuttedImg] = useState(null);
	let [cartItem, setCartItem] = useState(null);
	let [numberPage, setNumberPage] = useState(0);

	const user = props.user;
	const updateStorage = props.updateStorage;
	// if (tshirt.price !== undefined) {
	if (true) {
    useEffect(() => {
    if ((size !== "Size:") && (puttedImg !== null) && (user !== null)) {
        setLinkStyle({
  
        })
        return;
      } else {
        setLinkStyle({
          backgroundColor: "#8d8d8d",
          cursor: "default",
          pointerEvents: "none",
        })
      }
    }, [size, puttedImg, user]);
  }


	const quantityList = Array(20).fill().map((_, i) => {
    return (
      <option key={i} value={i+1} className='textMedium'>{i+1}</option>
    )
  })

  const sizeList = [
    "Size:",
    "Women's XS",
    "Women's S",
    "Women's M",
    "Women's L",
    "Women's XL",
    "Women's 2XL",
    "Men's XS",
    "Men's S",
    "Men's M",
    "Men's L",
    "Men's XL",
    "Men's 2XL",
  ].map((size, i) => {
    return (
      <option key={i} value={size} className='textMedium'>{size}</option>
    )
  })

  const changeCnt = new Event('changeCnt');

	const sendQuery = (e) => {
		// console.log(`https://api.unsplash.com/search/photos?query=${textInput}`);
		fetch(`https://api.unsplash.com/search/photos?query=${textInput}&page=${numberPage + 1}`, {
			headers: {
				Authorization: `Client-ID ${ACCESS_KEY}`,
			}
		})
		.then(res => {
			return res.json();

		})
		.then(data => {
			console.log(numberPage)
			if (numberPage > 0) {
				console.log('images.results', images.results)
				const curImagesResults = images.results.concat(data.results);
				setImages({...images, "results": curImagesResults});
				console.log('length', curImagesResults.length)
			}
			else {
				setImages(data);
			}

		})
		.catch(error => {
			// Handle any errors that occurred during the request
			console.log('Error:', error);
		});
		localStorage.setItem("cartItemName", textInput);
		// setImages(testImages);
	}

	const putImg = (src) => {
		setPuttedImg(src);
		console.log("click!");
	}

	useEffect(() => {
		setCartItem({
			"name": `${localStorage.getItem("cartItemName")}`,
			"puttedImg": puttedImg,
			"quantity": quantity,
			"size": size,
		});
	}, [puttedImg, quantity, size])
	
	useEffect(() =>{
		console.log(images);
		
		setImgList((images.results || []).map((imgItem, k) => {
			return (
				<img className='searchResultImg' key={k} src={imgItem.urls.thumb} alt={imgItem.description} onClick={() => {putImg(imgItem.urls.thumb)}}></img>
			)
		}));
		localStorage.setItem("imgList", JSON.stringify(images));
	}, [images]);


	return (
		<div className="fullWidth flexbox productContent" style={{backgroundColor: "white"}}>
      <div className="fullWidth flexbox whiteBackground shirtDetail" style={{backgroundColor: "white", flexWrap: "nowrap"}}>
				<div className="flexbox whiteBackground" style={{flexDirection: "column", marginLeft: "10vw"}}>
					<div style={{marginTop: "5vw", height: "20vw"}}>
						<img src={baseShirt} alt="The tshirt based you choosed." style={{width: "20vw"}}/>
						{puttedImg === null?
							<></>:
							<img src={puttedImg} alt="The tshirt based you choosed." style={{position: "relative", left: "6.5vw", top: "-15vw", width: "7vw"}}></img>
						}
					</div>
					<div className="details" style={{width: "20vw"}}>
						<div>
							<p className="price">{'$20.00'}</p>
						</div>

						<div className="flexbox select">
							<div>
								<p>Quantity:</p>
							</div>
							<div>
								<select value={quantity} className="quantityDropdown textMedium" onChange={(e) => {setQuantity(e.target.value);}}>
									{quantityList}
								</select>
							</div>
						</div>

						<div className="flexbox select">
							<div>
								<p>Size:</p>
							</div>
							<div>
								<select value={size} className="quantityDropdown textMedium" onChange={(e) => {setSize(e.target.value);}}>
									{sizeList}
								</select>
							</div>
						</div>

						<div className="flexbox select">
							<div className="flexbox">
								<Link className="tshirtBtn detailBtn flexbox disableBtn"
									type="button"
									style={linkStyle}
									onClick={() => {
										const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
										const itemId = makeid(32);
										cartItem = {...cartItem, "itemId": itemId}
										cartItems.push(cartItem);
										updateStorage(cartItems);
										// cartItems.push('a');
										localStorage.setItem('cartItems', JSON.stringify(cartItems));
										window.dispatchEvent(changeCnt);
									}}
									to={routing.cart}
									exact="true"
								>
									Add To Cart
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="flexbox" style={{flexDirection: "column"}}>
					<div className='flexbox textSearchRegion'>
						<div className="flexbox" style={{alignItems: "stretch"}}>
							<input 
								className='textSearch'
								value={textInput}
								onChange={(e) => {
									setTextInput(e.target.value)
								}}
								placeholder='Search for pictures.'
							/>
						</div>
						<div className="flexbox" style={{alignItems: "stretch"}}>
							<button
								className='textSearchButton'
								onClick={(e) => {
									sendQuery(e);
									setNumberPage(1);
								}}
							>
								Search
							</button>
						</div>
					</div>
						{imgList.length === 0? 
							<p>No Results</p>
							:
							<div className='searchResult flexbox'>
								<div>
									{imgList}
								</div>
								<button
									className='textSearchButton'
									onClick={(e) => {
										sendQuery(e);
										setNumberPage(numberPage + 1);
									}}
								>
									Diplay More
								</button>
							</div>
						}
				</div>
      </div>
    </div>
	)
}


export default CreateFromPicture;