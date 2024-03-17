import './App.css'
import '@mantine/core/styles.css';
import { Flex, MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing/Landing';
import TimerPage from './pages/Timer/Timer';
import PetPage from './pages/Pet/Pet';
import StatisticsPage from './pages/Statistics/Statistics';
import FriendsPage from './pages/Friends/Friends';
import ProfilePage from './pages/Profile/Profile';
import SettingsPage from './pages/Settings/Settings';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Flex bg="#fef9f7">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/pet" element={<PetPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Flex>
      </Router>
    </MantineProvider>
  )
}

export default App
