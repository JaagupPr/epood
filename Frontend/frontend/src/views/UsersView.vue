<script>
import UsersTable from '@/components/UsersTable.vue';

export default {
  name: 'UsersView',
  components: { UsersTable },
  data() {
    return {
      allUsers: [],
      newUser: this.getDefaultUser(),
      userToEdit: this.getDefaultUser(),
      userIdToEdit: null,
      userIdToDelete: null,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    getDefaultUser() {
      return {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        Address: '',
        UserType: '',
        Password: '',
        SecureLevel: 0,
        LevelKey: '',
      };
    },
    async fetchUsers() {
      try {
        const res = await fetch('http://localhost:8080/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        this.allUsers = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load users.');
      }
    },
    async createUser() {
      try {
        const res = await fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newUser),
        });
        if (!res.ok) throw new Error('Failed to create user');
        alert('User created!');
        this.newUser = this.getDefaultUser();
        await this.fetchUsers();
      } catch (err) {
        console.error(err);
        alert('Error creating user.');
      }
    },
    async loadUserForEdit() {
      if (!this.userIdToEdit) return;
      try {
        const res = await fetch(`http://localhost:8080/users/${this.userIdToEdit}`);
        if (!res.ok) throw new Error('Failed to load user');
        const user = await res.json();
        this.userToEdit = {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          PhoneNumber: user.PhoneNumber,
          Address: user.Address,
          UserType: user.UserType,
          Password: '',
          SecureLevel: user.SecureLevel,
          LevelKey: user.LevelKey,
        };
      } catch (err) {
        console.error(err);
        alert('Error loading user.');
      }
    },
    async editUser() {
      if (!this.userIdToEdit) return alert('Select a user to edit.');
      try {
        const data = { ...this.userToEdit };
        if (!data.Password) delete data.Password;
        const res = await fetch(`http://localhost:8080/users/${this.userIdToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update user');
        alert('User updated!');
        this.userToEdit = this.getDefaultUser();
        this.userIdToEdit = null;
        await this.fetchUsers();
      } catch (err) {
        console.error(err);
        alert('Error updating user.');
      }
    },
    async deleteUser(id) {
      if (!id) return alert('Select a user to delete.');
      if (!confirm('Are you sure you want to delete this user?')) return;
      try {
        const res = await fetch(`http://localhost:8080/users/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete user');
        alert('User deleted!');
        this.userIdToDelete = null;
        await this.fetchUsers();
      } catch (err) {
        console.error(err);
        alert('Error deleting user.');
      }
    },
  },
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
         <h1>Users</h1>
      <UsersTable :items="allUsers" />
    </section>

    <section class="form-section">
      <div class="form-block">
        <h3>Create User</h3>
        <form @submit.prevent="createUser">
          <input v-model="newUser.FirstName" placeholder="First Name" required />
          <input v-model="newUser.LastName" placeholder="Last Name" required />
          <input v-model="newUser.Email" type="email" placeholder="Email" required />
          <input v-model="newUser.PhoneNumber" placeholder="Phone Number" required />
          <input v-model="newUser.Address" placeholder="Address" required />
          <select v-model="newUser.UserType" required>
            <option value="" disabled>Select User Type</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Admin">Admin</option>
          </select>
          <input v-model="newUser.Password" type="password" placeholder="Password" required />
          <button type="submit">Create</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Edit User</h3>
        <select v-model.number="userIdToEdit" @change="loadUserForEdit">
          <option value="" disabled>Select a user to edit</option>
          <option v-for="user in allUsers" :key="user.UserID" :value="user.UserID">
            User #{{ user.UserID }} ({{ user.FirstName }} {{ user.LastName }})
          </option>
        </select>
        <form @submit.prevent="editUser">
          <input v-model="userToEdit.FirstName" placeholder="First Name" required />
          <input v-model="userToEdit.LastName" placeholder="Last Name" required />
          <input v-model="userToEdit.Email" type="email" placeholder="Email" required />
          <input v-model="userToEdit.PhoneNumber" placeholder="Phone Number" required />
          <input v-model="userToEdit.Address" placeholder="Address" required />
          <select v-model="userToEdit.UserType" required>
            <option value="">Select User Type</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Admin">Admin</option>
          </select>
          <input v-model="userToEdit.Password" type="password" placeholder="Password (optional)" />
          <button type="submit">Update</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Delete User</h3>
        <select v-model.number="userIdToDelete">
          <option value="" disabled>Select a user to delete</option>
          <option v-for="user in allUsers" :key="user.UserID" :value="user.UserID">
            User #{{ user.UserID }} ({{ user.FirstName }} {{ user.LastName }})
          </option>
        </select>
        <button @click="deleteUser(userIdToDelete)" class="danger">Delete</button>
      </div>

      <div class="form-block">
        <button @click="fetchUsers">Refresh Users</button>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/styles.css"></style>
