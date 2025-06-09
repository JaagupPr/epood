<script>
import OrderItemsTable from '@/components/OrderItemsTable.vue';

export default {
  components: { OrderItemsTable },
  data() {
    return {
      allOrderItems: [],
      orders: [],
      products: [],
      newOrderItem: this.getDefaultOrderItem(),
      orderItemIdToEdit: null,
      editingOrderItem: this.getDefaultOrderItem(),
      orderItemIdToDelete: null,
    };
  },
  async created() {
    await this.fetchOrderItems();
    await this.fetchOrders();
    await this.fetchProducts();
  },
  methods: {
    getDefaultOrderItem() {
      return {
        OrderID: null,
        ProductID: null,
        Quantity: 1,
        Price: 0
      };
    },
    async fetchOrders() {
      try {
        const res = await fetch('http://localhost:8080/orders');
        if (!res.ok) throw new Error('Failed to fetch orders');
        this.orders = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load orders.');
      }
    },
    async fetchProducts() {
      try {
        const res = await fetch('http://localhost:8080/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        this.products = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load products.');
      }
    },
    async fetchOrderItems() {
      try {
        const res = await fetch('http://localhost:8080/orderitems');
        if (!res.ok) throw new Error('Failed to fetch order items');
        this.allOrderItems = await res.json();
      } catch (err) {
        console.error(err);
        alert('Could not load order items.');
      }
    },
    loadOrderItemForEdit() {
      if (!this.orderItemIdToEdit) {
        this.editingOrderItem = this.getDefaultOrderItem();
        return;
      }
      const orderItem = this.allOrderItems.find(oi => oi.OrderItemID === this.orderItemIdToEdit);
      if (orderItem) {
        this.editingOrderItem = { ...orderItem };
      }
    },
    updatePrice() {
      const product = this.products.find(p => p.ProductID === this.newOrderItem.ProductID);
      if (product) this.newOrderItem.Price = product.Price;
    },
    async createOrderItem() {
      try {
        const res = await fetch('http://localhost:8080/orderitems', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newOrderItem),
        });
        if (!res.ok) throw new Error('Create failed');
        alert('Order item created!');
        this.newOrderItem = this.getDefaultOrderItem();
        await this.fetchOrderItems();
      } catch (err) {
        console.error(err);
        alert('Error creating order item.');
      }
    },
    async updateOrderItem() {
      if (!this.orderItemIdToEdit) return alert('Enter an Order Item ID to edit.');
      try {
        const res = await fetch(`http://localhost:8080/orderitems/${this.orderItemIdToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.editingOrderItem),
        });
        if (!res.ok) throw new Error('Update failed');
        alert('Order item updated!');
        this.editingOrderItem = this.getDefaultOrderItem();
        this.orderItemIdToEdit = null;
        await this.fetchOrderItems();
      } catch (err) {
        console.error(err);
        alert('Error updating order item.');
      }
    },
    async deleteOrderItem() {
      if (!this.orderItemIdToDelete) return alert('Enter an Order Item ID to delete.');
      if (!confirm('Are you sure you want to delete this order item?')) return;
      try {
        const res = await fetch(`http://localhost:8080/orderitems/${this.orderItemIdToDelete}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Delete failed');
        alert('Order item deleted!');
        this.orderItemIdToDelete = null;
        await this.fetchOrderItems();
      } catch (err) {
        console.error(err);
        alert('Error deleting order item.');
      }
    }
  }
};
</script>

<template>
  <main class="dashboard">
    <section class="table-section">
      <h1>Order Items</h1>
      <OrderItemsTable :items="allOrderItems" />
    </section>

    <section class="form-section">
      <div class="form-block">
        <h3>Create Order Item</h3>
        <form @submit.prevent="createOrderItem">
          <select v-model.number="newOrderItem.OrderID" required>
            <option disabled value="">Select Order</option>
            <option v-for="order in orders" :key="order.OrderID" :value="order.OrderID">
              Order #{{ order.OrderID }} (User: {{ order.UserID }})
            </option>
          </select>

          <select v-model.number="newOrderItem.ProductID" required @change="updatePrice">
            <option disabled value="">Select Product</option>
            <option v-for="product in products" :key="product.ProductID" :value="product.ProductID">
              {{ product.ProductName }} (€{{ product.Price }})
            </option>
          </select>
          <input v-model.number="newOrderItem.Quantity" type="number" min="1" placeholder="Quantity" required/>
          <input v-model.number="newOrderItem.Price" type="number"min="0" step="0.01" placeholder="Price" required/>

          <button type="submit">Create</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Edit Order Item</h3>
        <select v-model.number="orderItemIdToEdit" @change="loadOrderItemForEdit" required>
          <option disabled value="">Select an Order Item ID</option>
          <option v-for="orderItem in allOrderItems" :key="orderItem.OrderItemID" :value="orderItem.OrderItemID">
            Order Item #{{ orderItem.OrderItemID }} (OrderID: {{ orderItem.OrderID }})
          </option>
        </select>

        <form @submit.prevent="updateOrderItem">
          <select v-model.number="editingOrderItem.OrderID" required disabled>
            <option :value="editingOrderItem.OrderID">
              Order #{{ editingOrderItem.OrderID }}
            </option>
          </select>

          <select v-model.number="editingOrderItem.ProductID" required disabled>
            <option :value="editingOrderItem.ProductID">
              Product #{{ editingOrderItem.ProductID }}
            </option>
          </select>

          <input v-model.number="editingOrderItem.Quantity" type="number" min="1" placeholder="Quantity" required/>
          <input v-model.number="editingOrderItem.Price" type="number" min="0" step="0.01" placeholder="Price" required/>

          <button type="submit">Update</button>
        </form>
      </div>

      <div class="form-block">
        <h3>Delete Order Item</h3>
        <select v-model.number="orderItemIdToDelete" required>
          <option disabled value="">Select an Order Item ID</option>
          <option v-for="orderItem in allOrderItems" :key="orderItem.OrderItemID" :value="orderItem.OrderItemID">
            Order Item #{{ orderItem.OrderItemID }} (Order: {{ orderItem.OrderID }})
          </option>
        </select>

        <button @click="deleteOrderItem" class="danger">Delete</button>
      </div>

      <div class="form-block">
        <button @click="fetchOrderItems">Refresh Order Items</button>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/styles.css"></style>
