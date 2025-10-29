import { Actor, Movie, ActorsInMovies } from '../models/index.js';
import { Op } from 'sequelize';

export async function findCharactersWithMultipleActors() {
    return ActorsInMovies.findAll({
      attributes: [
        'character',
        [ActorsInMovies.sequelize.fn('COUNT', ActorsInMovies.sequelize.col('actor_id')), 'actorCount']
      ],
      group: ['character'],
      having: ActorsInMovies.sequelize.literal('COUNT(actor_id) > 1')
    });
  }
  
  export async function findCharacterDetails(characterNames) {
    return ActorsInMovies.findAll({
      where: { character: { [Op.in]: characterNames } },
      include: [
        { model: Actor, attributes: ['name'] },
        { model: Movie, attributes: ['title'] }
      ]
    });
  }
  