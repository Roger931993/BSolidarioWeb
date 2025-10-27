importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: 'AIzaSyCfuUp3092IeLE94j59qSLdgR60aJnq5BU',
    authDomain: 'gsb-local.firebaseapp.com',
    projectId: 'gsb-local',
    storageBucket: 'gsb-local.appspot.com',
    messagingSenderId: '120895756681',
    appId: '1:120895756681:web:49230d481efb2a96e4a958',
    measurementId: 'G-QQ1NWC7NY8',
});

const messaging = firebase.messaging();