import firebase from 'firebase';
require("firebase/firestore");

var firebaseConfig = {
    apiKey: `${process.env.API_KEY}`,
    authDomain: "vue-shop-a8ec8.firebaseapp.com",
    databaseURL: "https://vue-shop-a8ec8.firebaseio.com",
    projectId: "vue-shop-a8ec8",
    storageBucket: "vue-shop-a8ec8.appspot.com",
    messagingSenderId: "330476526699",
    appId: `${process.env.API_KEY}`,
    measurementId: "G-MB7Q0LERG5"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db }
