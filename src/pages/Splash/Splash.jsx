import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";
import firebase from "../../utilities/firebase";
import "./Splash.scss";

const Splash = ({ setUser }) => {
	const history = useHistory();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
			if (user) {
				const userData = {
					uid: user.uid,
					name: user.displayName,
					avatar: user.photoURL
				};
				setUser(userData);
				history.push(`/dashboard/${user.uid}`);
			} else {
				history.push(`/login`);
      }
		});
	}, []);

	return (
		<div className='splash__container'>
			<ReactLoading
				type={"bubbles"}
				color={"#B65245"}
				height={"5rem"}
				width={"5rem"}
			/>
		</div>
	);
};

export default Splash;
