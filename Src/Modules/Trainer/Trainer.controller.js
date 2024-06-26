const { Members } = require("../../Utils/DataLoader");
const { Trainers } = require("../../Utils/DataLoader");
const getIndex = require("../../Utils/getIndex");
const fs = require("fs");

// * Get all trainers and each trainer's members
const getAllTrainers = (req, res) => {
  const returnedTrainer = Trainers.map((trainer) => {
    const membersRelated = Members.filter(
      (member) => member.TrainerId == trainer.Id
    );
    return {
      ...trainer,
      members: membersRelated,
    };
  });
  res.status(200).json(returnedTrainer);
};

// * Add new trainer
const addTrainer = (req, res) => {
  const id = req.body.Id;
  if (getIndex("Id", id, Trainers) == -1) {
    Trainers.push(req.body);
    fs.writeFileSync("Data/Trainers.json", JSON.stringify(Trainers));
    res.status(201).json(req.body);
  } else {
    res.status(409).json({
      message: "Id already exists",
      statuscode: 409,
    });
  }
};

// * Delete trainer
const deleteTrainer = (req, res) => {
  const id = req.params.id;
  const trainerIndex = getIndex("Id", id, Trainers);
  if (trainerIndex == -1) {
    res.status(404).json({
      message: "ID not found",
      statuscode: 404,
    });
  } else {
    console.log(trainerIndex);
    res.status(200).json(Trainers[trainerIndex]);
    Trainers.splice(trainerIndex, 1);
    fs.writeFileSync("Data/Trainers.json", JSON.stringify(Trainers));
  }
};

// * Update Trainer
const updateTrainerer = (req, res) => {
  const trainerID = req.params.id;
  const trainerIndex = getIndex("Id", trainerID, Trainers);
  if (trainerIndex == -1) {
    res.status(404).json({
      message: "ID not found",
      statuscode: 404,
    });
  } else {
    const {Id , ...updateData} = req.body;
    Trainers[trainerIndex] = { Id: trainerID, ...updateData };
    fs.writeFileSync("Data/Trainers.json", JSON.stringify(Trainers));
    res.status(200).json(Trainers[trainerIndex]);
  }
};

// * Get specific trainer
const getTrainerByID = (req, res) => {
  const trainerID = req.params.id;
  const trainerIndex = getIndex("Id", trainerID, Trainers);
  if (trainerIndex == -1) {
    res
      .json({
        message: "Trainer not found",
        status: 404,
      })
      .status(404);
  } else {
    res.json(Trainers[trainerIndex])
  }
};

module.exports = {
  getAllTrainers,
  addTrainer,
  deleteTrainer,
  updateTrainerer,
  getTrainerByID
};
