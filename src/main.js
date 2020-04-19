/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'bootstrap';
import './assets/app.scss';
import jQuery from 'jquery';
import 'popper.js';
import { fb } from './firebase';
import Swal from 'sweetalert2';
import VueFirestore from 'vue-firestore';
import Vuex from 'vuex';

window.$ = window.jQuery = jQuery;
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
Vue.use(Vuex);

window.Swal = Swal;
Vue.use(VueFirestore)

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

Vue.config.productionTip = false;
let app = "";

fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
