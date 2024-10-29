export interface Poll {
    id: string;
    question: string;
    options: {
        id: string;
        text: string;
        votes: number;
    }[];
}

export interface NewPoll {
    question: string;
    options: string[];
}

export interface PollProps {
    pollId: string;
}