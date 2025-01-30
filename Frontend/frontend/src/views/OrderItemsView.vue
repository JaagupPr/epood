<script>
import OrderItemsTable from '@/components/OrderItemsTable.vue';

export default {
  components: { 
    OrderItemsTable
  },
  data() { 
    return {
      allOrderItems: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/OrderItems');
      if (!response.ok) throw new Error('Failed to fetch orderItems');
      this.allOrderItems = await response.json();
    } catch (error) {
      console.error('Error fetching orderItems:', error);
    }
  }
};
</script>

<template>
  <main>
    <OrderItemsTable :items="allOrderItems" />
  </main>
</template>
