// import { initializeApp } from "@react-native-firebase/app";
// import { getStorage } from "@react-native-firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGh3c4dXZk1dHhZt_GXggvWsmJ3Mi_zmw",
  authDomain: "messenger-da484.firebaseapp.com",
  projectId: "messenger-da484",
  storageBucket: "messenger-da484.appspot.com",
  messagingSenderId: "345189181844",
  appId: "1:345189181844:web:0b93ab2ccba443d26b8781",
  measurementId: "G-RTHPF957YN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
