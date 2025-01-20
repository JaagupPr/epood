<script>
import UsersTable from '../components/UsersTable.vue';

export default {
  components: { 
    UsersTable
  },
  data() { 
    return {
      allUsers: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:8080/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      this.allUsers = await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
}
</script>

<template>
  <main>
    <UsersTable :items="allUsers" />
  </main>
</template>
