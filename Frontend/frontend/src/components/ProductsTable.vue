<script>
export default {
    name: "ProductsTable",
    props: {
        items: Object
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>ProductName</th>
                <th>ProductCategory</th>
                <th>ProductPrice</th>
                <th>ProductDescription</th>
                <th>ImageURL</th>
                <th>ReleaseDateEU</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{ item.ProductName }}</td>
                <td>{{ item.ProductCategory }}</td>
                <td>{{ item.ProductPrice }}</td>
                <th>{{ item.ProductDescription}}</th>
                <td><img :src="item.ImageURL" alt="Product Image" /></td>
                <td>{{ item.ReleaseDateEU }}</td>

            </tr>
        </tbody>
    </table>
</template>


<style scoped>
</style>
