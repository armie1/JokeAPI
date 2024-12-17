import React, { useState } from 'react';

const AddJokeForm = ({ addJoke }) => {
  const [setup, setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [type, setType] = useState('general'); // Default type

  // Hardcoded joke types for the dropdown
  const jokeTypes = ['general', 'programming', 'knock-knock', 'dad'];

  // Validate input before submission
  const validateInput = () => {
    return setup.trim() !== '' && punchline.trim() !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateInput()) {
      alert('Both Setup and Punchline are required!');
      return;
    }

    addJoke({
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID
      setup: setup.trim(),
      punchline: punchline.trim(),
      type,
    });

    // Reset form inputs
    setSetup('');
    setPunchline('');
    setType('general');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h5 className="form-title">Add a New Joke</h5>

      <div className="form-group">
        <label className="form-label">Setup:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter joke setup/question"
          value={setup}
          onChange={(e) => setSetup(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Punchline:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter joke punchline/answer"
          value={punchline}
          onChange={(e) => setPunchline(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type:</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {jokeTypes.map((jokeType) => (
            <option key={jokeType} value={jokeType}>
              {jokeType.charAt(0).toUpperCase() + jokeType.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary submit-btn" type="submit">
        Add Joke
      </button>
    </form>
  );
};

export default AddJokeForm;
