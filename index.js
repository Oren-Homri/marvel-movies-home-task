import 'dotenv/config';
import express from "express";
const app = express();

import { seedAll, clearAll } from './src/services/seed/seedAll.js'; // TODO: Should be in a different service

import actorsRouter from './src/routes/api/v1/actors.js'
import charactersRouter from './src/routes/api/v1/characters.js'

// API routes can be mounted here

const port = process.env.PORT || 3000;

app.use('/api', actorsRouter);
app.use('/api', charactersRouter);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    
    // TODO: Seeding is just for the excercise to work. It should be handled in a different service that will sync data
    try {
        await clearAll();
        await seedAll();
    } catch (err) {
        console.error('DB query error:', err);
    }
});

