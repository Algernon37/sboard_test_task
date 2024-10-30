import { PollProps } from '../types/Poll';
import usePollComponent from '../hooks/usePollComponent'  

const PollComponent: React.FC<PollProps> = ({ pollId, onBack }) => {
    const { poll, handleVote } = usePollComponent(pollId); 
    
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
            <button onClick={onBack}>Back to Polls</button>
        </div>
    );
};

export default PollComponent;
