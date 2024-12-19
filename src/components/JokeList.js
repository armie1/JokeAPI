import React, { useState, useEffect } from 'react';
import { fetchJokes } from '../Api.js';
import JokeCard from './JokeCard';
import Pagination from './Pagination';
import AddJokeForm from './AddJokeForm';

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [filteredJokes, setFilteredJokes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jokesPerPage, setJokesPerPage] = useState(5);
  const [selectedType, setSelectedType] = useState('');
  const [activeSort, setActiveSort] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const loadJokes = async () => {
    try {
      const cachedJokes = localStorage.getItem('cachedJokes');
      if (cachedJokes) {
        const jokesData = JSON.parse(cachedJokes).map((joke) => ({
          ...joke,
          likes: joke.likes ?? 0,
          dislikes: joke.dislikes ?? 0,
        }));
        setJokes(jokesData);
        setFilteredJokes(jokesData);
      } else {
        const data = await fetchJokes();
        const jokesWithDefaults = data.map((joke) => ({
          ...joke,
          likes: 0,
          dislikes: 0,
        }));
        setJokes(jokesWithDefaults);
        setFilteredJokes(jokesWithDefaults);
        localStorage.setItem('cachedJokes', JSON.stringify(jokesWithDefaults));
      }
    } catch (error) {
      console.error('Error fetching jokes:', error);
      alert('Failed to load jokes. Please try again later.');
    }
  };

  useEffect(() => {
    loadJokes();
  }, []);

  const updateLikes = (id, type) => {
    const updatedJokes = jokes.map((joke) => {
      if (joke.id === id) {
        return {
          ...joke,
          likes: type === 'like' ? (joke.likes ?? 0) + 1 : joke.likes,
          dislikes: type === 'dislike' ? (joke.dislikes ?? 0) + 1 : joke.dislikes,
        };
      }
      return joke;
    });
    setJokes(updatedJokes);
    setFilteredJokes(updatedJokes);
    localStorage.setItem('cachedJokes', JSON.stringify(updatedJokes));
  };

  const sortJokes = (key) => {
    setActiveSort(key);
    const baseList = selectedType
      ? jokes.filter((joke) => joke.type === selectedType)
      : jokes;

    const sorted = [...baseList].sort((a, b) => {
      if (key === 'id') {
        return Number(a[key]) - Number(b[key]); // Orden ascendente para IDs
      } else if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key]); // Orden alfabético para strings
      } else if (typeof a[key] === 'number') {
        return b[key] - a[key]; // Orden descendente para números (likes/dislikes)
      }
      return 0;
    });
    setFilteredJokes(sorted);
    setCurrentPage(1);
  };

  const resetJokes = () => {
    const resetFiltered = selectedType
      ? jokes.filter((joke) => joke.type === selectedType)
      : jokes;

    setFilteredJokes(resetFiltered);
    setActiveSort('');
    setCurrentPage(1);
  };

  const resetCache = () => {
    localStorage.removeItem('cachedJokes');
    loadJokes();
    alert('Cache cleared! Fetching new jokes...');
  };

  const filterByType = (type) => {
    setSelectedType(type);
    const filtered = type
      ? jokes.filter((joke) => joke.type === type)
      : jokes;

    setFilteredJokes(filtered);
    setActiveSort('');
    setCurrentPage(1);
  };

  const addJoke = (newJoke) => {
    const updatedJokes = [
      ...jokes,
      { ...newJoke, likes: 0, dislikes: 0 },
    ];
    setJokes(updatedJokes);
    setFilteredJokes(updatedJokes);
    localStorage.setItem('cachedJokes', JSON.stringify(updatedJokes));
    setShowAddForm(false);
  };

  const indexOfLastJoke = currentPage * jokesPerPage;
  const indexOfFirstJoke = indexOfLastJoke - jokesPerPage;
  const currentJokes = filteredJokes.slice(indexOfFirstJoke, indexOfLastJoke);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Sorting and Filtering Controls */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <label htmlFor="typeFilter" className="me-2">Filter by Type:</label>
          <select
            id="typeFilter"
            className="form-select d-inline-block w-auto mx-2"
            value={selectedType}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value="">All Types</option>
            {[...new Set(jokes.map((joke) => joke.type))].map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <button
            className={`btn mx-1 ${activeSort === 'setup' ? 'btn-success' : 'btn-primary'}`}
            onClick={() => sortJokes('setup')}
          >
            Sort Alphabetically
          </button>
          <button
            className={`btn mx-1 ${activeSort === 'id' ? 'btn-success' : 'btn-info'}`}
            onClick={() => sortJokes('id')}
          >
            Sort by ID
          </button>
          <button className="btn btn-danger mx-1" onClick={resetJokes}>
            Reset Order
          </button>
        </div>

        <div>
          <button
            className={`btn mx-1 ${activeSort === 'likes' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => sortJokes('likes')}
          >
            👍 Sort by Likes
          </button>
          <button
            className={`btn mx-1 ${activeSort === 'dislikes' ? 'btn-success' : 'btn-outline-danger'}`}
            onClick={() => sortJokes('dislikes')}
          >
            👎 Sort by Dislikes
          </button>
          <button className="btn btn-warning mx-1" onClick={resetCache}>
            🔄 Reset Cache
          </button>
          <button className="btn btn-success" onClick={() => setShowAddForm((prev) => !prev)}>
            {showAddForm ? 'Close Add Joke' : 'Add Joke'}
          </button>
        </div>
      </div>

      {showAddForm && <AddJokeForm addJoke={addJoke} />}

      {currentJokes.map((joke) => (
        <JokeCard
          key={joke.id}
          joke={joke}
          onLike={() => updateLikes(joke.id, 'like')}
          onDislike={() => updateLikes(joke.id, 'dislike')}
        />
      ))}

      <Pagination
        jokesPerPage={jokesPerPage}
        totalJokes={filteredJokes.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* New Jokes Per Page Dropdown */}
      <div className="text-center mt-3">
        <label htmlFor="jokesPerPage" className="me-2">Jokes Per Page:</label>
        <select
          id="jokesPerPage"
          className="form-select d-inline-block w-auto"
          value={jokesPerPage}
          onChange={(e) => setJokesPerPage(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default JokeList;
