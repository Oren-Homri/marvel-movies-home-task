import { getCharactersWithMultipleActors } from '../../src/services/charactersService.js';
import * as characterDal from '../../src/dal/characterDal.js';

jest.mock('../../src/dal/characterDal.js');

describe('charactersService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('returns characters played by multiple actors', async () => {
    // Step 1: Mock characters with multiple actors
    characterDal.findCharactersWithMultipleActors.mockResolvedValue([
      { character: 'Spider-Man' },
      { character: 'Iron Man' },
    ]);

    // Step 2: Mock detailed actor+movie info
    characterDal.findCharacterDetails.mockResolvedValue([
      {
        character: 'Spider-Man',
        Actor: { dataValues: { name: 'Tobey Maguire' } },
        Movie: { dataValues: { title: 'Spider-Man' } },
      },
      {
        character: 'Spider-Man',
        Actor: { dataValues: { name: 'Andrew Garfield' } },
        Movie: { dataValues: { title: 'The Amazing Spider-Man' } },
      },
      {
        character: 'Iron Man',
        Actor: { dataValues: { name: 'Robert Downey Jr.' } },
        Movie: { dataValues: { title: 'Iron Man' } },
      },
      {
        character: 'Iron Man',
        Actor: { dataValues: { name: 'Another Actor' } },
        Movie: { dataValues: { title: 'Iron Man 2' } },
      },
    ]);

    const result = await getCharactersWithMultipleActors();

    expect(result).toEqual({
      'Spider-Man': [
        { movieTitle: 'Spider-Man', actorName: 'Tobey Maguire' },
        { movieTitle: 'The Amazing Spider-Man', actorName: 'Andrew Garfield' },
      ],
      'Iron Man': [
        { movieTitle: 'Iron Man', actorName: 'Robert Downey Jr.' },
        { movieTitle: 'Iron Man 2', actorName: 'Another Actor' },
      ],
    });

    expect(characterDal.findCharactersWithMultipleActors).toHaveBeenCalledTimes(1);
    expect(characterDal.findCharacterDetails).toHaveBeenCalledTimes(1);
  });

  test('returns empty object if no duplicates', async () => {
    characterDal.findCharactersWithMultipleActors.mockResolvedValue([]);

    const result = await getCharactersWithMultipleActors();

    expect(result).toEqual({});
    expect(characterDal.findCharacterDetails).not.toHaveBeenCalled();
  });

  test('skips incomplete records (missing actor or movie)', async () => {
    characterDal.findCharactersWithMultipleActors.mockResolvedValue([
      { character: 'Hulk' },
    ]);

    characterDal.findCharacterDetails.mockResolvedValue([
      { character: 'Hulk', Actor: null, Movie: { dataValues: { title: 'Hulk' } } },
      { character: 'Hulk', Actor: { dataValues: { name: 'Mark Ruffalo' } }, Movie: null },
    ]);

    const result = await getCharactersWithMultipleActors();
    expect(result).toEqual({});
  });

  test('throws error if DAL throws', async () => {
    characterDal.findCharactersWithMultipleActors.mockRejectedValue(new Error('DB failure'));

    await expect(getCharactersWithMultipleActors()).rejects.toThrow('DB failure');
  });
});
