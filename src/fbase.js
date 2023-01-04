// import * as firebase from "firebase/app"
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, orderBy, query, where} from "firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
	appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const authService = {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, GithubAuthProvider, GoogleAuthProvider};
export const dbService = {getFirestore: getFirestore(app), collection, addDoc, getDocs, onSnapshot, orderBy, query, where};
// export default firebase.initializeApp(firebaseConfig);

// import * as firebase from "firebase/app"
