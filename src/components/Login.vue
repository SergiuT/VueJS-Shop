<template>
  <div class="login">
    <!-- Modal -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="loginTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-login"
                  role="tab"
                  aria-controls="pills-login"
                  aria-selected="true"
                >Login</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-register-tab"
                  data-toggle="pill"
                  href="#pills-register"
                  role="tab"
                  aria-controls="pills-register"
                  aria-selected="false"
                >Signup</a>
              </li>
            </ul>

            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-login"
                role="tabpanel"
                aria-labelledby="pills-login-tab"
              >
                <h5 class="text-center">Login Please</h5>
                <div class="form-group">
                  <input
                    type="email"
                    v-model="item.email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email address"
                  />
                  <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    @keyup.enter="login"
                    v-model="item.password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" @click="login">Login</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-register"
                role="tabpanel"
                aria-labelledby="pills-register-tab"
              >
                <h5 class="text-center">Create New Account</h5>

                <div class="form-group">
                  <input
                    type="text"
                    v-model="item.name"
                    class="form-control"
                    id="name"
                    placeholder="Name"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="email"
                    v-model="item.email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email address"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    @keyup.enter="register"
                    v-model="item.password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                <div class="form-group">
                  <button class="btn btn-primary" @click="register">Signup</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import $ from "jquery";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      item: {
        name: null,
        email: null,
        password: null
      },
      isUserLogged: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    }
  },

  watch: {
    isLoggedIn(userState) {
      if (userState) {
        $("#login").modal("hide");
        this.$router.replace("/admin/overview");
      }
    }
  },

  methods: {
    async login() {
      await this.$store.commit("signIn", this.item);
      $("#login").modal("hide");
      if (this.isUserLogged) {
      }

      // fb.auth()
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     $("#login").modal("hide");
      //     this.$router.replace("/admin/overview");
      //   })
      //   .catch(function(err) {
      //     var errorCode = err.code;
      //     var errorMessage = err.message;
      //     if (errorCode == "auth/wrong-password") {
      //       alert("Wrong password");
      //     } else {
      //       alert(errorMessage);
      //     }
      //   });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.item.email, this.item.password)
        .then(user => {
          $("#login").modal("hide");
          db.collection("users")
            .doc(user.user.uid)
            .set({
              name: this.item.name,
              email: this.item.email,
              password: this.item.password
            })
            .then(() => {})
            .catch(err => {
              console.error("Error writing document:", err);
            });
          this.$router.replace("/admin/overview");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak");
          } else {
            alert(errorMessage);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
