import { useState, useEffect } from 'react'
import Popup from './components/Popup'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Set html class for global dark mode
    document.documentElement.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <div className={`App min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
      <Popup isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  )
}

export default App
