<script>
import OrdersTable from '@/components/OrdersTable.vue';

export default {
  components: { OrdersTable },
  data() {
    return {
      allOrders: [],
      users: [],
      newOrder: this.getDefaultOrder(),
      orderIdToEdit: null,
      editingOrder: this.getDefaultOrder(),
      orderIdToDelete: null,
    };
  },
  async created() {
    await this.fetchOrders();
    await this.fetchUsers();
  },
  methods: {
    getDefaultOrder() {
      return {
        UserID: null,
        OrderDate: new Date().toISOString().slice(0, 16),
        TotalAmount: null,
        OrderStatus: 'Pending',
        ShippingAddress: '',
        PaymentStatus: 'Pending'
      };
    },
    async fetchUsers() {
      try {
        const res = await fetch('http://localhost:8080/users');
        if (!res.ok) throw new Error('Failed to fetch users');
        this.users = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load users.');
      }
    },
    async fetchOrders() {
      try {
        const res = await fetch('http://localhost:8080/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        this.allOrders = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load orders.');
      }
    },
    loadOrderForEdit() {
      if (!this.orderIdToEdit) {
        this.editingOrder = this.getDefaultOrder();
        return;
      }
      const order = this.allOrders.find(o => o.OrderID === this.orderIdToEdit);
      if (order) {
        this.editingOrder = {
          ...order,
          OrderDate: new Date(order.OrderDate).toISOString().slice(0, 16)
        };
      }
    },
    async createOrder() {
      try {
        const res = await fetch('http://localhost:8080/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newOrder),
        });
        if (!res.ok) throw new Error('Create failed');
        alert('Order created!');
        this.newOrder = this.getDefaultOrder();
        await this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert('Error creating order.');
      }
    },
    async updateOrder() {
      if (!this.orderIdToEdit) return alert('Enter an Order ID to edit.');
      try {
        const res = await fetch(`http://localhost:8080/orders/${this.orderIdToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editingOrder),
        });
        if (!res.ok) throw new Error('Update failed');
        alert('Order updated!');
        this.editingOrder = this.getDefaultOrder();
        this.orderIdToEdit = null;
        await this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert('Error updating order.');
      }
    },
    async deleteOrder() {
      if (!this.orderIdToDelete) return alert('Enter an Order ID to delete.');
      if (!confirm('Are you sure you want to delete this order?')) return;
      try {
        const res = await fetch(`http://localhost:8080/orders/${this.orderIdToDelete}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Delete failed');
        alert('Order deleted!');
        this.orderIdToDelete = null;
        await this.fetchOrders();
      } catch (err) {
        console.error(err);
        alert('Error deleting order.');
      }
    }
  }
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
      <h1>Orders</h1>
      <OrdersTable :items="allOrders" />
    </section>

    <section class="form-section">

      <div class="form-block">
        <h3>Create Order</h3>
        <form @submit.prevent="createOrder">
          <select v-model.number="newOrder.UserID" required>
            <option disabled value="">Select a user</option>
            <option v-for="user in users" :key="user.UserID" :value="user.UserID">
              {{ user.FirstName }} {{ user.LastName }} (ID: {{ user.UserID }})
            </option>
          </select>

          <input v-model="newOrder.OrderDate" type="datetime-local" required />
          <input v-model.number="newOrder.TotalAmount" type="number" step="0.01" placeholder="Total Amount (€)" required />

          <select v-model="newOrder.OrderStatus" required>
            <option disabled value="">Select Status</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <textarea v-model="newOrder.ShippingAddress" placeholder="Shipping Address" required></textarea>

          <select v-model="newOrder.PaymentStatus" required>
            <option disabled value="">Select Payment Status</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

          <button type="submit">Create</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Edit Order</h3>
        <select v-model.number="orderIdToEdit" @change="loadOrderForEdit" required>
          <option disabled value="">Select an Order ID</option>
          <option v-for="order in allOrders" :key="order.OrderID" :value="order.OrderID">
            Order #{{ order.OrderID }} — {{ order.OrderStatus }}
          </option>
        </select>

        <form @submit.prevent="updateOrder">
          <select v-model.number="editingOrder.UserID" required>
            <option disabled value="">Select a user</option>
            <option v-for="user in users" :key="user.UserID" :value="user.UserID">
              {{ user.FirstName }} {{ user.LastName }} (ID: {{ user.UserID }})
            </option>
          </select>

          <input v-model="editingOrder.OrderDate" type="datetime-local" required />
          <input v-model.number="editingOrder.TotalAmount" type="number" step="0.01" placeholder="Total Amount (€)" required />

          <select v-model="editingOrder.OrderStatus" required>
            <option disabled value="">Select Status</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>

          <textarea v-model="editingOrder.ShippingAddress" placeholder="Shipping Address" required></textarea>

          <select v-model="editingOrder.PaymentStatus" required>
            <option disabled value="">Select Payment Status</option>
            <option>Pending</option>
            <option>Paid</option>
            <option>Unpaid</option>
          </select>

          <button type="submit">Update</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Delete Order</h3>
        <select v-model.number="orderIdToDelete" required>
          <option disabled value="">Select an Order ID</option>
          <option v-for="order in allOrders" :key="order.OrderID" :value="order.OrderID">
            Order #{{ order.OrderID }} — {{ order.OrderStatus }}
          </option>
        </select>

        <button @click="deleteOrder" class="danger">Delete</button>
      </div>

      <div class="form-block">
        <button @click="fetchOrders">Refresh Orders</button>
      </div>

    </section>
  </main>
</template>

<style src="@/assets/styles.css"></style>
