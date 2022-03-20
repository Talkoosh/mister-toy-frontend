import { utilService } from "./util.service.js"
import {httpService} from './http.service.js'

export const toyService = {
    loadToys,
    removeToy,
    save,
    getToyById
}


const TOY_KEY = 'TOY';

async function loadToys() {
    // return storageService.query(TOY_KEY)
    //     .then(toys => {
    //         if (!toys || !toys.length) toys = _createToys();
    //         return toys;
    //     })

    // return axios.get(API)
    //     .then(res => res.data)
    try {
        const res = await httpService.get('toy/');
        return res;
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
        const res = await httpService.get(`toy/${id}/`);
        return res;
    } catch (err) {
        console.log('Couldn\'t get toy:', err);
    }

}

async function save(toy) {
    // const prm = (toy._id) ? storageService.put(TOY_KEY, toy) : storageService.post(TOY_KEY, toy);
    try {
        const res = (toy._id) ? await httpService.put('toy/', toy) : await httpService.post('toy/', toy)
        return res
    } catch(err){
        console.log('Couldn\'t save toy:', err);
    }
}

async function removeToy(toyId) {
    // return storageService.remove(TOY_KEY, toyId)

    // return axios.delete(API + toyId);

    try {
        const res = await httpService.delete(`toy/${toyId}/`);
        return res;
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
