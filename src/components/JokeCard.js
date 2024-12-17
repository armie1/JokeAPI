import React from 'react';

const JokeCard = ({ joke, onLike, onDislike }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h6 className="text-muted">ID: {joke.id} | Type: {joke.type}</h6>

        {/* Joke Setup and Punchline */}
        <h5 className="card-title">{joke.setup}</h5>
        <p className="card-text">{joke.punchline}</p>

        {/* Like and Dislike Buttons */}
        <div className="card-actions">
          <button className="btn btn-outline-success" onClick={onLike}>
            👍 Like ({joke.likes})
          </button>
          <button className="btn btn-outline-danger" onClick={onDislike}>
            👎 Dislike ({joke.dislikes})
          </button>
        </div>
      </div>
    </div>
  );
};

export default JokeCard;
