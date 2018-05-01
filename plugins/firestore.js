import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(VueFire)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  })
}

export const db = firebase.firestore()
