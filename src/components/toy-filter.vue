<template>
    <section class="toy-filter">
        <h2>Filter:</h2>
        <div>
            <el-input v-model="filterBy.name" placeholder="Please input" @input="setFilter" clearable />
            <el-select
                @change="setFilter"
                multiple
                v-model="filterBy.labels"
                class="m-2"
                placeholder="Select"
                size="large"
            >
            <el-option v-for="label in labels" :key="label" :label="label" :value="label" />
            </el-select>
            <el-checkbox v-model="filterBy.inStock" label="in stock" size="large" />
        </div>

        <h2>Sort:</h2>
        <div>
            <input type="radio" name="sortInput" id="sortA-Z" @input="setSort('abc')" />
            <label for="sortA-Z">ABC</label>
            <input type="radio" name="sortInput" id="sortPrice" @input="setSort('price')" />
            <label for="sortPrice">Price</label>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                name: '',
                inStock: true,
                labels: []
            }
        }
    },
    methods: {
        setFilter() {
            this.$emit('filter-set', { ...this.filterBy })
        },
        setSort(sortBy) {
            this.$emit('sort-set', sortBy)
        }
    },
    computed: {
        labels() {
            return this.$store.getters.toyLabels
        }
    },
    watch: {
        'filterBy.inStock'() { this.setFilter(); }
    }
}
</script>