/**
 * Returns value from configuration.
 * 
 * @param {String} key Key to be searched
 * @param {String|null} def Default value to be used
 * @returns {String|undefined}
 */
export const config = (key, def = null) => {
    const k = `VITE_${key.toUpperCase()}`
    const env = import.meta.env

    if(k in env) {
        return env[k]
    }

    if(def) {
        return def
    }
}

/**
 * Save data in WebStorage.
 * 
 * @param {String} key Name of the value
 * @param {String} value Data to be stored
 * @param {Boolean} remember Store long-term or not
 */
export const setStorage = (key, value, remember = false) => {
    remember ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)
}

/**
 * Get data from WebStorage
 * 
 * @param {String} key Name of the value
 * @returns {String|null}
 */
export const getStorage = key => {
    return localStorage.getItem(key) || sessionStorage.getItem(key)
}

/**
 * Remove data from WebStorage. 
 * 
 * @param {String} key Name of the value
 */
export const delStorage = key => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
}

/**
 * Returns url for the given image file.
 * 
 * @param {String} filename Name of image file
 * @returns String
 */
export const imgUrl = filename => {
    return `${import.meta.env.VITE_API_URL}/image/${filename}`
}