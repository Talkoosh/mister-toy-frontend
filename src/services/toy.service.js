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

function loadToys() {
    // return storageService.query(TOY_KEY)
    //     .then(toys => {
    //         if (!toys || !toys.length) toys = _createToys();
    //         return toys;
    //     })

    return axios.get(API)
        .then(res => res.data)
}

function getToyById(id) {
    // return storageService.get(TOY_KEY, id)
    //     .then(toy => {
    //         toy = { ...toy };
    //         toy.reviews = ['Bad toy', 'DONT PLAY'];
    //         return toy
    //     })
    return axios.get(API + id)
            .then(res => res.data)
}

function save(toy) {
    // const prm = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy);
    const prm = (toy._id) ? axios.put(API, toy) : axios.post(API, toy)
    return prm.then(res => res.data)
}

function removeToy(toyId) {
    // return storageService.remove(TOY_KEY, toyId)
    return axios.delete(API + toyId);
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
