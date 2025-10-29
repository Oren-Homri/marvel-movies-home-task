import { getMoviesPerActor as getActorMovies } from '../dal/actorDal.js';

export async function getMoviesPerActor() {
    try {
      
      const actors = await getActorMovies();
        
      // Transform into { actorName: [movies...] }
      const result = {};
      for (const actor of actors) {
        result[actor.Name] = actor.Movies.map(m => m.dataValues.title);
      }
  
      return result;
    } catch (err) {
      console.error('Error fetching actors with movies:', err);
      throw new Error('Failed to fetch actors with movies'); // rethrow to be handled by route
    }
  }


  export async function getActorsWithMultipleCharacters() {
    try {
      const actors = await getActorMovies();
  
      const result = {};
  
      for (const actor of actors) {
        const characterSet = new Set(
          actor.Movies.map(m => m.ActorsInMovies.character).filter(Boolean)
        );

        
  
        if (characterSet.size > 1) {
          result[actor.Name] = actor.Movies.map(m => ({
            movieName: m.dataValues.title,
            characterName: m.ActorsInMovies.character,
          }));
        }
      }
  
      return result;
    } catch (err) {
      console.error('Error in getActorsWithMultipleCharacters:', err);
      throw err;
    }
  }
















 