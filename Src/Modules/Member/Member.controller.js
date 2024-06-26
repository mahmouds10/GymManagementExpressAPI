const { Members } = require("../../Utils/DataLoader");
const { Trainers } = require("../../Utils/DataLoader");
const fs = require("fs");
const getIndex = require("../../Utils/getIndex");

// * Get All members and each member's trainer
const getAllMembers = (req, res) => {
  const returnedMembers = Members.map((member) => {
    const returnedTrainer = Trainers.find(
      (trainer) => trainer.Id == member.TrainerId
    );
    const { TrainerId, ...memberWithoutTrainerId } = member;
    return {
      ...memberWithoutTrainerId,
      trainer: returnedTrainer,
    };
  });
  res.status(200).json(returnedMembers);
};

// * Add new member
const addMember = (req, res) => {
  const memberID = req.body.Id;
  const memberIndex = getIndex("Id", memberID, Members);
  const trainerID = req.body.TrainerId;
  const trainerIndex = getIndex("Id", trainerID, Trainers);
  if (trainerIndex == -1) {
    res.status(404).json({
      message: "Trainer not found",
      statuscode: 404,
    });
  } else {
    if (memberIndex == -1) {
      Members.push(req.body);
      fs.writeFileSync("Data/Members.json", JSON.stringify(Members));
      res.status(201).json(req.body);
    } else {
      res.status(409).json({
        message: "Member ID already exists",
        ststuscodee: 409,
      });
    }
  }
};

// * Delete member
const deleteMember = (req, res) => {
  const memberId = req.params.id;
  const memberIndex = getIndex("Id", memberId, Members);
  if (memberIndex == -1) {
    res.status(404).json({
      message: "Member not found",
      statuscode: 404,
    });
  }
  else{
    res.status(200).json(Members[memberIndex])
    Members.splice(memberIndex, 1);
    fs.writeFileSync('Data/Members.json' , JSON.stringify(Members))
  }
};

// * Update member
const updateMember = (req , res) => {
  const memberID = req.params.id
  const memberIndex = getIndex("Id" , memberID , Members);
  if (memberIndex == -1){
    res.status(404).json({
      message: "Member not found",
      statuscode: 404,
    })
  }
  else{
    const {Id , ...updateData} = req.body
    console.log(updateData);
    Members[memberIndex] = {Id: memberID , ...updateData}
    fs.writeFileSync('Data/Members.json' , JSON.stringify(Members))
    res.status(200).json(Members[memberIndex])
  } 
}

// * Get specific member
const getMemberByID = (req, res) => {
  const memberId = req.params.id
  const memberIndex = getIndex("Id" , memberId , Members)
  if (memberIndex == -1){
    res.status(404).json({
      message: 'Member not found',
      statuscode: 404
    })
  } 
  else{
    const currentDate = new Date()
    const membershipEndDate = new Date(Members[memberIndex].Membership.to)
    if(currentDate <= membershipEndDate){
      res.status(200).json(Members[memberIndex])
    }
    else{
      res.status(403).json({
        message: 'This user is not allowed to enter the gym. Membership is expired.',
        member: Members[memberIndex]
      })
    }
  }
}
module.exports = {
  getAllMembers,
  addMember,
  deleteMember,
  updateMember,
  getMemberByID
};
