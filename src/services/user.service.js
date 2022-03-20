import axios from 'axios'

const authAxios = axios.create({
    withCredentials: true,
})

export const userService = {
    signup,
    login,
    logout,
    loadFromStorage,
}

const KEY = 'USER'

const API = (process.env.NODE_ENV !== 'development')
    ? '/api/auth/'
    : 'http://localhost:3030/api/auth/';

async function signup(user) {
    try {
        const newUser = await authAxios.post(API + 'signup', user);
        await _saveToStorage(newUser)
        return newUser.data;
    } catch (err) {
        throw err
    }
}

async function login(user) {
    try {
        const loggedInUser = await authAxios.post(API + 'login', user);
        await _saveToStorage(loggedInUser)
        return loggedInUser.data;
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        await _clearStorage();
        return await authAxios.post(API + 'logout');
    } catch (err) {
        throw err
    }
}

async function _saveToStorage(user) {
    sessionStorage.setItem(KEY, JSON.stringify(user));
    return Promise.resolve();
}

async function loadFromStorage() {
    let user = sessionStorage.getItem(KEY);
    user = JSON.parse(user)
    return Promise.resolve(user.data)
}

async function _clearStorage() {
    sessionStorage.clear();
    return Promise.resolve();
}