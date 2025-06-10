<script>
export default {
  name: 'ProductUserTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <div class="table-responsive">
    <table class="app-table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>User Name</th>
          <th>Product ID</th>
          <th>Product Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="`${item.UserID}-${item.ProductID}`">
          <td>{{ item.UserID }}</td>
          <td>{{ item.FirstName }} {{ item.LastName }}</td>
          <td>{{ item.ProductID }}</td>
          <td>{{ item.ProductName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="@/assets/table.css"></style>