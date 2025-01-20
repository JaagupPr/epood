<script>
import ProductsTable from '@/components/ProductsTable.vue'

export default {
  components: { 
    ProductsTable,
  },
  data() { 
    return {
      allProducts: [],
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      this.allProducts = await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
};
</script>

<template>
  <main>
    <ProductsTable :items="allProducts" />
  </main>
</template>