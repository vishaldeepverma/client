export const checkIfEmpty = (obj) => {
    let err = [];
    for (let key in obj) {
        if (!obj[key]) {
            err.push(key)
        }

    }
    return { isValid: err.length > 0 ? false : true, err: err }
}