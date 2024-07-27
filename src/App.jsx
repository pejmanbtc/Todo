import React, { useState } from 'react';
import Trade from './components/Trade';
import Sports from './components/Sports';
import Quran from './components/Quran';
import Language from './components/Language';
import './App.css';

const App = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  const renderComponent = () => {
    switch (selectedOption) {
      case 'trade':
        return <Trade />;
      case 'sports':
        return <Sports />;
      case 'quran':
        return <Quran />;
      case 'language':
        return <Language />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {selectedOption === '' ? (
        <div className="dropdown">
          <button className="dropdown-button">
            <i className="fas fa-bars"></i> Select an option
          </button>
          <div className="dropdown-content">
            <div onClick={() => handleSelectChange('trade')}>
              <i className="fas fa-chart-line"></i> ترید
            </div>
            <div onClick={() => handleSelectChange('sports')}>
              <i className="fas fa-futbol"></i> ورزش
            </div>
            <div onClick={() => handleSelectChange('quran')}>
              <i className="fas fa-book"></i> قرآن
            </div>
            <div onClick={() => handleSelectChange('language')}>
              <i className="fas fa-language"></i> زبان
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button className="back-button" onClick={() => setSelectedOption('')}>
            <i className="fas fa-arrow-left"></i> بازگشت به منو
          </button>
          {renderComponent()}
        </div>
      )}
    </div>
  );
};

export default App;
