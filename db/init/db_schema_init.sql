-- Schema for vi_movies
CREATE TABLE IF NOT EXISTS actors (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS actors_in_movies (
    movie_id INTEGER NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    actor_id INTEGER NOT NULL REFERENCES actors(id) ON DELETE CASCADE,
    character TEXT NOT NULL,
    PRIMARY KEY (movie_id, actor_id)
);

-- Useful index for lookups by actor or movie
CREATE INDEX IF NOT EXISTS idx_actors_in_movies_actor ON actors_in_movies(actor_id);
CREATE INDEX IF NOT EXISTS idx_actors_in_movies_movie ON actors_in_movies(movie_id);
