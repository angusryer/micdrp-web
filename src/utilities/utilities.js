import { useEffect, useRef } from 'react';

export default function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }


export const readCookie = cookieName => {
	let workingCookieName = `${cookieName}=`;
	const cookieArray = document.cookie.split(';');
	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];
		while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
		if (cookie.indexOf(workingCookieName) === 0) return cookie.substring(workingCookieName.length, cookie.length);
	}
	return null;
}

export const eraseCookie = cookieName => {
	createCookie(cookieName, "", -1);
}

export const createCookie = (cookieName, cookieValue, expirationInDays, domainPath) => {
	let cookieExpiration = "";
	if (expirationInDays) {
		const date = new Date();
		date.setTime(date.getTime() + (expirationInDays * 24 * 60 * 60 * 1000));
		cookieExpiration = "; expires=" + date.toGMTString();
	}
	document.cookie = `${cookieName}=${cookieValue}${cookieExpiration}; path=${(!domainPath) ? "/" : domainPath}; Secure SameSite=None`;
}