import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const fetchRandomCandidate = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      const user = await searchGithubUser(users[0].login);
      setCandidate(user);
    } else {
      setCandidate(null);
    }
  };

  useEffect(() => {
    fetchRandomCandidate();
  }, []);

  const handleSaveCandidate = () => {
    if (candidate) {
      setCandidates([...candidates, candidate]);
      fetchRandomCandidate();
    }
  };

  const handleSkipCandidate = () => {
    fetchRandomCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div>
          <img src={candidate.avatar} alt={`${candidate.username}'s avatar`} />
          <p>Name: {candidate.name}</p>
          <p>Username: {candidate.username}</p>
          <p>Location: {candidate.location}</p>
          <p>Email: {candidate.email}</p>
          <p>Company: {candidate.company}</p>
          <a href={candidate.html_url}>GitHub Profile</a>
          <button onClick={handleSaveCandidate}>+</button>
          <button onClick={handleSkipCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};

export default CandidateSearch;
