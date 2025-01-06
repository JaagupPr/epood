<script>
export default {
    name: "OrdersTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>OrderID</th>
                <th>BuyerID</th>
                <th>OrderDate</th>
                <th>TotalAmount</th>
                <th>OrderStatus</th>


            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{ item.OrderID }}</td>
                <td>{{ item.BuyerID }}</td>
                <td>{{ item.OrderDate }}</td>
                <td>{{ item.TotalAmount }}</td>
                <td>{{ item.OrderStatus }}</td>
                <td>{{ item.BuyerID }}</td>

            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>