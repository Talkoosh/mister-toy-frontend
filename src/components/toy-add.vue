<template>
    <form @submit.prevent="addToy">
        <input type="text" v-model="toy.name"/>
        <input type="number" v-model="toy.price"/>
        <input type="checkbox" v-model="toy.inStock"/>
        <el-select multiple v-model="toy.labels" class="m-2" placeholder="Select" size="large">
            <el-option
                v-for="label in labels"
                :key="label"
                :label="label"
                :value="label"
                
            />
        </el-select>
        <button>Save</button>
    </form>
</template>

<script>``
    export default {
        data(){
            return {
                toy: {
                    name: '',
                    price: null, 
                    labels: [],
                    inStock: true
                }
            }
        },
        methods: {
            addToy(){
                this.toy.createdAt = Date.now();
                this.$emit('toy-add', JSON.parse(JSON.stringify(this.toy)));
            }
        },
        computed:{
            labels(){
                return this.$store.getters.toyLabels
            }
        }   
    }
</script>