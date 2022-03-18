<template>
    <section class="app-header">
        <div v-if="user">
            <h1 >Hello {{ user.fullname }}</h1>
            <el-button type="primary" @click="logout">Logout</el-button>
        </div>
        <div class="header-links">
            <router-link to="/toy">Toys</router-link>
            <router-link to="/toy/chart">Chart</router-link>
        </div>
    </section>
</template>


<script>
export default {
    props: {
        user: Object
    },
    computed: {
        isAdmin() {
            return this.user.isAdmin
        }
    },
    methods: {
        logout(){
            this.$emit('logout')
        }
    }
}
</script>