<template>
    <section class="main" v-if="toy">
        <form @submit.prevent="editToy">
            <input type="text" v-model="toy.name" />
            <input type="number" v-model="toy.price" />
            <span v-for="(label, idx) in toy.labels" :key="label">
                <input type="text" v-model="toy.labels[idx]" />
            </span>
            <button>Submit</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch({ type: 'setCurrToy', id: this.$route.params.toyId })
    },
    methods: {
        editToy() {
            this.$store.dispatch({ type: 'editToy', toy: this.toy })
                .then(() => this.$router.push('/'))
        }
    },
    computed: {
        toy() {
            return this.$store.getters.currToy
        }
    }

}
</script>