<template>
        <h1 v-if="user">Hello {{user.fullname}}</h1>
    <section class="app-header">
        <router-link to="/toy">Toys</router-link>
        <router-link to="/toy/chart">Chart</router-link>
    </section>
</template>


<script>
export default {
    props: {
        user: Object
    },
}
</script>