import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyATsEitoOJYirOGPdAoH-o-WHBqo9BeupY",
  authDomain: "booksanta-d9156.firebaseapp.com",
  projectId: "booksanta-d9156",
  storageBucket: "booksanta-d9156.appspot.com",
  messagingSenderId: "129452524757",
  appId: "1:129452524757:web:33e982b62be800ce530e5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()