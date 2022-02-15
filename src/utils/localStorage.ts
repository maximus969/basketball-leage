export function saveInLocalStorage<T>(key: string, state: T) {
    const stateAsString = JSON.stringify(state)
    localStorage.setItem(key, stateAsString)
}

export function restoreFromLocalStorage(key: string) {
    let state = null
    const stateAsString = localStorage.getItem(key)
    if (stateAsString !== null) {
        state = JSON.parse(stateAsString)
    }
    return state
}
