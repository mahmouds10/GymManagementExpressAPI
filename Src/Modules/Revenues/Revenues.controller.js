const { Members } = require("../../Utils/DataLoader");
const { Trainers } = require("../../Utils/DataLoader");
const fs = require("fs");
const getIndex = require("../../Utils/getIndex");

// * Get all revenues
const getAllRevenues = (req, res) => {
    let totalRevenu = 0 
    Members.forEach(member => {
        totalRevenu += member.Membership.cost
    });
    res.status(200).json({
        message:`Total revenue of all members is ${totalRevenu} EGP`,
        totalRevenue: totalRevenu,
        numberOfMembers: Members.length
    })
}
// * Get the revenues of a specific trainer.
const getTrainerRevenues = (req, res) => {
    const trainerId = req.params.id
    const trainerIndex = getIndex("Id" , trainerId , Trainers)
    if (trainerIndex == -1){
        res.status(404).json({
            message:`Trainer not found`,
            statuscode: 404
        })
    }
    else{
        let trainerRevenue = 0
        const relatedMembers = Members.filter(member => member.TrainerId == trainerId)
        relatedMembers.forEach(member => {
            trainerRevenue += member.Membership.cost
        })
        res.status(200).json({
            message: `Total revenue of trainer with id ${"\'"+trainerId+"\'"} is ${trainerRevenue} EGP`,
            trainerRevenue,
            'numberOfTrainer\'sMembers': relatedMembers.length
        })
    }
}

module.exports ={
    getAllRevenues,
    getTrainerRevenues
}