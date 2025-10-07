import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Dashboard Layout
import DashboardLayout from '../pages/DashboardLayout';

// Dashboard Pages
import WorkspacePage from '../pages/WorkspacePage';
import BoardDetailPage from '../pages/BoardDetailPage';
import BoardView from '../components/BoardView';

const DashboardRouter = () => {
  return (
    <Routes>
      {/* This router is mounted at /dashboard/* from AppRouter, so use relative paths here */}
      <Route element={<DashboardLayout />}>
        <Route index element={<WorkspacePage />} />
        <Route path="boards" element={<BoardView />} />
        <Route path="boards/:boardId" element={<BoardView />} />
      </Route>
    </Routes>
  );
};

export default DashboardRouter;
