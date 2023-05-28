import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database'
import 'firebase/auth';
import secret from './secret';

const firebaseConfig = {

  apiKey: secret.Firebase_apiKey,

  authDomain: "hw6-for-pui.firebaseapp.com",

  projectId: "hw6-for-pui",

  storageBucket: "hw6-for-pui.appspot.com",

  messagingSenderId: secret.Firebase_messagingSenderId,

  appId: secret.Firebase_appId,

  measurementId: "G-CGQFXF4N9Q",

	databaseURL: "hw6-for-pui.asia-east2.firebasedatabase.app",

};



export const myFirebase = initializeApp(firebaseConfig);
export const db = getDatabase(myFirebase);