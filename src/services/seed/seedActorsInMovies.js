import { ActorsInMovies, Actor, Movie } from '../../models/index.js'
import { actors as actorNames, movies } from '../../config/dataForQuestions.js';
import { getActor, getMovieCredits } from '../../services/tmdbService.js';

export async function seedActorsInMovies() {
  for (const name of actorNames) {
    try {
      // Get actor from DB (must exist)
      const actor = await Actor.findOne({ where: { Name: name } });
      if (!actor) {
        console.warn(`Actor not in DB: ${name}, skip relations`);
        continue;
      }

      // Loop through movies
      for (const [movieName, movieId] of Object.entries(movies)) {
        const credits = await getMovieCredits(movieId);

        // Find if this actor appears in that movie
        const credit = credits.cast.find(c => c.name === actor.Name);
        if (!credit) continue;

        await ActorsInMovies.findOrCreate({
            where: {
              actor_id: credit.id,
              movie_id: movieId
            },
            defaults: {
              character: credit.character
            }
          });
      }
    } catch (err) {
      console.error(`Failed to seed relations for actor '${name}':`, err);
    }
  }
}

export async function clearActorsInMovies() {
  await ActorsInMovies.destroy({ where: {} });
}
