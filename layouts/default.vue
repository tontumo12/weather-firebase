<template>
   <nuxt/>
</template>

<script>
import {messagingToken} from '@/services/firebase/FirebaseMessaging.js'
import * as firebaseServive from '@/services/firebase'
import { mapState, mapActions } from 'vuex';
export default {
  created() {
      this.initFirebaseMessaging()
  },
  methods: {
    ...mapActions('Noti',['setNoti']),
      initFirebaseMessaging() {
          firebaseServive.initFirebase();
          const messaging = messagingToken()
          messaging.getToken().then((currentToken) => {
              if (currentToken) {
              // sendTokenToServer(currentToken);
              // updateUIForPushEnabled(currentToken);
              console.log(currentToken)
              } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
              }
          }).catch((err) => {
              console.log('An error occurred while retrieving token. ', err);
              // showToken('Error retrieving Instance ID token. ', err);
              // setTokenSentToServer(false);
          });
          messaging.onMessage((payload) => {
              this.setNoti(JSON.parse(payload.notification.body))
          })
      },
  },
}
</script>
