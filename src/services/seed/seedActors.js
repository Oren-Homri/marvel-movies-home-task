import { Actor } from '../../models/index.js';
import { actors as actorNames } from '../../config/dataForQuestions.js';
import { getActor } from '../tmdbService.js';

export async function seedActors() {
  for (const name of actorNames) {
    try {
      const actorData = await getActor(name);
      if (!actorData) {
        console.warn(`Actor not found on TMDB: ${name}`);
        continue;
      }

      await Actor.findOrCreate({
        where: { Id: actorData.id },
        defaults: { Name: actorData.name },
      });


    } catch (err) {
      console.error(`Failed to seed actor '${name}':`, err);
    }
  }
}

export async function clearActors() {
  await Actor.destroy({ where: {} });
}
