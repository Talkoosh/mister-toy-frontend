export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId
}

function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key){
    const val = localStorage.getItem(key);
    return JSON.parse(val);
}

function makeId(length = 8) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }
  