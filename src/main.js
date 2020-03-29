// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
//import store from './store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from '../credentials/firebase.js';

Vue.config.productionTip = false;
firebase.initializeApp(firebaseConfig);

new Vue({
      router,
//      store,
      vuetify,
      render: h => h(App)
}).$mount('#app')
