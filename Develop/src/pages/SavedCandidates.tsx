import { useState, useEffect } from "react";
import Candidate from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(candidates);
  }, []);

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul className="candidate-list">
          {savedCandidates.map((candidate, index) => (
            <li key={index} className="candidate-card">
              <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} className="avatar" />
              <div className="candidate-info">
                <p><strong>Name:</strong> {candidate.name}</p>
                <p><strong>Username:</strong> {candidate.username}</p>
                <p><strong>Location:</strong> {candidate.location}</p>
                <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
                <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
                <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SavedCandidates;






