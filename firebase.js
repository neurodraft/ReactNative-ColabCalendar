
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/auth';


import { firebaseConfig } from "./enviroments.js";

firebase.initializeApp(firebaseConfig);

export default firebase;