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
        },
        logout(state){
            state.loggedInUser = null;
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
        },
        async logout({commit}){
            await userService.logout()
            commit('logout')
        }
    },
    getters : {
        currUser(state){
            if(state.loggedInUser) return JSON.parse(JSON.stringify(state.loggedInUser));
        }
    }
}