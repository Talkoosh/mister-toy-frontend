import { createStore } from 'vuex';
import { toyStore } from './modules/toyStore.js';
import { userStore } from './modules/user.store.js';
const store = createStore({
    strict: true,
    modules: {
        toyStore,
        userStore
    },
})

export default store