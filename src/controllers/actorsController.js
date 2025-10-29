import { getActorsWithMultipleCharacters, getMoviesPerActor } from '../services/actorsService.js';

export async function getActorsWithMultipleCharacters(req, res) {
  try {
    const data = await getActorsWithMultipleCharacters();
    res.json(data);
  } catch (err) {
    console.error('Error in getActorsWithMultipleCharacters controller:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getMoviesPerActor(req, res) {
  try {
    const data = await getMoviesPerActor();
    res.json(data);
  } catch (err) {
    console.error('Error in getMoviesPerActor controller:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}


