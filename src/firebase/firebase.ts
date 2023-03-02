// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7NF7GdVi01_LvAKvCtlCJTC-FbLvGsik',
  authDomain: 'productmanagement-5e1f3.firebaseapp.com',
  projectId: 'productmanagement-5e1f3',
  storageBucket: 'productmanagement-5e1f3.appspot.com',
  messagingSenderId: '915197322972',
  appId: '1:915197322972:web:cd1ec03abb4f065c9b3619',
  measurementId: 'G-Q0NVH3KS01'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
