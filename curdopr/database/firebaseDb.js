import * as firebase from "firebase";
import firestore from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB422C2O9h_XBhlJR56PHWqjcpc9-UWoF8",
  authDomain: "curdop-824e5.firebaseapp.com",
  databaseURL: "https://curdop-824e5.firebaseio.com",
  projectId: "curdop-824e5",
  storageBucket: "curdop-824e5.appspot.com",
  messagingSenderId: "325188456891",
  appId: "1:325188456891:web:55256b661f9ab5acf4349e",
  measurementId: "G-5YYLR1BRD9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;