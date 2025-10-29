import { movies, actors as allowedActors } from '../../config/dataForQuestions.js';
import { getMovieDetails, getMovieCredits } from '../tmdbService.js';
import { sequelize, Movie, Actor, ActorsInMovies } from '../../models/index.js';

export async function seedMovies() {
  try {

    for (const [title, id] of Object.entries(movies)) {
      console.log(`Processing movie: ${title}`);

      const movieData = await getMovieDetails(id);
      
      if (!movieData) {
        console.warn(`Movie not found: ${title}`);
        continue;
      }

      // Insert movie
      const [movieRecord] = await Movie.findOrCreate({
        where: { Id: movieData.id },
        defaults: { Title: movieData.title },
      });
    }
      
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Failed to seed movies', err);
  }
}

export async function clearMovies() {
    try {
      await Movie.destroy({ where: {} });
      console.log('Cleared all movies');
    } catch (err) {
      console.error('Failed to clear tables:', err);
    }
  }
