import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Switch, Route, useHistory } from "react-router-dom";
import firebase from "../utilities/firebase";
import { Dashboard, Perform } from ".";
import usePrevious from "../utilities/utilities";

function Navigator({ user }) {
	const [userData, setUserData] = useState({});
	const history = useHistory();
	const previousUser = usePrevious(user);

	const getUserData = async (userProp) => {
		const allUsers = await firebase.firestore().collection("users");
		const currentUser = await allUsers
			.where("uid", "==", `${userProp.uid}`)
			.get();
		if (
			!!(currentUser.empty & (userProp | (typeof previousUser !== "undefined")))
		) {
			allUsers.add({
				uid: userProp.uid || previousUser.uid,
				performanceData: [] || previousUser.performanceData,
				settings: { defaultPage: "dashboard" } || previousUser.settings
			});
			history.push(`/${user.urlName}/dashboard`);
		} else {
			if (currentUser.docs.length === 1) {
				currentUser.forEach((userDoc) => {
					const userDocData = userDoc.data();
					setUserData(userDocData);
					history.push(
						`/${userProp.urlName}/${userDocData.settings.defaultPage}`
					);
					// browsing directly to localhost/angusryer doesn't render anything
				});
			}
		}
	};

	useEffect(() => {
		if (user) {
			getUserData(user);
		}
	}, [user]);

	if (!userData) {
		return (
			<div className='loading__container'>
				<ReactLoading
					type={"bubbles"}
					color={"#B65245"}
					height={"5rem"}
					width={"5rem"}
				/>
			</div>
		);
	} else {
		return (
			<Switch>
				<Route exact path='/:urlName/dashboard'>
					<Dashboard user={user} userData={userData} />
				</Route>
				<Route exact path='/:urlName/perform'>
					<Perform user={user} userData={userData} />
				</Route>
			</Switch>
		);
	}
}

export default Navigator;
