import { useState } from 'react'
import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/Landing';
import TimerPage from './pages/Timer/Timer';
import PetPage from './pages/Pet/Pet';
import StatisticsPage from './pages/Statistics/Statistics';
import SettingsPage from './pages/Settings/Settings';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/pet" element={<PetPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
