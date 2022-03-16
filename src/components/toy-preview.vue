<template>
    <pre>

<router-link :to="'/edit/' + toy._id">{{ toy.name }} </router-link>  | {{ toy.price }} | <span v-for="label in toy.labels" :key="label">{{ label }},</span>
        <button @click="removeToy(toy._id)">Remove</button>
        <router-link :to="'/toy/' + toy._id">Details</router-link>
    </pre>
</template>

<script>
export default {
    props: {
        toy: Object
    },
    methods: {
        removeToy(toyId) {
            this.$emit('toy-remove', toyId)
        }
    }
}
</script>