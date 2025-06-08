<!-- ProductForm.vue -->
<script>
export default {
    name: "ProductForm",
    props: ['ProductID','ProductName','ProductCategory','ProductPrice','ReleaseDateEU','ImageURL','ProductDescription'
    ],
    emits: ['update:ProductName','update:ProductCategory','update:ProductPrice','update:ReleaseDateEU','update:ImageURL','update:ProductDescription'
    ]
}
</script>

<template>
    <table class="table table-striped">
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{ ProductID }}</td>
            </tr>

            <tr>
                <th>Name</th>
                <td>
                    <input:value="ProductName" 
                    @input="$emit('update:ProductName', $event.target.value)"/>
                </td>
            </tr>

            <tr>
                <th>Category</th>
                <td><input :value="ProductCategory" 
                    @input="$emit('update:ProductCategory', $event.target.value)"/>
                </td>
            </tr>

            <tr>
                <th>Price</th>
                <td><input :value="ProductPrice"
                    @input="$emit('update:ProductPrice', $event.target.value)"/>
                </td>
            </tr>

            <tr>
                <th>Release Date</th>
                <td><input :value="ReleaseDateEU" 
                    @input="$emit('update:ProductDescription', $event.target.value)"/>
                </td>
            </tr>
                        <tr>
                <th>Product Description</th>
                <td><input :value="ReleaseDateEU" 
                    @input="$emit('update:ReleaseDateEU', $event.target.value)"/>
                </td>
            </tr>

            <tr>
                <th>Image URL</th>
                <td><input :value="ImageURL"
                @input="$emit('update:ImageURL', $event.target.value)"/>
                </td>
            </tr>
        </tbody>
    </table>
</template>
