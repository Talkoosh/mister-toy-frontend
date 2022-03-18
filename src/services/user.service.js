import axios from 'axios'

const authAxios = axios.create({
    withCredentials: true,
})

export const userService = {
    signup,
    login
}

const API = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : 'http://localhost:3030/api/auth/';

async function signup(user) {
    try {
        const newUser = await authAxios.post(API + 'signup', user);
        return newUser;
    } catch (err) {
        throw err
    }
}

async function login(user) {
    try {
        console.log(user);
        const loggedInUser = await authAxios.post(API + 'login', user);
        return loggedInUser;
    } catch (err) {
        throw err
    }
}