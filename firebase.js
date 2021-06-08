
import firebase from "firebase/app";
import 'firebase/firestore';

import { firebaseConfig } from "./enviroments.js";

firebase.initializeApp(firebaseConfig);

export default firebase;