import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Events searchTerm={searchTerm} />} />
        <Route path="/events/:id" element={<EventDetails />} />
      
      </Routes>
      
    </>
  );
}

export default App;