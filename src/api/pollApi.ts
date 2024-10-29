import axios from 'axios';
import { NewPoll, Poll } from '../types/Poll';
import config from '../config';

const API_URL = config.API_URL;

export const fetchPolls = async (): Promise<Poll[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createPoll = async (newPoll: NewPoll) => {
    const response = await axios.post(API_URL, newPoll);
    return response.data;
};

export const votePoll = async (pollId: string, optionId: string) => {
    const response = await axios.post(`${API_URL}/${pollId}/vote`, { optionId });
    return response.data;
};

export const fetchPoll = async (pollId: string): Promise<Poll> => {
    const response = await axios.get(`${API_URL}/${pollId}`);
    return response.data;
};

export const DeletePoll = async (pollId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${pollId}`);
};
