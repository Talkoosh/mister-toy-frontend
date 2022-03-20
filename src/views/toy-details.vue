<template>
    <section v-if="toy" class="main">
        <h2>{{ toy.name }}</h2>
        <h4>Price: {{ toy.price }}</h4>
        <h4>Created At: {{ toyCreated }}</h4>
        <h3>Labels:</h3>
        <ul>
            <li v-for="label in toy.labels" :key="label">
                <p>{{ label }}</p>
            </li>
        </ul>
        <div v-if="reviews">
            <h3>Reviews:</h3> 
                <div class="toy-review" v-for="review in reviews" :key="review._id">
                    <p>Review by: {{review.byUser ? review.byUser.fullname : userFullname}}</p>
                    <p>{{review.txt}}</p>
                </div>
        </div>
        <h1>Add a review</h1>
        <form @submit.prevent="addReview">
            <label>
                <h4>Review:</h4>
                <input type="text" v-model="review.txt" />
                <button>Submit review</button>
            </label>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            review: {
                txt: ''
            }
        }
    },
    created() {
        (async () => {
            await this.$store.dispatch({ type: 'setCurrToy', id: this.$route.params.toyId })
            const toyId = this.$store.getters.currToy._id
            await this.$store.dispatch({ type: 'loadToyReviews', toyId })
        })()

    },
    computed: {
        toy() {
            return this.$store.getters.currToy
        },
        toyCreated() {
            return new Date(this.toy.createdAt)
        },
        reviews() {
            return this.$store.getters.reviewsForDisplay
        },
        userFullname(){
            return this.$store.getters.currUser.fullname
        }
    },
    methods: {
        addReview() {
            this.review.toyId = this.toy._id
            console.log(this.review);
            this.$store.dispatch({ type: 'addReview', review: this.review })
        }
    }
}
</script>

<style>
    .toy-review{
        border: 1px solid black;
        margin-bottom: 10px
    }
</style>