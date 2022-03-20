import { createStore } from 'vuex';
import { toyStore } from './modules/toyStore.js';
import { userStore } from './modules/user.store.js';
import { reviewStore } from './modules/review.store.js';
const store = createStore({
    strict: true,
    modules: {
        toyStore,
        userStore,
        reviewStore
    },
})

export default store