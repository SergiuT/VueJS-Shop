<template>
  <div class="admin">
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
      <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <!-- sidebar-brand  -->
          <div class="sidebar-item sidebar-brand">
            <a href="#">Vue Shop</a>
            <div id="close-sidebar" @click="closeMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-item sidebar-header">
            <div class="user-pic">
              <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture" />
            </div>
            <div class="user-info">
              <span class="user-name">
                <strong>{{profile.name}}</strong>
              </span>
              <span class="user-role">{{profile.email}}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-menu  -->
          <div class="sidebar-item sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>Menu</span>
              </li>

              <li>
                <router-link to="/admin/overview">
                  <i class="fa fa-chart-line"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/products">
                  <i class="fab fa-amazon"></i>
                  <span>Products</span>
                </router-link>
              </li>
              <li>
                <router-link to="/admin/orders">
                  <i class="fa fa-shopping-cart"></i>
                  <span>Orders</span>
                </router-link>
              </li>

              <li>
                <router-link to="/admin/profile">
                  <i class="fa fa-user"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <a href="#" @click="logout()">
                  <i class="fa fa-power-off"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
      </nav>
      <!-- sidebar-content  -->
      <main class="page-content">
        <router-view />
      </main>
      <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
  </div>
</template>

<script>
import $ from "jquery";
import { fb, db } from "../firebase";
import { mapGetters } from "vuex";

export default {
  name: "Admin",
  components: {},
  data() {
    return {
      profile: {
        name: null,
        email: null
      }
    };
  },

  firestore() {
    const user = fb.auth().currentUser;

    if (user) {
      return {
        profile: db.collection("users").doc(user.uid)
      };
    }
  },

  computed: {
    isLoggedOut() {
      return this.$store.state.isLoggedIn;
    }
  },

  watch: {
    isLoggedOut(loggedOut) {
      if (loggedOut) {
        this.$router.replace("/");
      }
    }
  },

  methods: {
    closeMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    async logout() {
      await this.$store.commit("signOut");
      this.$router.replace("/");
    }
  }
};
</script>

<style>
</style>
