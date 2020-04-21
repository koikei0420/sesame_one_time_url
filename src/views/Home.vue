/* vim:ts=2:sw=2:sts=2:st:et */

<template>
  <v-container fluid>
    <v-card
       v-if="loggedInUser.loggedIn"
    >
      <v-card-text> {{loggedInUser.name}} </v-card-text>
      <v-card-text> {{loggedInUser.email}} </v-card-text>
      <v-btn
        color="error"
        @click="logout"
      >
        Logout
      </v-btn>
    </v-card>
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
    loggedInUser: {
      name: '',
      email: '',
      loggedIn: false,
    },
    error: false,
    errorMessage: '',
  }),
  created() {
    this.isLoggedIn();
  },
  updated() {
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          this.loggedInUser = {
            name: user.displayName,
            email:  user.email,
            loggedIn: true
          }
        }
      });
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      provider.addScope('profile');
      provider.addScope('email');

      firebase.auth().signInWithPopup(provider).then(result => {
        this.loggedInUser = {
          name: result.user.displayName,
          email:  result.user.email,
          loggedIn: true
        }
        this.error = false;
      }).catch(error => {
        console.log(error);
        this.errorMessage = error.message;
        this.error = true;
      })
    },
    logout() {
      firebase.auth().signOut().then(() => {
        this.loggedInUser = {
          name: '',
          email: '',
          loggedIn: false,
        }
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
