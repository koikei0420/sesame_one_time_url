/* vim:ts=2:sw=2:sts=2:st:et */

<template>
  <v-container fluid>
    <v-btn
       v-if="loggedInUser.loggedIn"
       color="info"
    >
      {{loggedInUser.name}}
    </v-btn>
    <v-btn 
       v-else
       color="primary"
       @click="googleLogin"
    >
      Google Auth
    </v-btn>
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

export default {
  name: 'Home',
  data: () => ({
    loggedInUser: {},
    error: false,
    errorMessage: '',
  }),
  mounted() {
    this.loggedInUser = this.$store.getters.all;
  },
  updated() {
    this.loggedInUser = this.$store.getters.all;
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(result => {
        this.$store.commit(
          'sign_in',
          {
            name: result.user.displayName,
            email: result.user.email,
          },
        );
        this.error = false;
      }).catch(error => {
        console.log(error);
        this.errorMessage = error.message;
        this.error = true;
      })
    }
  }
}
</script>
