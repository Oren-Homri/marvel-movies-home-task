import { getCharactersWithMultipleActors } from '../services/charactersService.js';

export async function charactersWithMultipleActors(req, res) {
  try {
    const data = await getCharactersWithMultipleActors();
    res.json(data);
  } catch (err) {
    console.error('Error in charactersWithMultipleActors controller:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
