const fs = require('fs');

const Members = JSON.parse(fs.readFileSync('Data/Members.json'))
const Trainers = JSON.parse(fs.readFileSync("Data/Trainers.json"))


module.exports ={
    Trainers,
    Members
}