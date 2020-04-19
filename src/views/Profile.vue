<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 align-items-center mt-5">
          <div class="col-md-6 ml-3">
            <h3>Profile settings</h3>

            <p>Change your profile settings here</p>
          </div>
          <div class="col-md-5">
            <img src="/img/svg/profile.svg" width="300" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <div class="profile-content">
        <ul class="nav nav-pills ml-3" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="true"
            >Profile Settings</a>
          </li>
        </ul>

        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active pt-3"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div class="container">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      name
                      v-model="profile.name"
                      placeholder="Full name"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.phone"
                      placeholder="Phone"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.address"
                      placeholder="Address"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-8">
                  <div class="form-group">
                    <input
                      type="text"
                      v-model="profile.postcode"
                      placeholder="Postcode"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="col-md-12 d-flex mt-5 justify-content-center">
                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="submit"
                        value="Save Changes"
                        @click="updateProfile"
                        class="btn btn-primary w-100"
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <input
                        type="button"
                        @click="resetPassword"
                        value="Send Reset Password Email"
                        class="btn btn-success w-100"
                      />
                    </div>
                  </div>
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
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";
import Swal from "sweetalert2";

export default {
  name: "profile",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },

  data() {
    return {
      profile: {
        name: null,
        phone: null,
        address: null,
        postcode: null
      },

      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null
      }
    };
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection("users").doc(user.uid)
    };
  },
  methods: {
    resetPassword() {
      const auth = fb.auth();

      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          Toast.fire({
            icon: "success",
            type: "success",
            title: "Email sent"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    updateProfile() {
      const data = {
        email: this.profile.email,
        name: this.profile.name,
        password: this.profile.password,
        key: this.profile[".key"],
        phone: this.profile.phone ? this.profile.phone : "",
        address: this.profile.address ? this.profile.address : "",
        postcode: this.profile.postcode ? this.profile.postcode : ""
      };

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      this.$firestore.profile.update(data).then(() => {
        Toast.fire({
          icon: "success",
          type: "success",
          title: "Changes updated successfully"
        });
      });
    }
  },
  created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-image {
  height: auto !important;
  width: 300px;
}
</style>
