import { httpService } from './http.service.js'

export const reviewService = {
    getReviews,
    addReview,
    deleteReview
}

async function getReviews(filterBy = {}) {
    try {
        const reviews = await httpService.get('review/', filterBy);
        return reviews;
    } catch (err) {
        return Promise.reject(err)
    }
}

async function addReview(review) {
    try {
        const addedReview = await httpService.post('review/', review);
        return addedReview;
    } catch (err) {
        return Promise.reject(err)
    }
}

async function deleteReview(reviewId) {
    try {
        await httpService.delete('review/' + reviewId)
        return
    } catch (err) {
        return Promise.reject(err)
    }
}