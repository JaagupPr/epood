<script>
export default {
  data() {
    return {
      associations: [],
      users: [],
      products: [],
      newAssociation: { UserID: "", ProductID: "" },
      loading: false,
      message: "",
      success: null
    };
  },
  async mounted() {
    await Promise.all([
      this.fetchAssociations(),
      this.fetchUsers(),
      this.fetchProducts()
    ]);
  },
  methods: {
    async fetchAssociations() {
      try {
        const res = await fetch("http://localhost:8080/product-user");
        if (!res.ok) throw new Error(res.statusText);
        this.associations = await res.json();
      } catch (err) {
        console.error(err);
        this.message = err.message || "Failed to load associations.";
        this.success = false;
      }
    },
    async fetchUsers() {
      try {
        const res = await fetch("http://localhost:8080/users");
        if (!res.ok) throw new Error(res.statusText);
        this.users = await res.json();
      } catch (err) {
        console.error(err);
        this.message = err.message || "Failed to load users.";
        this.success = false;
      }
    },
    async fetchProducts() {
      try {
        const res = await fetch("http://localhost:8080/products");
        if (!res.ok) throw new Error(res.statusText);
        this.products = await res.json();
      } catch (err) {
        console.error(err);
        this.message = err.message || "Failed to load products.";
        this.success = false;
      }
    },
    async assignProduct() {
      const { UserID, ProductID } = this.newAssociation;
      if (!UserID || !ProductID) {
        this.message = "Both User and Product must be selected.";
        this.success = false;
        return;
      }

      try {
        this.loading = true;
        const res = await fetch("http://localhost:8080/product-user/assign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ UserID, ProductID }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || res.statusText);
        }

        this.message = "Product assigned successfully!";
        this.success = true;
        this.newAssociation = { UserID: "", ProductID: "" };
        await this.fetchAssociations();
      } catch (err) {
        console.error(err);
        this.message = err.message || "Assignment failed.";
        this.success = false;
      } finally {
        this.loading = false;
      }
    },
    async unassignProduct(UserID, ProductID) {
      if (!confirm("Are you sure you want to unassign this product?")) return;

      try {
        this.loading = true;
        const res = await fetch("http://localhost:8080/product-user/unassign", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ UserID, ProductID }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || res.statusText);
        }

        this.message = "Product unassigned successfully!";
        this.success = true;
        await this.fetchAssociations();
      } catch (err) {
        console.error(err);
        this.message = err.message || "Unassignment failed.";
        this.success = false;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    userNameById() {
      return (userId) => {
        const user = this.users.find(u => u.UserID === userId);
        return user ? `${user.FirstName} ${user.LastName}` : 'Unknown';
      };
    },
    productNameById() {
      return (productId) => {
        const product = this.products.find(p => p.ProductID === productId);
        return product ? product.ProductName : 'Unknown';
      };
    }
  }
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
      <h1>Product-User Associations</h1>

      <div v-if="message" :class="['message', success ? 'success' : 'error']">
        {{ message }}
      </div>

      <div class="form-block">
        <h3>Assign Product to User</h3>
        <form @submit.prevent="assignProduct">
          <select v-model="newAssociation.UserID" required>
            <option value="" disabled>Select User</option>
            <option v-for="user in users" :key="user.UserID" :value="user.UserID">
              {{ user.FirstName }} {{ user.LastName }} (ID: {{ user.UserID }})
            </option>
          </select>

          <select v-model="newAssociation.ProductID" required>
            <option value="" disabled>Select Product</option>
            <option v-for="product in products" :key="product.ProductID" :value="product.ProductID">
              {{ product.ProductName }} (ID: {{ product.ProductID }})
            </option>
          </select>

          <button type="submit" :disabled="loading">
            {{ loading ? 'Processing...' : 'Assign Product' }}
          </button>
        </form>
      </div>

      <div class="table-responsive">
        <table class="app-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="association in associations" :key="`${association.UserID}-${association.ProductID}`">
              <td>{{ association.UserID }}</td>
              <td>{{ userNameById(association.UserID) }}</td>
              <td>{{ association.ProductID }}</td>
              <td>{{ productNameById(association.ProductID) }}</td>
              <td>
                <button @click="unassignProduct(association.UserID, association.ProductID)" class="danger" :disabled="loading">
                  Unassign
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/association.css"></style>
