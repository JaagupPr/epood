<!-- ProductsTable.vue -->
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
                <th>ProductID</th>
                <th>ProductName</th>
                <th>ProductCategory</th>
                <th>ProductPrice</th>
                <th>ProductDescription</th>
                <th>Image</th>
                <th>ReleaseDateEU</th>


            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.ProductID">
                <td>{{ item.ProductID }}</td>
                <td>{{ item.ProductName }}</td>
                <td>{{ item.ProductCategory }}</td>
                <td>{{ item.ProductPrice }}</td>
                <td>{{ item.ProductDescription }}</td>
                <td>
                  <img :src="item.ImageURL" alt="Product Image" style="max-width: 100px; max-height: 100px;" />
                </td>
                <td>{{ item.ReleaseDateEU }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style src="@/assets/table.css"></style>
