const {Router} = require('express');
const memberRouter = Router();
const memberController = require('./Member.controller.js')

// Get all members
memberRouter.get('/' , memberController.getAllMembers );
// Get specific member
memberRouter.get('/:id' , memberController.getMemberByID );
// Add new member
memberRouter.post('/addMember' , memberController.addMember );
// Delete memebr
memberRouter.delete('/deleteMember/:id', memberController.deleteMember)
// Update member
memberRouter.put('/updateMember/:id', memberController.updateMember)

module.exports = memberRouter
