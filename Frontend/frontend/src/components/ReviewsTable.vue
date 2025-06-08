<script>
export default {
  name: 'ReviewsTable',
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
          <th>Review ID</th>
          <th>Rating</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.ReviewID">
          <td>{{ item.ReviewID }}</td>
          <td>{{ item.Rating }}</td>
          <td>{{ item.Comment}}</td>        
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="@/assets/table.css"></style>
