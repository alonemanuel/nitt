// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGhnWGi6psDgrzCT9yWfta6fKBwZ4e_e4",
    authDomain: "nitt-376310.firebaseapp.com",
    databaseURL: "https://nitt-376310-default-rtdb.firebaseio.com",
    projectId: "nitt-376310",
    storageBucket: "nitt-376310.appspot.com",
    messagingSenderId: "219247578055",
    appId: "1:219247578055:web:1dedc363f6adeb4408e7e2",
    measurementId: "G-1YXGG007QN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log('logged in!');
    } else {
        console.log('No user');
    }
});