const {Router} = require('express');
const trainerRouter = Router()
const trainerController = require('./Trainer.controller')
trainerRouter.get('/' , trainerController.getAllTrainers)
trainerRouter.get('/:id' , trainerController.getTrainerByID)
trainerRouter.post('/addTrainer' , trainerController.addTrainer)
trainerRouter.delete('/deleteTrainer/:id' , trainerController.deleteTrainer)
trainerRouter.put('/updateTrainer/:id' , trainerController.updateTrainerer)


module.exports = trainerRouter