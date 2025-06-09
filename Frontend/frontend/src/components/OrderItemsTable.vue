<script>
export default {
    name: "OrderItemsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table responsive">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>OrderID</th>
                <th>ProductID</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.OrderItemID">
                <td>{{ item.OrderItemID }}</td>
                <td>{{ item.OrderID }}</td>
                <td>{{ item.ProductID }}</td>
                <td>{{ item.Quantity }}</td>
                <td>{{ item.Price }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style src="@/assets/table.css"></style>
