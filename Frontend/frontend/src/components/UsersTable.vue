<script>
export default {
    name: "UsersTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <table class="table table-striped">
        <thead class="table-dark">
            <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>UserType</th>
                <th>Password</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.UserID">
                <td>{{ item.FirstName }}</td>
                <td>{{ item.LastName }}</td>
                <td>{{ item.Email }}</td>
                <td>{{ item.PhoneNumber }}</td>
                <td>{{ item.Address }}</td>
                <td>{{ item.UserType }}</td>
                <td>{{ item.Password }}</td>

            </tr>
        </tbody>
    </table>
</template>

<style scoped>
</style>
