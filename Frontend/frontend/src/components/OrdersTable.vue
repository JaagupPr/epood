<script>
export default {
  name: "OrdersTable",
  props: {
    items: Array
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR'
      }).format(amount);
    }
  }
};
</script>

<template>
  <div class="table-responsive">
    <table class="app-table">
      <thead>
        <tr>
          <th>Order Date</th>
          <th>Total Amount</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Shipping Address</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.OrderID">
          <td>{{ formatDate(item.OrderDate) }}</td>
          <td>{{ formatCurrency(item.TotalAmount) }}</td>
          <td>{{ item.OrderStatus }}</td>
          <td>{{ item.PaymentStatus }}</td>
          <td>{{ item.ShippingAddress }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style src="@/assets/table.css"></style>
