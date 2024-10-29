import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PollList from './PollList';
import CreatePoll from './CreatePoll';
import PollComponent from './PollComponent';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PollList />} />
        <Route path="/create" element={<CreatePoll />} />
        <Route path="/poll/:pollId" element={<PollComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
