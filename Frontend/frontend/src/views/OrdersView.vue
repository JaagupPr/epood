<script>
import OrdersTable from '@/components/OrdersTable.vue';

export default {
  components: { 
    OrdersTable
  },
  data() { 
    return {
      allOrders: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');
      this.allOrders = await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }
};
</script>

<template>
  <main>
    <OrdersTable :items="allOrders" />
  </main>
</template>
