/**
 * NOTE: This module require parent firebase UI was inited first
 *
 * ../FirebaseService.initFirebase();
 */

import firebase from 'firebase/app';
import 'firebase/messaging';

const schoolBusVAPID = "BGWHgRsHK0QLdkStHWdhDUa0qZxZTc7efX8hYoWXl6ZfigxWI3zqyiYBs-Q8CR-gKsIQXuQ14t8qhWl3xN8N45s";

/**
 * Instead of calling firebase.messaging(), you can call FirebaseMessaging.getInstance()
 * @returns {null}
 */
export function getInstance() {
  return firebase.messaging();
}

export function initMessaging(onNewMessage) {
  const messaging = getInstance();
  const inited = messaging.publicVapidKeyToUse !== null;

  /**
   * Skip if firebase already initialized, useful for dev + spa app
   */
  if (inited) {
    console.log('[initMessaging] skip because of inited.');
    return;
  }

  console.log('[initMessaging] init new');
  messaging.usePublicVapidKey(schoolBusVAPID);

  // request user to enable desktop perm
  requestDesktopNoticePermission(onPermissionGranted);
  subscribeMessage(onNewMessage);
}

export function messagingToken() {
  const messaging = firebase.messaging();
  messaging.usePublicVapidKey(schoolBusVAPID);
  return messaging
}
/**
 * Prompt user to enable desktop notification
 */
export function requestDesktopNoticePermission(onPermissionGranted) {
  const messaging = getInstance();
  messaging.requestPermission().then(function () {
    console.log('[Fire Messaging - requestPermission] Notification permission granted.');
    // Retrieve an Instance ID token for use with FCM.
    onPermissionGranted();
  }).catch(function (err) {
    console.log('[Fire Messaging - requestPermission] Unable to get permission to notify.', err);
  });
}

function onPermissionGranted() {
  const messaging = getInstance();

  // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  messaging.getToken().then(function (currentToken) {
    //console.log('{currentToken} currentToken: ', currentToken);

    if (currentToken) {
      // sendTokenToServer(currentToken);
      // updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      // updateUIForPushPermissionRequired();

      // setTokenSentToServer(false);
    }
  }).catch(function (err) {
    console.log('An error occurred while retrieving token. ', err);
    // showToken('Error retrieving Instance ID token. ', err);
    // setTokenSentToServer(false);
  });
}

/**
 * @param onNewMessage (payload) => {}
 */
function subscribeMessage(onNewMessage) {
  const messaging = getInstance();

  // [START receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(function (payload) {
    // console.log('Message received. ', payload);
    onNewMessage(payload);
  });
  // [END receive_message]
}
