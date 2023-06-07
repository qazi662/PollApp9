import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBq071HJqL-3hQ9hBYotEYuzuohWNifk6w',
  authDomain: 'fiverr-test-93875.firebaseapp.com',
  projectId: 'fiverr-test-93875',
  storageBucket: 'fiverr-test-93875.appspot.com',
  messagingSenderId: '53687040290',
  appId: '1:53687040290:web:cc7903da3020db958b8d7b',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
