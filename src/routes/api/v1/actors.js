import express from 'express';
import { getMoviesPerActor, getActorsWithMultipleCharacters } from '../../../services/actorsService.js';

const actorsRouter = express.Router();

actorsRouter.get('/moviesPerActor', async (req, res) => {
  try {
    
    const data = await getMoviesPerActor();

    if (!data) {
      return res.status(404).json({ error: `Actor movies not found` });
    }

    res.json(data);
  } catch (err) {
    console.error('Error fetching movies per actor:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

actorsRouter.get('/actorsWithMultipleCharacters', async (req, res) => {
  try {
    const data = await getActorsWithMultipleCharacters();
    res.json(data);
  } catch (err) {
    console.error('Error in /actorsWithMultipleCharacters:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default actorsRouter;
