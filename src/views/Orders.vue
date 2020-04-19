<template>
  <div class="products">
    <div class="container">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <h3>Orders Page</h3>

            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.</p>
          </div>
          <div class="col-md-6">
            <img src="/img/svg/products.svg" alt class="img-fluid" />
          </div>
        </div>
      </div>

      <hr />

      <div class="product-test p-3">
        <div class="d-flex justify-content-between mb-1">
          <h3 class="d-inline-block">Products list</h3>
          <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead class="thead-light">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" v-bind:key="product.id">
                <td>{{product.name}}</td>

                <td>
                  {{product.price}}
                  <b>$</b>
                </td>

                <td>
                  <button class="btn btn-primary mr-1" @click="editProduct(product)">Edit</button>
                  <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="editLabel"
            >{{modal === 'new' ? 'Add Product' : 'Edit Product'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- main product -->
              <div class="col-md-8">
                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <vue-editor placeholder="Product Description" v-model="product.description"></vue-editor>
                </div>
              </div>
              <!-- product sidebar -->
              <div class="col-md-4">
                <h4 class="display-6">Product Details</h4>
                <hr />

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="Product price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    @keyup.188="addTag"
                    placeholder="Product tags"
                    v-model="tag"
                    class="form-control"
                  />

                  <div class="d-flex">
                    <p v-for="tag in product.tags" v-bind:key="tag">
                      <span class="p-1">{{tag}}</span>
                    </p>
                  </div>
                </div>

                <div class="form-group">
                  <label class="label_image" for="product_image">Product Images:</label>
                  <input type="file" @change="uploadImage" class="form-control input-image" />
                </div>

                <div class="form-group d-flex">
                  <div class="p-1" v-for="(image, index) in product.images" v-bind:key="image">
                    <div class="img-wrapp d-flex align-items-center justify-content-around">
                      <img :src="image" alt width="80px" />
                      <span class="delete-img ml-5" @click="deleteImage(image,index)">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              @click="addProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'new'"
            >Save changes</button>
            <button
              @click="updateProduct()"
              type="button"
              class="btn btn-primary"
              v-if="modal == 'edit'"
            >Apply changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
import { VueEditor } from "vue2-editor";

export default {
  name: "Orders",
  props: {},
  components: {
    VueEditor
  },
  data() {
    return {
      products: [],
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      activeItem: null,
      modal: null,
      tag: null,
      editorOptions: {
        modules: {
          toolbar: false
        }
      }
    };
  },

  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index, 1);

      image
        .delete()
        .then(function() {
          console.log("image deleted");
        })
        .catch(function(error) {
          // Uh-oh, an error occurred!
          console.log("an error occurred", error);
        });
    },

    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb
          .storage()
          .ref("products/" + Math.random() + "_" + file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {
            console.log(snapshot);
          },
          error => {
            // Handle unsuccessful uploads
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },

    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      };
    },

    addNew() {
      this.modal = "new";
      this.reset();
      $("#product").modal("show");
    },
    updateProduct() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      const id = this.product[".key"];
      const productObj = {
        description: this.product.description,
        images: this.product.images,
        name: this.product.name,
        price: this.product.price,
        tags: this.product.tags
      };

      this.$firestore.products.doc(id).update(productObj);
      Toast.fire({
        icon: "success",
        type: "success",
        title: "Updated  successfully"
      });

      $("#product").modal("hide");
    },

    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    },

    deleteProduct(doc) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc[".key"]).delete();

          Toast.fire({
            icon: "success",
            type: "success",
            title: "Deleted  successfully"
          });
        }
      });
    },
    readData() {},
    addProduct() {
      this.$firestore.products.add(this.product);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        icon: "success",
        type: "success",
        title: "Product created successfully"
      });

      $("#product").modal("hide");
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.products {
  padding: 35px 15px !important;
}
.label_image {
  font-size: 16px;
  float: left;
  font-weight: 600;
}
.input-image {
  height: auto !important;
}
.delete-img {
  background-color: white;
  padding: 5px 8px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
}
.delete-img:hover {
  background-color: black;
  color: white;
  transition: all 0.2s;
}
</style>