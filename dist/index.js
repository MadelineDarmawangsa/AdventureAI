import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvGLxrPjF9l-CHjs3YJRenkqE4z6jaB64",
  authDomain: "adventureai-678bb.firebaseapp.com",
  databaseURL: "https://adventureai-678bb-default-rtdb.firebaseio.com",
  projectId: "adventureai-678bb",
  storageBucket: "adventureai-678bb.appspot.com",
  messagingSenderId: "802832032444",
  appId: "1:802832032444:web:b1304c8fbb2d65d4d926b9",
  measurementId: "G-GPYEWR80YY"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

let email = null;
let password = null;


// Set up our register function
function register (event) {
  // Get all our input fields
  event.preventDefault(); 
  email = document.querySelector('.email').value
  password = document.querySelector('.password').value
  document.querySelector('.email').value = ""
  document.querySelector('.password').value = ""

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Invalid email or password')
    return
  }
 
  createUserWithEmailAndPassword(auth,email, password)
  .then(function() {
    var user = auth.currentUser
    // Add user to Firebase Database
    var user_data = {
      email : email,
      // last_login : Date.now()
    }

    // Push to Firebase Database
    let email_stripped = email.replace(/[.@]/g, '');
    set(ref(db,'user/'+email_stripped),user_data)
    console.log('User Created!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
  })
}

function login () {
  email = document.querySelector('.email').value
  password = document.querySelector('.password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Incorrect email or password')
    return
  }

  signInWithEmailAndPassword(auth, email, password)
  .then(function() {
    // var user = auth.currentUser
    // var database_ref = ref()
    // var user_data = {
    //   last_login : Date.now()
    // }

    // database_ref.child('users/' + user.uid).update(user_data)
    console.log('User Logged In!!')
  })
  .catch(function(error) {
    var error_code = error.code
    var error_message = error.message
    console.log(error_message)
  })
}


// Validation Functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    return true
  } else {
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