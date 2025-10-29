import { DataTypes } from 'sequelize';

export default (sequelize) =>
  sequelize.define(
    'ActorsInMovies',
    {
      actorId: {
        type: DataTypes.INTEGER,
        primaryKey: true, // ✅ primary key
        field: 'actor_id',
      },
      movieId: {
        type: DataTypes.INTEGER,
        primaryKey: true, // ✅ primary key
        field: 'movie_id',
      },
      character: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'character'
      },
    },
    {
      tableName: 'actors_in_movies',
      timestamps: false,
    }
  );
