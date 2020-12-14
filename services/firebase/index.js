import firebase from 'firebase/app';
import 'firebase/auth';
// import * as firebaseui from 'firebaseui'
// import firebaseui from 'firebaseui/dist/npm__vi';
// import 'firebaseui/dist/firebaseui.css'

const data = {
  ui: null, // firebase ui instance
};

/**
 * Schoolbus
 * PM a Dương / Bảo để lấy quyền
 */
export const config = {
  apiKey: "AIzaSyAz4cecT3HvDHlcLz-wCNyOOClhjC_6Jio",
  authDomain: "tunt-16c2b.firebaseapp.com",
  databaseURL: "https://tunt-16c2b.firebaseio.com",
  projectId: "tunt-16c2b",
  storageBucket: "tunt-16c2b.appspot.com",
  messagingSenderId: "1038660838040",
  appId: "1:1038660838040:web:1afe957768c354c19ba6ed",
  measurementId: "G-GS6LJMLP6R"
};

export function initFirebase() {
  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(config);
  }
}

// export function getFireBaseUiInstance() {
//   // Initialize the FirebaseUI Widget using Firebase.
//   if (!data.ui) {
//     console.log('Init firebase ui instance: ');

//     var ui = new firebaseui.auth.AuthUI(firebase.auth());
//     data.ui = ui;
//   }

//   return data.ui;
// }

// export function startFacebookFlow(option) {
//   // FirebaseUI config.
//   var uiConfig = {
//     signInSuccessUrl: '/',
//     signInOptions: [
//       // Leave the lines as is for the providers you want to offer your users.
// //            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// //            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
// //            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
// //            firebase.auth.GithubAuthProvider.PROVIDER_ID,
// //            firebase.auth.EmailAuthProvider.PROVIDER_ID,
// //            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
// //            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
//       {
//         provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//         scopes: [
//           'public_profile',
//           'email',
//           'user_friends',
//           'user_birthday',
//           // 'user_likes',
//         ],
//         customParameters: {
//           // Forces password re-entry.
//           auth_type: 'reauthenticate'
//         }
//       },
//     ],
//     // tosUrl and privacyPolicyUrl accept either url string or a callback
//     // function.
//     // Terms of service url/callback.
//     tosUrl: 'https://termsfeed.com/assets/pdf/terms-and-conditions-template.pdf',
//     // Privacy policy url/callback.
//     privacyPolicyUrl: function () {
//       window.location.assign('https://termsfeed.com/assets/pdf/terms-and-conditions-template.pdf');
//     }
//   };


//   // The start method will wait until the DOM is loaded.
//   const ui = getFireBaseUiInstance();
//   ui.start(option.container, uiConfig);
// }

/**
 *
 * @param onSignedIn(accountDetails)
 * @param onSignedOut()
 * @param onError(error)
 */
export function onAuthStateChanged(onSignedIn, onSignedOut, onError) {
  firebase.auth().onAuthStateChanged(function (user) {
    console.log('onAuthStateChanged user: ', user);

    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

      user.getIdToken().then(function (accessToken) {

        onSignedIn({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        })

      });
    } else {
      // User is signed out.
      onSignedOut()
    }
  }, function (error) {
    console.log(error);
    onError(error)
  });
}


export function signout() {
  firebase.auth().signOut();
}
