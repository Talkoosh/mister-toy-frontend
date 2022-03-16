<template>
    <section class="main">
        <h2>{{toy.name}}</h2>
        <h4>Price: {{toy.price}}</h4>
        <h4>Created At: {{toyCreated}}</h4>
        <h3>Labels:</h3>
        <ul>
            <li v-for="label in toy.labels" :key="label">
                <p>{{label}}</p>
            </li>
        </ul>
        <h3>Reviews:</h3>
        <ul>
            <li v-for="review in toy.reviews" :key="review">
                <p>{{review}}</p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    created() {
        this.$store.dispatch({ type: 'setCurrToy', id: this.$route.params.toyId })
    },
    computed: {
        toy() {
            return this.$store.getters.currToy
        },
        toyCreated(){
            return new Date(this.toy.createdAt)
        }
    }
}
</script>