const getIndex = (key , val , arr) => {
    return arr.findIndex(el => el[key] == val)
} 

module.exports = getIndex