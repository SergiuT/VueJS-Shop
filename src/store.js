import Vue from 'vue';
import Vuex from 'vuex';
import { fb } from "./firebase";
Vue.use(Vuex);

let cart = window.localStorage.getItem('cart');

export default new Vuex.Store({
    state: {
        cart: cart ? JSON.parse(cart) : [],
        isLoggedIn: false
    },
    mutations: {
        addToCart(state, item) {
            let found = state.cart.find(product => product.productId === item.productId);

            if (found) {
                found.productQuantity++;
            } else {
                state.cart.push(item);
            }

            this.commit('saveData');
        },

        saveData(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart(state, item) {

            let index = state.cart.indexOf(item);

            if (item.productQuantity > 1) {
                item.productQuantity--;
            } else {
                state.cart.splice(index, 1);
            }

            this.commit('saveData');

        },

        signIn(state, item) {
            fb.auth()
                .signInWithEmailAndPassword(item.email, item.password)
                .then(() => {
                    state.isLoggedIn = true;
                })
                .catch(function (err) {
                    var errorCode = err.code;
                    var errorMessage = err.message;
                    if (errorCode == "auth/wrong-password") {
                        alert("Wrong password");
                    } else {
                        alert(errorMessage);
                    }
                });
        },

        signOut(state) {
            fb.auth()
                .signOut()
                .then(() => {
                    state.isLoggedIn = false
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn
    }
});