import { useState, useEffect } from 'react';
import { Poll } from '../types/Poll'; 
import { DeletePoll, fetchPolls } from '../api/pollApi'; 
import { io } from 'socket.io-client';
import config from '../config'; 

const usePolls = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [selectedPollId, setSelectedPollId] = useState<string | null>(null);
    const [showCreatePoll, setShowCreatePoll] = useState<boolean>(false);
    const [showList, setShowList] = useState<boolean>(true);

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

    const handleViewPoll = (pollId: string) => {
        setSelectedPollId(pollId);
        setShowList(false);
    };

    const handleBackToList = () => {
        setShowList(true);
        setSelectedPollId(null);
        setShowCreatePoll(false);
    };

    const handleCreatePoll = () => {
        setShowCreatePoll(true);
        setShowList(false);
    };

    return {
        polls,
        selectedPollId,
        showCreatePoll,
        showList,
        handleDeletePoll,
        handleViewPoll,
        handleBackToList,
        handleCreatePoll,
    };
};

export default usePolls;
