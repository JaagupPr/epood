<script>
import ReviewsTable from '@/components/ReviewsTable.vue';

export default {
  components: { 
    ReviewsTable,
  },
  data() { 
    return {
      allReviews: [],
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/reviews');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      this.allReviews = await response.json();
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  },
};
</script>

<template>
  <main>
    <ReviewsTable :items="allReviews" />
  </main>
</template>