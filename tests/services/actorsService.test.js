import { getMoviesPerActor, getActorsWithMultipleCharacters } from '../../src/services/actorsService.js';
import * as actorDal from '../../src/dal/actorDal.js';

jest.mock('../../src/dal/actorDal.js');

describe('actorsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMoviesPerActor', () => {
    it('should return a map of actorName -> [movieTitles]', async () => {
      actorDal.getMoviesPerActor.mockResolvedValue([
        {
          Name: 'Robert Downey Jr.',
          Movies: [
            { dataValues: { title: 'Iron Man' } },
            { dataValues: { title: 'Avengers' } },
          ],
        },
        {
          Name: 'Chris Evans',
          Movies: [
            { dataValues: { title: 'Captain America' } },
          ],
        },
      ]);

      const result = await getMoviesPerActor();

      expect(result).toEqual({
        'Robert Downey Jr.': ['Iron Man', 'Avengers'],
        'Chris Evans': ['Captain America'],
      });

      expect(actorDal.getMoviesPerActor).toHaveBeenCalledTimes(1);
    });

    it('should return an empty object if no actors found', async () => {
      actorDal.getMoviesPerActor.mockResolvedValue([]);

      const result = await getMoviesPerActor();
      expect(result).toEqual({});
    });

    it('should throw error if DAL throws', async () => {
      actorDal.getMoviesPerActor.mockRejectedValue(new Error('DB error'));

      await expect(getMoviesPerActor()).rejects.toThrow('Failed to fetch actors with movies');
    });
  });

  describe('getActorsWithMultipleCharacters', () => {
    it('should return actors with more than one character', async () => {
      actorDal.getMoviesPerActor.mockResolvedValue([
        {
          Name: 'Ryan Reynolds',
          Movies: [
            {
              dataValues: { title: 'Deadpool' },
              ActorsInMovies: { character: 'Deadpool' },
            },
            {
              dataValues: { title: 'Green Lantern' },
              ActorsInMovies: { character: 'Green Lantern' },
            },
          ],
        },
        {
          Name: 'Hugh Jackman',
          Movies: [
            {
              dataValues: { title: 'Logan' },
              ActorsInMovies: { character: 'Wolverine' },
            },
          ],
        },
      ]);

      const result = await getActorsWithMultipleCharacters();

      expect(result).toEqual({
        'Ryan Reynolds': [
          { movieName: 'Deadpool', characterName: 'Deadpool' },
          { movieName: 'Green Lantern', characterName: 'Green Lantern' },
        ],
      });

      expect(actorDal.getMoviesPerActor).toHaveBeenCalledTimes(1);
    });

    it('should return empty object if no actor plays multiple characters', async () => {
      actorDal.getMoviesPerActor.mockResolvedValue([
        {
          Name: 'Tom Hanks',
          Movies: [
            { dataValues: { title: 'Forrest Gump' }, ActorsInMovies: { character: 'Forrest Gump' } },
          ],
        },
      ]);

      const result = await getActorsWithMultipleCharacters();
      expect(result).toEqual({});
    });

    it('should throw if DAL throws', async () => {
      actorDal.getMoviesPerActor.mockRejectedValue(new Error('DB failure'));

      await expect(getActorsWithMultipleCharacters()).rejects.toThrow('DB failure');
    });
  });
});
