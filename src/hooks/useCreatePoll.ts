import { useState } from 'react';
import { createPoll } from '../api/pollApi'; 
import { NewPoll } from '../types/Poll';

const useCreatePoll = () => {
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '']);

    const handleCreatePoll = async () => {
        const newPoll: NewPoll = { question, options };
        await createPoll(newPoll);
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleRemoveOption = (index: number) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    return {
        question,
        setQuestion,
        options,
        handleCreatePoll,
        handleOptionChange,
        handleRemoveOption,
        handleAddOption,
    };
};

export default useCreatePoll;
