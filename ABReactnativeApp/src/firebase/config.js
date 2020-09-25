import * as firebase from 'firebase';
import '@firebase/auth';
import firestore from '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDTO4pUAEEwogK7bfpKujvJBZLvhkuQYn0",
    authDomain: "abregistration.firebaseapp.com",
    databaseURL: "https://abregistration.firebaseio.com",
    projectId: "abregistration",
    storageBucket: "abregistration.appspot.com",
    messagingSenderId: "893008381508",
    appId: "1:893008381508:web:1ee3963ea8ae7b28bdde11",
    measurementId: "G-ZRZ725JRY0"
};
  // Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export const db = firebase.firestore();

export { firebase };
