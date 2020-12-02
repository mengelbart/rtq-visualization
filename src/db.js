import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance
const firebaseConfig = {
  apiKey: 'AIzaSyA1eLOVH3Lv2uWDE7VLEa8P5y2kF0hnNjE',
  authDomain: 'real-time-quic.firebaseapp.com',
  databaseURL: 'https://real-time-quic.firebaseio.com',
  projectId: 'real-time-quic',
  storageBucket: 'real-time-quic.appspot.com',
};

const db = firebase
  .initializeApp(firebaseConfig)
  .firestore();

export default db;
