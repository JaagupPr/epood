<script>
import ReviewsTable from '@/components/ReviewsTable.vue';

export default {
  components: { ReviewsTable },
  data() {
    return {
      allReviews: [],
      products: [],
      users: [],
      newReview: this.getDefaultReview(),
      reviewIdToEdit: null,
      editingReview: this.getDefaultReview(),
      reviewIdToDelete: null,
    };
  },
  async created() {
    await this.fetchReviews();
    await this.fetchProducts();
    await this.fetchUsers();
  },
  methods: {
    getDefaultReview() {
      return {
        ProductID: null,
        UserID: null,
        Rating: null,
        Comment: ''
      };
    },
    async fetchProducts() {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        this.products = await res.json();
      } catch (err) {
        console.error(err);
        alert('Failed to load products');
      }
    },
    async fetchUsers() {
      try {
        const res = await fetch('http://localhost:8080/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        this.users = await res.json();
      } catch (err) {
        console.error(err);
        alert('Failed to load users');
      }
    },
    async fetchReviews() {
      try {
        const res = await fetch('http://localhost:8080/reviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        this.allReviews = await res.json();
      } catch (err) {
        console.error(err);
        alert('Failed to load reviews');
      }
    },
    loadReviewForEdit() {
      if (!this.reviewIdToEdit) {
        this.editingReview = this.getDefaultReview();
        return;
      }
      const review = this.allReviews.find(r => r.ReviewID === this.reviewIdToEdit);
      if (review) {
        this.editingReview = {
          ProductID: review.ProductID,
          UserID: review.UserID,
          Rating: review.Rating,
          Comment: review.Comment
        };
      }
    },
    async submitReview() {
      try {
        const res = await fetch('http://localhost:8080/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newReview),
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Failed to create review');
        }
        alert('Review created!');
        this.newReview = this.getDefaultReview();
        await this.fetchReviews();
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to create review');
      }
    },
    async updateReview() {
      if (!this.reviewIdToEdit) return alert('Select a Review ID to edit.');
      try {
        const res = await fetch(`http://localhost:8080/reviews/${this.reviewIdToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editingReview),
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Failed to update review');
        }
        alert('Review updated!');
        this.editingReview = this.getDefaultReview();
        this.reviewIdToEdit = null;
        await this.fetchReviews();
      } catch (err) {
        console.error(err);
        alert(err.message || 'Failed to update review');
      }
    },
    async deleteReview() {
      if (!this.reviewIdToDelete) return alert('Select a Review ID to delete.');
      if (!confirm('Are you sure you want to delete this review?')) return;
      try {
        const res = await fetch(`http://localhost:8080/reviews/${this.reviewIdToDelete}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete review');
        alert('Review deleted!');
        this.reviewIdToDelete = null;
        await this.fetchReviews();
      } catch (err) {
        console.error(err);
        alert('Failed to delete review.');
      }
    }
  }
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
      <h1>Product Reviews</h1>
      <ReviewsTable :items="allReviews" />
    </section>

    <section class="form-section">

      <div class="form-block">
        <h3>Create Review</h3>
        <form @submit.prevent="submitReview">
          <select v-model.number="newReview.ProductID" required>
            <option disabled value="">Select a product</option>
            <option v-for="product in products" :key="product.ProductID" :value="product.ProductID">
              {{ product.ProductName }} (ID: {{ product.ProductID }})
            </option>
          </select>

          <select v-model.number="newReview.UserID" required>
            <option disabled value="">Select a user</option>
            <option v-for="user in users" :key="user.UserID" :value="user.UserID">
              {{ user.FirstName }} {{ user.LastName }} (ID: {{ user.UserID }})
            </option>
          </select>

          <select v-model.number="newReview.Rating" required>
            <option disabled value="">Select rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>

          <textarea v-model="newReview.Comment" placeholder="Comment" required></textarea>

          <button type="submit">Create</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Edit Review</h3>
        <select v-model.number="reviewIdToEdit" @change="loadReviewForEdit" required>
          <option disabled value="">Select a Review ID</option>
          <option v-for="review in allReviews" :key="review.ReviewID" :value="review.ReviewID">
            Review #{{ review.ReviewID }} (Product ID: {{ review.ProductID }})
          </option>
        </select>

        <form @submit.prevent="updateReview">
          <select v-model.number="editingReview.Rating" required>
            <option disabled value="">Select new rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>

          <textarea v-model="editingReview.Comment" placeholder="New comment" required></textarea>

          <button type="submit">Update</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Delete Review</h3>
        <select v-model.number="reviewIdToDelete" required>
          <option disabled value="">Select a Review ID</option>
          <option v-for="review in allReviews" :key="review.ReviewID" :value="review.ReviewID">
            Review #{{ review.ReviewID }} (Product ID: {{ review.ProductID }})
          </option>
        </select>

        <button @click="deleteReview" class="danger">Delete</button>
      </div>

      <div class="form-block">
        <button @click="fetchReviews">Refresh Reviews</button>
      </div>

    </section>
  </main>
</template>

<style src="@/assets/styles.css"></style>
