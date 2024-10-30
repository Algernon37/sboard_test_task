import usePolls from '../hooks/usePolls'
import PollComponent from './PollComponent'
import CreatePoll from './CreatePoll'

const PollList: React.FC = () => {
  const {
    polls,
    selectedPollId,
    showCreatePoll,
    showList,
    handleDeletePoll,
    handleViewPoll,
    handleBackToList,
    handleCreatePoll,
  } = usePolls();

  return (
    <div>
      {showCreatePoll ? (
        <CreatePoll onBack={handleBackToList} />
      ) : showList ? (
        <>
          <h2>All Polls</h2>
          <ul>
            <button onClick={handleCreatePoll}>Create newPoll</button>
            {polls.map((poll) => (
              <li key={poll.id}>
                {poll.question}
                <button onClick={() => handleViewPoll(poll.id)}>View Poll</button>
                <button onClick={() => handleDeletePoll(poll.id)}>Delete Poll</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        selectedPollId && <PollComponent pollId={selectedPollId} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default PollList;
