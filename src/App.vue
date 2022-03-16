<template>
    <app-header></app-header>
    <router-view></router-view>
</template>

<script>
import appHeader from './components/appHeader.vue'
import toyApp from './views/toy-app.vue'

export default {
    created() {
        this.$store.dispatch('loadToys')
    },
    components: {
        appHeader,
        toyApp
    },
}
</script>

<style></style>