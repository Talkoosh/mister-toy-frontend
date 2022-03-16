<template>
    <section>
        <ul>
            <li v-for="toy in toys" :key="toy._id">
                <toy-preview @toy-remove="removeToy" :toy="toy"></toy-preview>
            </li>
        </ul>
    </section>
</template>

<script>
import toyPreview from "./toy-preview.vue"
    export default {
        props: {
            toys: Array
        },
        components:{
            toyPreview
        },
        methods:{
            removeToy(toyId){
                this.$emit('toy-remove', toyId)
            }
        }
    }
</script>