const {Router} = require('express')
const revenuesRouter = Router()
const revenuesController = require('./Revenues.controller')

// Get all revenue 
revenuesRouter.get('/' , revenuesController.getAllRevenues)
revenuesRouter.get('/:id' , revenuesController.getTrainerRevenues)


module.exports = revenuesRouter