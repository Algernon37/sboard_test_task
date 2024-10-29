import React, { useEffect, useState } from 'react';
import { fetchPolls, DeletePoll } from '../api/pollApi';
import config from '../config';
import { Poll } from '../types/Poll';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const PollList: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io(config.SOCKET_URL);
    socket.on('pollsListUpdated', (updatedPollslistData) => {
      setPolls(updatedPollslistData);
    });
    const loadPolls = async () => {
      const pollsData = await fetchPolls();
      setPolls(pollsData);
    };
    loadPolls();
    return () => {
      socket.off('pollsListUpdated');
    };
  }, []);

  const handleDeletePoll = async (pollId: string) => {
    try {
      await DeletePoll(pollId);
      setPolls(polls.filter((poll) => poll.id !== pollId));
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

  if (polls.length === 0) return <div>Loading polls...</div>;

  return (
    <div>
      <h2>All Polls</h2>
      <ul>
        {polls.map((poll) => (
          <li key={poll.id}>
            {poll.question}
            <button onClick={() => navigate(`/poll/${poll.id}`)}>
              View Poll
            </button>
            <button onClick={() => handleDeletePoll(poll.id)}>
              Delete Poll
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollList;
