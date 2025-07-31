import React from 'react';
import Clicker from './components/Clicker';
import Cursor from './components/Cursor';

const App = () => {
  return (
    <div className="relative bg-transparent h-screen w-screen overflow-hidden">
      <Cursor />
      <Clicker />
      {/* 3D Cursor Layer */}
    </div>
  );
};

export default App;
