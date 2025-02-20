import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved candidates from localStorage
  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setCandidates(savedCandidates);
  }, []);

  const fetchRandomCandidate = async () => {
    setLoading(true);
    setError(null);

    try {
      const users = await searchGithub();
      if (users.length > 0) {
        const user = await searchGithubUser(users[0].login);
        setCandidate(user);
      } else {
        setCandidate(null);
      }
    } catch (err) {
      setError("Failed to fetch candidate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomCandidate();
  }, []);

  const handleSaveCandidate = () => {
    if (candidate) {
      const updatedCandidates = [...candidates, candidate];
      setCandidates(updatedCandidates);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
      fetchRandomCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchRandomCandidate();
  };

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>
      {loading && <p>Loading candidate...</p>}
      {error && <p className="error">{error}</p>}
      
      {candidate ? (
        <div className="candidate-card">
          <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} className="avatar" />
          <div className="candidate-info">
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Username:</strong> {candidate.username}</p>
            <p><strong>Location:</strong> {candidate.location}</p>
            <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
            <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          </div>
          <div className="button-container">
            <button className="save-btn" onClick={handleSaveCandidate}>+</button>
            <button className="skip-btn" onClick={handleSkipCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
