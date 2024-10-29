import React, { useState, useEffect } from 'react';
import { fetchPoll, votePoll } from '../api/pollApi';
import { useParams } from 'react-router-dom';
import checkPollId from '../hooks/UseCheckPollId'
import { Poll } from '../types/Poll';
import config from '../config'
import io from 'socket.io-client';


const PollComponent: React.FC = () => {
    const [poll, setPoll] = useState<Poll | null>(null);
    const { pollId } = useParams<{ pollId: string }>();
    
    const loadPoll = async () => {
        try {
            const validatedPollId = checkPollId(pollId);
            const pollData = await fetchPoll(validatedPollId);
            setPoll(pollData);
        } catch (error) {
            console.error("Error loading poll:", error);
        }
    };

    useEffect(() => {
        const socket = io(config.SOCKET_URL);
        socket.on('pollUpdated', (updatedPollData) => {
            setPoll(updatedPollData); 
        });
        loadPoll();
        return () => {
            socket.off('pollUpdated');
        };
    }, []);

    const handleVote = async (optionId: string) => {
        try {
            const validatedPollId = checkPollId(pollId);
            await votePoll(validatedPollId, optionId);
            loadPoll();
        } catch (error) {
            console.error("Error while voting:", error);
        }
    };
    

    if (!poll) return <div>Loading...</div>;

    return (
        <div>
            <h2>{poll.question}</h2>
            {poll.options.map((option) => (
                <div key={option.id}>
                    <button onClick={() => handleVote(option.id)}>
                        {option.text} - {option.votes} votes
                    </button>
                </div>
            ))}
        </div>
    );
};

export default PollComponent;
