import { Actor, Movie } from '../models/index.js';

export async function getMoviesPerActor() {
  try {
      const actors = await Actor.findAll({
        include: [
          {
            model: Movie,
            through: { attributes: ['character'] },
            attributes: ['title'],
          },
        ]
      });
  
      return actors;
    } catch (err) {
      console.error('Error fetching actors with movies:', err);
      throw new Error('Failed to fetch actors with movies'); // rethrow to be handled by route
    }
}

