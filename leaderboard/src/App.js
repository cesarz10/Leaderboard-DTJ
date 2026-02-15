import React, { useState } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  // 1. Setup initial state with some dummy data
  const [scores, setScores] = useState([
    { id: 1, name: 'Alice', score: 9500, date: '2026-02-14' },
    { id: 2, name: 'Bob', score: 8200, date: '2026-02-13' },
    { id: 3, name: 'Charlie', score: 10500, date: '2026-02-12' },
  ]);

  // State for the new entry form
  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  // 2. Handle form submission
  const handleAddScore = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!newName.trim() || !newScore) return;

    // Create a new score object
    const newEntry = {
      id: Date.now(), // Generate a unique ID
      name: newName,
      score: parseInt(newScore, 10),
      // Automatically generate today's date in YYYY-MM-DD format
      date: new Date().toISOString().split('T')[0] 
    };

    // Update the state with the new entry
    setScores([...scores, newEntry]);
    
    // Clear the form
    setNewName('');
    setNewScore('');
  };

  // 3. Sort the scores in descending order before rendering
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h2>🏆 High Scores</h2>

      {/* Submission Form */}
      <form onSubmit={handleAddScore} className="add-score-form">
        <input
          type="text"
          placeholder="Player Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Score"
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          required
        />
        <button type="submit">Add Score</button>
      </form>

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((entry, index) => (
            <tr key={entry.id}>
              <td>
                {/* Add medals for the top 3 */}
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </td>
              <td className="player-name">{entry.name}</td>
              <td className="player-score">{entry.score.toLocaleString()}</td>
              <td className="player-date">{entry.date}</td>
            </tr>
          ))}
          {sortedScores.length === 0 && (
            <tr>
              <td colSpan="4" className="empty-state">No scores yet! Be the first!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;