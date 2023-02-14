import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID,REACT_APP_FIREBASE_STORAGE_BUCKET,REACT_APP_FIREBASE_MESSAGING_SENDER_ID,REACT_APP_FIREBASE_APP_ID } from '../../passes'

const app = firebase.initializeApp({
    apiKey: "AIzaSyCk5xgx8VWfDSG1bN-2BPFOvwqd32EWpdk",
    authDomain: "auth-cryptogeek.firebaseapp.com",
    projectId: "auth-cryptogeek",
    storageBucket: "auth-cryptogeek.appspot.com",
    messagingSenderId: "102038206538",
    appId: "1:102038206538:web:1bbd4b00302f67d6e14eb3"
})

export const auth = app.auth()
export default app

