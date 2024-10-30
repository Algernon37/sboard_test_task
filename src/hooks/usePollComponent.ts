import { useState, useEffect } from 'react';
import { fetchPoll, votePoll } from '../api/pollApi';
import { Poll } from '../types/Poll';
import config from '../config'
import io from 'socket.io-client';

const usePoll = (pollId: string) => {
    const [poll, setPoll] = useState<Poll | null>(null);

    const loadPoll = async () => {
        try {
            const pollData = await fetchPoll(pollId);
            setPoll(pollData);
        } catch (error) {
            console.error("Error loading poll:", error);
        }
    };

    const handleVote = async (optionId: string) => {
        try {
            await votePoll(pollId, optionId);
            loadPoll(); 
        } catch (error) {
            console.error("Error while voting:", error);
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
    }, [pollId]);
   
    return {
        poll,
        handleVote,
    };
};

export default usePoll;
