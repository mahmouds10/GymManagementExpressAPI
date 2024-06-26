// Imppor core modules
const express = require('express');

// Import Routers
const memberRouter = require('./Src/Modules/Member/Member.routes') 
const trainerRouter = require('./Src/Modules/Trainer/Trainer.routes')
const revenuesRouter = require('./Src/Modules/Revenues/Revenues.routes')

// Create express instance
const app = express();

// Parse the body
app.use(express.json());
app.use('/Members', memberRouter)
app.use('/Trainers', trainerRouter)
app.use('/Revenues', revenuesRouter)

// Create the server
app.listen(3000,()=>console.log('Server is running at http://localhost:3000'));