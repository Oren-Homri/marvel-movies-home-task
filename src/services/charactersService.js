import { findCharactersWithMultipleActors, findCharacterDetails } from '../dal/characterDal.js';

export async function getCharactersWithMultipleActors() {
  try {
    // Find characters appearing with more than one actor
    const duplicates = await findCharactersWithMultipleActors();
    
    if (duplicates.length === 0) return {};

    const characterNames = duplicates.map(d => d.character);

    // Get all relevant records with actor + movie info
    const results = await findCharacterDetails(characterNames);

    // Build the response
    const response = {};

    for (const entry of results) {
      const charName = entry.character;
      const actorName = entry.Actor?.dataValues.name;
      const movieTitle = entry.Movie?.dataValues.title;

      if (!charName || !actorName || !movieTitle) continue;

      if (!response[charName]) response[charName] = [];
      response[charName].push({ movieTitle, actorName });
    }

    return response;
  } catch (err) {
    console.error('Error fetching characters with multiple actors:', err);
    throw err;
  }
}















 