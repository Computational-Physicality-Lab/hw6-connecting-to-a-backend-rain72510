
import React from "react";
import GoogleLogo from "../../assets/images/google-logo.png";

import "./logIn.css";

const LogIn = (props) => {
	const user = props.user;
	const logInGoogle = props.logInGoogle;
	const logOutGoogle = props.logOutGoogle;
	console.log('user: ', user);

	return (
		<div className="fullWidth flexbox" style={{backgroundColor: "white", height: "20vw"}}>
			{user? 
				<button
					className="logInButton"
					style={{backgroundColor: "white", cursor: "pointer", borderRadius: "2px"}}
					onClick={(e) => {logOutGoogle(e)}}
				>
					<div className="flexbox">
						<p>
							Log Out as {user.displayName}
						</p>
					</div>
				</button>
				:
				<button
					className="logInButton"
					style={{backgroundColor: "white", cursor: "pointer", borderRadius: "2px"}}
					onClick={(e) => {logInGoogle(e)}}
				>
					<div className="flexbox">
						<div style={{margin: "4px"}}>
							<img src={GoogleLogo} alt="google" style={{height: "25px"}}/>
						</div>
						<div>
							<p>
								Log In with Google
							</p>
						</div>
					</div>
				</button>
			}
			{/* <div>
				{user ? (
					<p>User is logged in: {user.email}</p>
				) : (
					<p>User is not logged in.</p>
				)}
			</div> */}
			
		</div>
	)
}

export default LogIn;