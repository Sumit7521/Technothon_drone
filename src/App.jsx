import React from 'react';
import Clicker from './components/Clicker';
import Cursor from './components/Cursor';

const App = () => {
  return (
    <div className="relative h-screen w-screen bg-gray-600 overflow-hidden">
      {/* <Clicker /> */}
      <Cursor />

      {/* 3D Cursor Layer */}
    </div>
  );
};

export default App;
