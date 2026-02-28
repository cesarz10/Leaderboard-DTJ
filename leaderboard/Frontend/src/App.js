import React, { useState, useEffect } from 'react';
import { getData, supabase } from './Utils/api';
import './Leaderboard.css';


// Translations for the different languages:
const translations = {
  ENG: {
    title: "🏆 High Runs of the Month",
    playerName: "Player Name",
    scoreText: "Score",
    dateText: "Date (YYYY-MM-DD)",
    addBtn: "Add Score",
    rank: "Rank",
    name: "Name",
    empty: "No scores yet! Be the first!"
  },
  NL: {
    title: "🏆 Hoogste runs van de maand",
    playerName: "Spelernaam",
    scoreText: "Score",
    dateText: "Datum (JJJJ-MM-DD)",
    addBtn: "Score Toevoegen",
    rank: "Rang",
    name: "Naam",
    empty: "Nog geen scores! Wees de eerste!"
  },
  FR: {
    title: "🏆 Meilleures performances du mois",
    playerName: "Nom du Joueur",
    scoreText: "Score",
    dateText: "Date (AAAA-MM-JJ)",
    addBtn: "Ajouter un Score",
    rank: "Rang",
    name: "Nom",
    empty: "Aucun score pour le moment ! Soyez le premier !"
  }
};


const Leaderboard = () => {
  const [data, setData] = useState([]);

  const [newName, setNewName] = useState('');
  const [newScore, setNewScore] = useState('');

  const [lang, setLang] = useState('ENG');

  // Helper variable to make the JSX cleaner
  const t = translations[lang];

  useEffect(() => {
    getData().then(data => {
      setData(JSON.parse(data));
    });
  }, []);


  const handleAddScore = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted

    // 1. Send the new data to Supabase
    const { data, error } = await supabase
      .from('user_data')
      .insert([
        {
          name: newName,
          score: Number(newScore) // Ensures the score is saved as a number, not a string
        }
      ])
      .select(); // This tells Supabase to send back the row it just created

    // 2. Handle any potential errors
    if (error) {
      console.error("Error saving score:", error.message);
      alert("Oops! Couldn't save the score. Check the console.");
      return;
    }

    // 3. If successful, update the UI and clear the form
    if (data) {
      // Clear the input fields so the next player can type
      setNewName('');
      setNewScore('');

      // Refreshing leaderboard here!
      getData().then(data => {
        setData(JSON.parse(data));
      });
    }
  };

  // Sort the scores in descending order before rendering
  const sortedScores = [...data].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">

      <div className="language-selector">
        <span className={lang === 'ENG' ? 'active-lang' : ''} onClick={() => setLang('ENG')}>ENG</span> /
        <span className={lang === 'NL' ? 'active-lang' : ''} onClick={() => setLang('NL')}> NL</span> /
        <span className={lang === 'FR' ? 'active-lang' : ''} onClick={() => setLang('FR')}> FR</span>
      </div>

      <img src="/dtj_logo.jpg" className="leaderboard-logo" />
      <h2>{t.title}</h2>

      {/* Submission Form */}
      <form onSubmit={handleAddScore} className="add-score-form">
        <input
          type="text"
          placeholder={t.playerName}
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder={t.scoreText}
          value={newScore}
          onChange={(e) => setNewScore(e.target.value)}
          required
        />
        <button type="submit">{t.addBtn}</button>
      </form>

      {/* Leaderboard Table */}
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>{t.rank}</th>
            <th>{t.name}</th>
            <th>{t.scoreText}</th>
            {/* Grabs just the word 'Date/Datum' */}
            <th>{t.dateText.split(' ')[0]}</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((entry, index) => (
            <tr key={index}>
              <td>
                {/* Add medals for the top 3 */}
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </td>
              <td className="player-name">{entry.name}</td>
              <td className="player-score">{entry.score?.toLocaleString() ?? '0'}</td>
              <td className="player-date">{entry.created_at.substring(0, 16)}</td>
            </tr>
          ))}
          {sortedScores.length === 0 && (
            <tr>
              <td colSpan="4" className="empty-state">{t.empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;