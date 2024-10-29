import React, { useState } from 'react';
import { createPoll } from '../api/pollApi';
import { NewPoll } from '../types/Poll';
import { useNavigate } from 'react-router-dom';

const CreatePoll: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const navigate = useNavigate();

  const handleCreatePoll = async () => {
    const newPoll: NewPoll = { question, options };
    await createPoll(newPoll);
    navigate('/polls');
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

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
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <button onClick={() => setOptions([...options, ''])}>Add Option</button>
    </div>
  );
};

export default CreatePoll;
