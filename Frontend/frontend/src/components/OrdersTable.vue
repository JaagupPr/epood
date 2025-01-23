<script>
export default {
    name: "OrdersTable",
    props: {
        items: Object
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>UserID</th>
                <th>OrderDate</th>
                <th>TotalAmount</th>
                <th>OrderStatus</th>
                <th>ShippingAddress</th>
                <th>PaymentStatus</th>



            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.OrderID">
                <td>{{ item.UserID }}</td>
                <td>{{ item.OrderDate }}</td>
                <td>{{ item.TotalAmount }}</td>
                <td>{{ item.OrderStatus }}</td>
                <td>{{ item.ShippingAddress }}</td>
                <td>{{ item.PaymentStatus }}</td>

            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>