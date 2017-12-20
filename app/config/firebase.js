import * as firebase from 'firebase'

let config = {
    apiKey: "AIzaSyC82f1r-8meLl8mDq7VOQtf_nJ2UQMqNlY",
    authDomain: "catalogi-3fa90.firebaseapp.com",
    databaseURL: "https://catalogi-3fa90.firebaseio.com",
    projectId: "catalogi-3fa90",
    storageBucket: "catalogi-3fa90.appspot.com",
    messagingSenderId: "742055360723"
}
    
export const Database =  firebase.initializeApp(config);