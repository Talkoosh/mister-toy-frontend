import { reviewService } from "../../services/review.service.js";

export const reviewStore = {
    state() {
        return {
            reviews: []
        }
    },
    mutations: {
        loadReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { reviewToAdd }) {
            state.reviews.unshift(reviewToAdd)
        }
    },
    actions: {
        async loadToyReviews({ commit }, { toyId }) {
            const reviews = await reviewService.getReviews({ byToyId: toyId });
            commit({ type: 'loadReviews', reviews })
        },
        async addReview({ commit }, { review }) {
            try {
                const reviewToAdd = await reviewService.addReview(review)
                commit({ type: 'addReview', reviewToAdd })
            } catch (err) {
                console.log(err);
            }
        },
    },
    getters: {
        reviewsForDisplay(state){
            if(state.reviews.length || state.reviews) return JSON.parse(JSON.stringify(state.reviews))
        }
    }
}