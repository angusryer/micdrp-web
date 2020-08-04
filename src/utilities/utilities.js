import { useEffect, useRef } from 'react';

export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

export const readCookie = cookieName => {
	let workingCookieName = `${cookieName}=`;
	const cookieArray = document.cookie.split(';');
	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(workingCookieName) == 0) return cookie.substring(workingCookieName.length, cookie.length);
	}
	return null;
}

export const eraseCookie = cookieName => {
	createCookie(cookieName, "", -1);
}

export const createCookie = (cookieName, cookieValue, expirationInDays, domainPath) => {
	const cookieExpiration = "";
	if (expirationInDays) {
		const date = new Date();
		date.setTime(date.getTime() + (expirationInDays * 24 * 60 * 60 * 1000));
		cookieExpiration = "; expires=" + date.toGMTString();
	}
	document.cookie = `${cookieName}=${cookieValue}${cookieExpiration}; path=${(!domainPath) ? "/" : domainPath}`;
}