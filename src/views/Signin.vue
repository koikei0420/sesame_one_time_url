/* vim:ts=2:sw=2:sts=2:st:et */

<template>
  <v-container fluid>
    <v-btn color="primary" @click="googleLogin">Google Auth</v-btn>
    <v-alert
      id="error"
      :value="error"
      dense
      outlined
      type="error"
      style="pre-line"
    >
      {{errorMessage}}
    </v-alert>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import router from '../router'

export default {
  name: 'signin',
  data: () => ({
    error: false,
    errorMessage: '',
  }),
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider).then(result => {
        console.log(result.user)
        router.push('/')
      }).catch(error => {
        console.log(error)
        this.errorMessage = error.message
        this.error = true
      })
    }
  }
}
</script>
