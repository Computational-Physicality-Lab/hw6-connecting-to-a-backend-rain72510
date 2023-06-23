
import './App.css';

import Header from './components/Header.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import routing from './routing.js';
import React, { useEffect, useState } from "react";


import { GoogleAuthProvider, signInWithPopup, getAuth, signOut } from "firebase/auth";

import HomePage from './pages/homePage/homePage.js'
import Products from './pages/products/products.js'
import NotImplemented from './pages/notImplemented/notImplemented.js'
import NavBar from './components/Navigator.js'
import Footer from './components/Footer.js'
import Detail from './pages/details/details.js'
import Cart from './pages/shoppingCart/shoppingCart.js'
import CreateFromPicture from './pages/createFromPicture/createFromPicture.js';
import LogIn from './pages/logIn/logIn.js';

import { myFirebase, db } from './firebase.js';
import { onValue, set, ref } from 'firebase/database';

function App() {
	const [user, setUser] = useState(null);
	const provider = new GoogleAuthProvider();
	const auth = getAuth();
	const navigate = useNavigate();
	
	console.log('db: ', db);


	const logInGoogle = (e) => {
		provider.addScope('profile');
		provider.addScope('email');
		console.log(provider);
		signInWithPopup(auth, provider).then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			// const token = credential.accessToken;
			// const user = result.user;
			navigate(routing.home);
		}).catch((e) => {
			console.log("Error: ", e);
		});
	}
	const logOutGoogle = (e) => {
		signOut(auth)
		.then(() => {
			console.log('signed out');
		}).catch((e) => {
			console.log(e);
		})
	}

	const updateLocal = () => {
		if (user) {
			// userStorageRef = ref(storage, `${user.uid}/shoppingCart`)
			onValue(
				ref(db, `${user.uid}/`),
				(snap) => {
					localStorage.setItem("cartItems", snap.val().JSON());
				}
			)
		}
		else {
			console.log("updateLocal: No User");
		}
	}

	const updateStorage = (cart) => {
		if (user) {
			set(
				ref(db, `${user.uid}/`),
				cart
			)
		}
		else {
			console.log("UpdateStorage: No User");
		}
	}

	useEffect(() => {
		// updateLocal();
	}, [user])

	useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

	useEffect(() => {
    const handleTabClose = e => {
			localStorage.removeItem("imgList");
			localStorage.removeItem("cartItemName");
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div className='background'>
			<Header/>
			<NavBar user={user}/>
			<Routes>
				<Route exact="true" path={routing.home} element={<HomePage/>}/>
				<Route exact="true" path={routing.products} element={<Products/>}/>
				<Route exact="true" path={routing.notImplemented} element={<NotImplemented/>}/>
				<Route exact="true" path={`${routing.products}/:id`} element={<Detail/>}/>
				<Route exact="true" path={routing.cart} element={<Cart/>}/>
				<Route exact="true" path={routing.createFromPicture} element={<CreateFromPicture user={user} updateStorage={(cart) => updateStorage(cart)}/>}/>
				<Route exact="true" path={routing.logIn} element={<LogIn user={user} logInGoogle={logInGoogle} logOutGoogle={logOutGoogle}/>}/>
			</Routes>
			<Footer/>
    </div>
  );
}

export default App;
