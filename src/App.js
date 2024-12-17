import React from 'react';
import './App.css';
import JokeList from './components/JokeList';

function App() {
  return (
    <div className="App">
      {/* Title Section */}
      <header className="App-header">
        <h1 className="app-title">Jokes App</h1>
      </header>

      {/* Joke List Component */}
      <main>
        <JokeList />
      </main>
    </div>
  );
}

export default App;
