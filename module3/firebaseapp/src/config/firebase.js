import firebase from "firebase";



var firebaseConfig = {
    apiKey: "AIzaSyAk1pIU1AwHe_OGEAbnKVqh3jXYcLhleT0",
    authDomain: "login-b2c71.firebaseapp.com",
    projectId: "login-b2c71",
    storageBucket: "login-b2c71.appspot.com",
    messagingSenderId: "412877656395",
    appId: "1:412877656395:web:9c0f472e0a6c01e16018ce"
  };

  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth();

  export default firebaseAuth;