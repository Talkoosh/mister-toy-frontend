import { toyService } from '../../services/toy.service.js';


export const toyStore = {
    state() {
        return {
            currToy: null,
            toys: [],
            filterBy: null,
            sortBy: null
        }
    },
    mutations: {
        loadToys(state, { toys }) {
            state.toys = toys;
        },
        removeToy(state, { toyId }) {
            const idx = state.toys.findIndex(toy => toy._id === toyId);
            state.toys.splice(idx, 1)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        addToy(state, { newToy }) {
            state.toys.unshift(newToy)
        },
        editToy(state, { toy }) {
            const idx = state.toys.findIndex(currToy => currToy._id === toy._id);
            state.toys.splice(idx, 1, toy)
        },
        setCurrToy(state, { toy }) {
            state.currToy = { ...toy }
        },
        setSort(state, { sortBy }) {
            state.sortBy = sortBy
        }
    },
    actions: {
        loadToys({ commit }) {
            toyService.loadToys()
                .then(toys => {
                    commit({ type: 'loadToys', toys })
                })
        },
        removeToy({ commit }, { toyId }) {
            toyService.removeToy(toyId)
                .then(() => {
                    commit({ type: 'removeToy', toyId })
                })
        },
        addToy({ commit }, { toyToAdd }) {
            toyService.save(toyToAdd)
                .then(newToy => {
                    commit({ type: 'addToy', newToy })
                })
        },
        editToy({ commit }, { toy }) {
            return toyService.save(toy)
                .then(toy => {
                    commit({ type: 'editToy', toy })
                })
        },
        setCurrToy({ commit }, { id }) {
            return toyService.getToyById(id)
                .then(toy => commit({ type: 'setCurrToy', toy }))
        }
    },
    getters: {
        filteredToys(state) {
            if (!state.toys) return
            let toys = JSON.parse(JSON.stringify(state.toys))

            if (!state.filterBy && !state.sortBy) return toys;

            if (state.filterBy) {
                if (state.filterBy.name) {
                    const regex = new RegExp(state.filterBy.name, 'i');
                    toys = toys.filter(toy => (regex.test(toy.name)));
                }

                if (state.filterBy.labels.length) {
                    toys = toys.filter(toy => {
                        return toy.labels.some(label => {
                            return state.filterBy.labels.includes(label)
                        })
                    })
                }

                toys = toys.filter(toy => toy.inStock === state.filterBy.inStock)
            }
            // toys = toys.filter(toy => toy.inStock === state.filterBy.inStock)
            if (state.sortBy === 'abc') {
                toys.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    };
                    return 0;
                })
            } else toys.sort((a, b) => {
                return a.price - b.price
            })

            return toys
        },
        toysForDisplay(state) {
            return JSON.parse(JSON.stringify(state.toys))
        },
        currToy(state) {
            return JSON.parse(JSON.stringify(state.currToy))
        },
        toyLabels() {
            return ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"]
        }
    }
}