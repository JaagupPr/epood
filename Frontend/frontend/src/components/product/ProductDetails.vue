<!-- ProductDetails.vue -->
<script>
export default {
    name: ["ProductDetails"],
    props: ['productInModal'],    
}
</script>

<template>
    <table class="table table-striped">
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{productInModal.ProductID}}</td>
            </tr>

            <tr>
                <th>Name</th>
                <td>{{productInModal.ProductName}}</td>
            </tr>

            <tr>
                <th>Category</th>
                <td>{{productInModal.ProductCategory}}</td>
            </tr>

            <tr>
                <th>Price</th>
                <td>{{productInModal.ProductPrice}}</td>
            </tr>
              <tr>
                <th>ProductDescription</th>
                <td>{{productInModal.ProductDescription}}</td>
            </tr>
            <tr>
                <th>ImageURL</th>
                <td>{{productInModal.ImageURL}}</td>
            </tr>
            <tr>
                <th>Release Date</th>
                <td>{{productInModal.ReleaseDateEU}}</td>
            </tr>
        </tbody>
    </table>
</template>