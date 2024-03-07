// import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getDatabase, ref } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvGLxrPjF9l-CHjs3YJRenkqE4z6jaB64",
  authDomain: "adventureai-678bb.firebaseapp.com",
  projectId: "adventureai-678bb",
  storageBucket: "adventureai-678bb.appspot.com",
  messagingSenderId: "802832032444",
  appId: "1:802832032444:web:ed73cb45bce85878d926b9",
  measurementId: "G-BGG2CRDZ4H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

let email = null;
let password = null;


// Set up our register function
function register (event) {
  // Get all our input fields
  event.preventDefault(); 
  email = document.querySelector('.email').value
  console.log(email)
  password = document.querySelector('.password').value
  console.log(password)

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
 
  // Move on with Auth
  createUserWithEmailAndPassword(auth,email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = ref()

    // Create User data
    var user_data = {
      email : email,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // Done
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.querySelector('.email').value
  password = document.querySelector('.password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  signInWithEmailAndPassword(auth,email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}

document.getElementById('register-button').addEventListener('click', register);
document.getElementById('login-button').addEventListener('click', login);