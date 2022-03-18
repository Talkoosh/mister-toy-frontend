import { userService } from "../../services/user.service.js";

export const userStore = {
    state() {
        return {
            loggedInUser: null
        }
    },
    mutations: {
        login(state, { user }) {
            state.loggedInUser = user;
        }
    },
    actions: {
        async signup({ commit }, { newUser }) {
            try {
                const user = await userService.signup(newUser);
                commit({ type: 'login', user })
            } catch(err){
                console.log(err);
            }
        },
        async login({commit}, {loginUser}){
            try{
                const user = await userService.login(loginUser);
                commit({type: 'login', user})
            } catch(err){
                // console.log(err)
            }
        }
    }
}