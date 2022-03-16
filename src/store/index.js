import { createStore } from 'vuex';
import { toyStore } from './modules/toyStore.js';
const store = createStore({
    strict: true,
    modules: {
        toyStore
    },
})

export default store