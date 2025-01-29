<script>
export default {
    name: "ReviewsTable",
    props: {
        items: Object
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>ProductID</th>
                <th>UserID</th>
                <th>Rating</th>
                <th>Comment</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.ReviewID">
                <td>{{ item.ProductID }}</td>
                <td>{{ item.UserID }}</td>
                <td>{{ item.Rating }}</td>
                <td>{{ item.Comment }}</td>


            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>
