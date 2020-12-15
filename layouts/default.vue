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
    ...mapActions('Noti',['setNoti','setToken']),
      initFirebaseMessaging() {
          firebaseServive.initFirebase();
          const messaging = messagingToken()
          messaging.getToken().then((currentToken) => {
              if (currentToken) {
              // sendTokenToServer(currentToken);
              // updateUIForPushEnabled(currentToken);
              console.log(currentToken)
              this.setToken(currentToken)
              let a = '{"nhietdo":100,"checkRain":10,"wind":21,"humidity":123,"type":"night"}'
              console.log(JSON.parse(a))
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
              console.log(payload)
              let a = JSON.parse(payload.notification.body)
              console.log(a)
              this.setNoti(payload.notification.body)
          })
      },
  },
}
</script>
