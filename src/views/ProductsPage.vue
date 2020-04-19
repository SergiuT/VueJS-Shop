<template>
  <div class="products">
    <Navbar></Navbar>
    <div class="products-page">
      <div class="container">
        <h2 class="title">Products Page</h2>
        <div class="border-line"></div>
        <div class="row">
          <div class="col-md-4" v-for="product in products">
            <div class="card product-item">
              <carousel :perPage="1">
                <slide v-for="(image, index) in product.images">
                  <img :src="image" class="card-img-top" alt="..." height="220px" />
                </slide>
              </carousel>

              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">{{ product.name }}</h5>
                  <h5 class="card-priceS">{{ product.price }}</h5>
                </div>
                <add-to-cart
                  :image="getImage(product.images)"
                  :pId="product['.key']"
                  :price="product.price"
                  :name="product.name"
                ></add-to-cart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Login />
    <mini-cart></mini-cart>
  </div>
</template>

<script>
import { db } from "../firebase";
import Login from "../components/Login";

export default {
  name: "ProductsPage",
  components: {
    Login
  },

  data() {
    return {
      products: []
    };
  },

  methods: {
    getImage(images) {
      return images[0];
    }
  },

  firestore() {
    return {
      products: db.collection("products")
    };
  }
};
</script>

<style lang="scss" scoped>
.products-page {
  padding-top: 7rem;
}
.border-line {
  width: 100%;
  height: 1px;
  background-image: linear-gradient(to right, #f8f8f8, #808080, #f8f8f8);
  margin-bottom: 3rem;
}
</style>