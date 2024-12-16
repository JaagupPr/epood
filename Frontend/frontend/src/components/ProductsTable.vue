<script>
export default {
    name: "ProductsTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>ProductName</th>
                <th>ReleaseDateEU</th>
                <th>ProductStockQuantity</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{ item.GameName }}</td>
                <td>{{ item.ReleaseDateEU }}</td>
                <td>{{ item.ProductStockQuantity }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>