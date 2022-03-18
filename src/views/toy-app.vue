<template>
    <section class="main">
        <toy-filter @sort-set="setSort" @filter-set="setFilter"></toy-filter>
        <toy-list @toy-remove="removeToy" :toys="toys"></toy-list>
        <toy-add @toy-add="addToy"></toy-add>
    </section>
</template>

<script>
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'
import toyAdd from '../components/toy-add.vue'
export default {
    components: {
        toyList,
        toyFilter,
        toyAdd
    },
    computed: {
        toys() {
            return this.$store.getters.filteredToys
        },
        
    },
    methods: {
        addToy(toyToAdd) {
            this.$store.dispatch({ type: 'addToy', toyToAdd })
        },
        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
        },
        setFilter(filterBy) {
            this.$store.commit({ type: 'setFilter', filterBy })
        },
        setSort(sortBy) {
            this.$store.commit({ type: 'setSort', sortBy })
        }
    }

}
</script>

<style></style>