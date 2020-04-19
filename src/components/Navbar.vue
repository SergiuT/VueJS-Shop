<template>
  <div class="hello">
    <nav class="navbar custom-nav fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">Vue Shop</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/productsPage" class="nav-link">Products</router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <a
              class="btn btn-outline-success my-2 my-sm-0"
              data-toggle="modal"
              data-target="#login"
              v-if="!isUserLogged"
            >Get Started</a>
            <a
              class="btn btn-outline-info mx-2 my-2 my-sm-0"
              data-toggle="modal"
              data-target="#miniCart"
            >
              <i class="fas fa-cart-plus"></i>
            </a>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Navbar",
  props: {
    msg: String
  },

  data() {
    return {
      isUserLogged: this.$store.getters.isLoggedIn
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// @media (min-width: 992px) {
//   .navbar.custom-nav {
//     padding-top: 16px;
//     padding-bottom: 16px;
//     background-color: #fff !important;
//   }
// }
.btn-outline-success {
  color: black;
  background-color: white;
  border: 1px solid black;
}
.btn-outline-success:hover {
  background-color: #28a745;
  border: 1px solid white;
  color: white;
}
.btn-outline-info {
  background-color: white;
  border: 1px solid black;
}
.btn-outline-info:hover {
  background-color: #17a2b8;
  color: white;
  border: 1px solid white !important;
}
</style>
