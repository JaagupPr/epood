<!-- UsersTable.vue -->
<script>
export default {
    name: "UsersTable",
    props: {
        items: Array
    }
}
</script>

<template>
    <div class="table-responsive">
        <table class="app-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>User Type</th>
                    <th>Password</th>
                    <th>SecureLevel</th>
                    <th>LevelKey</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.UserID">
                    <td>{{ item.FirstName }}</td>
                    <td>{{ item.LastName }}</td>
                    <td>{{ item.Email }}</td>
                    <td>{{ item.PhoneNumber }}</td>
                    <td>{{ item.Address }}</td>
                    <td>
                        <span :class="['table-type', item.UserType.toLowerCase()]">
                            {{ item.UserType }}
                        </span>
                    </td>
                    <td>••••••••</td>
                    <td>{{ item.SecureLevel }}</td>
                    <td>{{ item.LevelKey }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style src="@/assets/table.css"></style>
