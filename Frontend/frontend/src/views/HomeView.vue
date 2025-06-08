<script>
import ProductsTable from '@/components/ProductsTable.vue';

export default {
  name: 'HomeView',
  components: {
    ProductsTable
  },
  data() {
    return {
      allProducts: [],
      newProduct: this.getDefaultProduct(),
      productToEdit: this.getDefaultProduct(),
      productIdToEdit: '',
      loading: false,
      error: null,
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    getDefaultProduct() {
      return {
        ProductID: null,
        ProductName: '',
        ProductCategory: '',
        ProductPrice: null,
        ProductDescription: '',
        ImageURL: '',
        ReleaseDateEU: ''
      };
    },
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        this.allProducts = await res.json();
      } catch (err) {
        console.error(err);
        this.error = 'Could not load products.';
      } finally {
        this.loading = false;
      }
    },
    async createProduct() {
      try {
        const res = await fetch('http://localhost:8080/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newProduct),
        });
        if (!res.ok) throw new Error('Create failed');
        alert('Product created!');
        this.newProduct = this.getDefaultProduct();
        await this.fetchProducts();
      } catch (err) {
        console.error(err);
        alert('Error creating product.');
      }
    },
    async editProduct() {
      if (!this.productIdToEdit) return alert('Select a Product ID to edit.');
      try {
        const res = await fetch(`http://localhost:8080/products/${this.productIdToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.productToEdit),
        });
        if (!res.ok) throw new Error('Edit failed');
        alert('Product updated!');
        this.productToEdit = this.getDefaultProduct();
        this.productIdToEdit = '';
        await this.fetchProducts();
      } catch (err) {
        console.error(err);
        alert('Error editing product.');
      }
    },
    async deleteProduct() {
      if (!this.productIdToEdit) return alert('Select a Product ID to delete.');
      try {
        const res = await fetch(`http://localhost:8080/products/${this.productIdToEdit}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Delete failed');
        alert('Product deleted!');
        this.productIdToEdit = '';
        await this.fetchProducts();
      } catch (err) {
        console.error(err);
        alert('Error deleting product.');
      }
    },
    handleProductSelection() {
      const selected = this.allProducts.find(p => p.ProductID === this.productIdToEdit);
      if (selected) {
        this.productToEdit = { ...selected };
      }
    }
  }
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
      <ProductsTable :items="allProducts" />
    </section>

    <section class="form-section">

      <!-- Create Product -->
      <div class="form-block">
        <h3>Create Product</h3>
        <form @submit.prevent="createProduct">
          <input v-model="newProduct.ProductName" placeholder="Product Name" />
          <input v-model="newProduct.ProductCategory" placeholder="Category" />
          <input v-model.number="newProduct.ProductPrice" type="number" placeholder="Price" />
          <input v-model="newProduct.ProductDescription" placeholder="Description" />
          <input v-model="newProduct.ImageURL" placeholder="Image URL" />
          <input v-model="newProduct.ReleaseDateEU" type="date" placeholder="Release Date" />
          <button type="submit">Create</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Edit Product</h3>

        <select v-model="productIdToEdit" @change="handleProductSelection">
          <option disabled value="">Select Product ID</option>
          <option v-for="product in allProducts" :key="product.ProductID" :value="product.ProductID">
            {{ product.ProductID }} - {{ product.ProductName }}
          </option>
        </select>

        <form @submit.prevent="editProduct">
          <input v-model="productToEdit.ProductName" placeholder="New Name" />
          <input v-model="productToEdit.ProductCategory" placeholder="New Category" />
          <input v-model.number="productToEdit.ProductPrice" type="number" placeholder="New Price" />
          <input v-model="productToEdit.ProductDescription" placeholder="New Description" />
          <input v-model="productToEdit.ImageURL" placeholder="New Image URL" />
          <input v-model="productToEdit.ReleaseDateEU" type="date" placeholder="New Release Date" />
          <button type="submit">Update</button>
        </form>
      </div>

      <!-- Delete Product -->
      <div class="form-block">
        <h3>Delete Product</h3>
        <select v-model="productIdToEdit">
          <option disabled value="">Select Product ID</option>
          <option v-for="product in allProducts" :key="product.ProductID" :value="product.ProductID">
            {{ product.ProductID }} - {{ product.ProductName }}
          </option>
        </select>
        <button @click="deleteProduct" class="danger">Delete</button>
      </div>

      <div class="form-block">
        <button @click="fetchProducts">Refresh Products</button>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/styles.css"></style>
