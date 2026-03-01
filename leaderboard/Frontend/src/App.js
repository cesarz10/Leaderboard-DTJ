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
    empty: "No scores yet! Be the first!",
    rulesTitle: "Game Rules",
    rulesSummary: "14.1 Continuous (also referred to as “Straight Pool”) is a call shot game played with a cue ball and fifteen object balls numbered 1 through 15. You are allowed to pocket the first 14 balls of the rack, but before shooting the 15th ball the 14 previously pocketed balls are racked, leaving the apex space vacant. After the 14 balls have been racked, you continue to shoot by attempting to pocket the 15th ball while simultaneously breaking out some of the 14 racked balls so your run may continue.",
    moreInfo: "More information",
    rules: "rulesEN.pdf"
  },
  NL: {
    title: "🏆 Hoogste runs van de maand",
    playerName: "Spelernaam",
    scoreText: "Score",
    dateText: "Datum (JJJJ-MM-DD)",
    addBtn: "Score Toevoegen",
    rank: "Rang",
    name: "Naam",
    empty: "Nog geen scores! Wees de eerste!",
    rulesTitle: "Spelregels",
    rulesSummary: "14.1 Continuous (ook wel “Straight Pool” genoemd) is een call shot spel gespeeld met een cue bal en vijftien object ballen genummerd van 1 tot 15. Je mag de eerste 14 ballen van de rack potten, maar voordat je de 15e bal pott worden de eerder gepotete ballen opnieuw gerackt, waardoor de apex ruimte leeg blijft. Nadat de 14 ballen opnieuw gerackt zijn, ga je verder met schieten door te proberen de 15e bal te potten terwijl je ook enkele van de 14 gerackte ballen uit het rack brengt zodat je run kan doorgaan.",
    moreInfo: "Meer informatie",
    rules: "rulesNL.pdf"
  },
  FR: {
    title: "🏆 Meilleures performances du mois",
    playerName: "Nom du Joueur",
    scoreText: "Score",
    dateText: "Date (AAAA-MM-JJ)",
    addBtn: "Ajouter un Score",
    rank: "Rang",
    name: "Nom",
    empty: "Aucun score pour le moment ! Soyez le premier !",
    rulesTitle: "Règles du jeu",
    rulesSummary: "14.1 Continuous (également appelé “Straight Pool”) est un jeu de shot appelé joué avec une boule de queue et quinze boules objet numérotées de 1 à 15. Vous êtes autorisé à faire tomber les 14 premières boules du rack, mais avant de tirer la 15e boule, les 14 boules précédemment faites tomber sont remises en place, laissant l’espace du sommet vide. Après que les 14 boules aient été remises en place, vous continuez à tirer en essayant de faire tomber la 15e boule tout en sortant certaines des 14 boules remises en place afin que votre run puisse continuer.",
    moreInfo: "Plus d'informations",
    rules: "rulesFR.pdf"
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

      // Refresh leaderboard
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

      <img src="/dtj_logo.jpg" alt='DTJ_logo' className="leaderboard-logo" />
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
              <td className="player-date">{entry.created_at.substring(0, 16).split('T')[0]}</td>
            </tr>
          ))}
          {sortedScores.length === 0 && (
            <tr>
              <td colSpan="4" className="empty-state">{t.empty}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br /><br />

      <div className="rules-section" style={{ marginTop: '30px', textAlign: 'center' }}>
        <h4>{t.rulesTitle || "Game Rules"}</h4>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '13px', lineHeight: '1.5' }}>
          {t.rulesSummary || "Brief summary of the rules..."}
        </p>
        <br />
        {/* Clickable PDF link */}
        <a
          href={t.rules}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0056b3', textDecoration: 'underline', fontWeight: 'bold', fontSize: '13px' }}
        >
          {t.moreInfo || "More information"}
        </a>
      </div>

    </div>
  );
};

export default Leaderboard;