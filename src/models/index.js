import { Sequelize } from 'sequelize';
import ActorModel from './Actor.js';
import MovieModel from './Movie.js';
import ActorsInMoviesModel from './ActorsInMovies.js';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

export const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  define: { underscored: true }
});

export const Actor = ActorModel(sequelize);
export const Movie = MovieModel(sequelize);
export const ActorsInMovies = ActorsInMoviesModel(sequelize);

// Many-to-many between Actor and Movie
Actor.belongsToMany(Movie, {
    through: ActorsInMovies,
    foreignKey: 'actor_id',
    otherKey: 'movie_id',
  });
  
  Movie.belongsToMany(Actor, {
    through: ActorsInMovies,
    foreignKey: 'movie_id',
    otherKey: 'actor_id',
  });
  
  // ✅ Direct associations for junction table
  ActorsInMovies.belongsTo(Movie, { foreignKey: 'movie_id' });
  ActorsInMovies.belongsTo(Actor, { foreignKey: 'actor_id' });
  
