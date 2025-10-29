import { seedActors, clearActors } from './seedActors.js';
import { seedMovies, clearMovies } from './seedMovies.js';
import { seedActorsInMovies, clearActorsInMovies } from './seedActorsInMovies.js';

export async function seedAll() {
    console.log('Seeding movies...');
    await seedMovies();
    console.log('Seeding actors...');
    await seedActors();
    console.log('Seeding actor-movie relations...');
    await seedActorsInMovies();

    console.log('Seeding completed!');
}

export async function clearAll() {
    await clearActors();
    await clearMovies();
    await clearActorsInMovies();    
}

