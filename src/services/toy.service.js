import { utilService } from "./util.service.js"
import { storageService } from "./asyncStorageService.js"
import axios from 'axios'

export const toyService = {
    loadToys,
    removeToy,
    save,
    getToyById
}


const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]

const TOY_KEY = 'TOY';
const API = (process.env.NODE_ENV !== 'development')
    ? '/api/toy/'
    : 'http://localhost:3030/api/toy/';

async function loadToys() {
    // return storageService.query(TOY_KEY)
    //     .then(toys => {
    //         if (!toys || !toys.length) toys = _createToys();
    //         return toys;
    //     })

    // return axios.get(API)
    //     .then(res => res.data)
    try {
        const res = await axios.get(API);
        return res.data;
    } catch (err) {
        console.log('Couldn\'t get toys:', err);
    }
}

async function getToyById(id) {
    // return storageService.get(TOY_KEY, id)
    //     .then(toy => {
    //         toy = { ...toy };
    //         toy.reviews = ['Bad toy', 'DONT PLAY'];
    //         return toy
    //     })

    // return axios.get(API + id)
    //     .then(res => res.data)

    try {
        const res = await axios.get(API + id);
        return res.data;
    } catch (err) {
        console.log('Couldn\'t get toy:', err);
    }

}

async function save(toy) {
    // const prm = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy);
    try {
        const res = (toy._id) ? await axios.put(API, toy) : await axios.post(API, toy)
        return res.data
    } catch(err){
        console.log('Couldn\'t save toy:', err);
    }
}

async function removeToy(toyId) {
    // return storageService.remove(TOY_KEY, toyId)

    // return axios.delete(API + toyId);

    try {
        const res = await axios.delete(API + toyId);
        return res.data;
    } catch(err){
        console.log('Couldn\'t get toys:', err);
    }
}


function _createToys() {
    const toys = [];
    let toy = { name: 'Buzz', price: 120, labels: ["On wheels", "Box game", "Art"] }
    toys.push(_createToy(toy));
    toy = { name: 'Sulli', price: 300, labels: ["Art", "Baby", "Doll"] }
    toys.push(_createToy(toy));
    toy = { name: 'Mike', price: 250, labels: ["Puzzle", "Outdoor", "Box game"] }
    toys.push(_createToy(toy));
    utilService.saveToStorage(TOY_KEY, toys)
    return toys;
}

function _createToy({ name, price, labels }) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt: Date.now(),
        inStock: true
    }
}
