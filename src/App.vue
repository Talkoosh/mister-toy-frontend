<template>
    <app-header @logout="logout" :user="user"></app-header>
    <router-view></router-view>
</template>

<script>
import appHeader from './components/appHeader.vue'
import toyApp from './views/toy-app.vue'

export default {
    created() {
        this.$store.dispatch('loadToys')
        this.$store.dispatch('loadUser')
    },
    components: {
        appHeader,
        toyApp
    },
    computed:{
        user(){
            return this.$store.getters.currUser
        }
    },
    methods:{
        async logout(){
            await this.$store.dispatch('logout')
            this.$router.push('/')
        }
    }
}
</script>

<style></style>