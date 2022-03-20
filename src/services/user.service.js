import { httpService } from "./http.service.js";

export const userService = {
    signup,
    login,
    logout,
    loadFromStorage,
}

const KEY = 'USER'

async function signup(user) {
    try {
        const newUser = await httpService.post('auth/signup', user);
        console.log('backend works');
        await _saveToStorage(newUser)
        return newUser;
    } catch (err) {
        throw err
    }
}

async function login(user) {
    try {
        const loggedInUser = await httpService.post('auth/login', user);
        await _saveToStorage(loggedInUser)
        return loggedInUser;
    } catch (err) {
        throw err
    }
}

async function logout() {
    try {
        await _clearStorage();
        return await httpService.post('auth/logout');
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
    if(!user) return 
    user = JSON.parse(user)
    return user
}

async function _clearStorage() {
    sessionStorage.clear();
    return Promise.resolve();
}