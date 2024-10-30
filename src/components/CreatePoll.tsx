import useCreatePoll from '../hooks/useCreatePoll'

const CreatePoll: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    question,
    setQuestion,
    options,
    handleCreatePoll,
    handleOptionChange,
    handleRemoveOption,
    handleAddOption,
  } = useCreatePoll();

  return (
    <div>
      <h2>Create Poll</h2>
      <button onClick={handleCreatePoll}>Create Poll</button>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll question"
      />
      {options.map((option, index) => (
        <div>
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
          />
          <button onClick={() => handleRemoveOption(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => handleAddOption()}>Add Option</button>
      <button onClick={onBack}>Back to Polls</button>
    </div>
  );
};

export default CreatePoll;
