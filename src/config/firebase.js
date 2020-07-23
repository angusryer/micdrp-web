import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB0D4WzQYk0O38CxBg8WvNYhcvATdozH6s",
    authDomain: "micdrp-0-1-0.firebaseapp.com",
    databaseURL: "https://micdrp-0-1-0.firebaseio.com",
    projectId: "micdrp-0-1-0",
    storageBucket: "micdrp-0-1-0.appspot.com",
    messagingSenderId: "876062261559",
    appId: "1:876062261559:web:62af6df8ae56068a341ab2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;