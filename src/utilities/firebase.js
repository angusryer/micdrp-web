import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB0D4WzQYk0O38CxBg8WvNYhcvATdozH6s",
    authDomain: "micdrp-0-1-0.firebaseapp.com",
    databaseURL: "https://micdrp-0-1-0.firebaseio.com",
    projectId: "micdrp-0-1-0",
    storageBucket: "micdrp-0-1-0.appspot.com",
    messagingSenderId: "876062261559",
    appId: "1:876062261559:web:62af6df8ae56068a341ab2",
    measurementId: "G-MELC513LNT"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics()
}


export default firebase;


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.17.2/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB0D4WzQYk0O38CxBg8WvNYhcvATdozH6s",
//     authDomain: "micdrp-0-1-0.firebaseapp.com",
//     databaseURL: "https://micdrp-0-1-0.firebaseio.com",
//     projectId: "micdrp-0-1-0",
//     storageBucket: "micdrp-0-1-0.appspot.com",
//     messagingSenderId: "876062261559",
//     appId: "1:876062261559:web:62af6df8ae56068a341ab2",
//     measurementId: "G-MELC513LNT"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>