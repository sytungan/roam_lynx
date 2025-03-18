import { useEffect } from '@lynx-js/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';

import './App.css';
import './i18n/index.js'; // Import i18n configuration
import { QueryProvider } from './providers/QueryProvider.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { SettingsScreen } from './screens/SettingsScreen.js';

// Navigation logger component to debug routing
function NavigationLogger() {
  const location = useLocation();
  
  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);
  
  return null;
}

export function App() {
  useEffect(() => {
    console.log('Hello, Roam App')
  }, [])

  return (
    <QueryProvider>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <view className="app-container">
          <NavigationLogger />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </view>
      </MemoryRouter>
    </QueryProvider>
  )
}
