import firebase from 'firebase/app';
import 'firebase/firestore';

export default fetch('/__/firebase/init.json')
  .then(async (response) => firebase.initializeApp(await response.json()).firestore());
