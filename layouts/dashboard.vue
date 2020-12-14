<template lang="">
    <div>
        <p>tunt </p>
    </div>
</template>
<script>
import {messagingToken} from '@/services/firebase/FirebaseMessaging.js'
import * as firebaseServive from '@/services/firebase'
export default {
    created() {
        this.initFirebaseMessaging()
    },
    methods: {
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
                console.log('tunt', payload)
            })
        },
    },
}
</script>