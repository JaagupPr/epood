<script>
import ProductDetails from './product/ProductDetails.vue';
import ProductForm from './product/ProductForm.vue';

export default {
    name: "ProductInfoModal",
    components: {
        ProductDetails,
        ProductForm
    },
    props: {
        productInModal: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isEditing: false,
            modifiedProduct: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedProduct = { ...this.productInModal };
            this.isEditing = true;
        },
        cancelEditing() {
            this.isEditing = false;
        },
        saveModifiedProduct() {
            this.$emit('productUpdated', this.modifiedProduct);
            this.isEditing = false;
        }
    }
}
</script>

<template>
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ isEditing ? 'Edit Product' : 'Product Details' }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                
                <div class="modal-body">
                    <ProductDetails v-if="!isEditing" :productInModal="productInModal" />
                    <ProductForm v-else
                        :ProductID="modifiedProduct.ProductID"
                        :ProductName="modifiedProduct.ProductName"
                        :ProductCategory="modifiedProduct.ProductCategory"
                        :ProductPrice="modifiedProduct.ProductPrice"
                        :ProductDescription="modifiedProduct.ProductDescription"
                        :ImageURL="modifiedProduct.ImageURL"
                        :ReleaseDateEU="modifiedProduct.ReleaseDateEU"
                        @update:ProductName="modifiedProduct.ProductName = $event"
                        @update:ProductCategory="modifiedProduct.ProductCategory = $event"
                        @update:ProductPrice="modifiedProduct.ProductPrice = $event"
                        @update:ProductDescription="modifiedProduct.ProductDescription = $event"
                        @update:ImageURL="modifiedProduct.ImageURL = $event"
                        @update:ReleaseDateEU="modifiedProduct.ReleaseDateEU = $event"
                    />
                </div>
                
                <div class="modal-footer">
                    <template v-if="!isEditing">
                        <button class="btn btn-primary" @click="startEditing">
                            Edit
                        </button>
                        <button class="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn btn-success" @click="saveModifiedProduct">
                            Save
                        </button>
                        <button class="btn btn-secondary" @click="cancelEditing">
                            Cancel
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>