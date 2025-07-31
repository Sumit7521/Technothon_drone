import React, { useEffect, useRef, useState } from 'react';

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      if (!started && audioRef.current) {
        audioRef.current.play().then(() => {
          console.log('✅ Background music playing');
          setStarted(true);
        }).catch(err => {
          console.warn('⚠️ Autoplay blocked:', err);
        });

        window.removeEventListener('click', handleStart);
      }
    };

    window.addEventListener('click', handleStart);
    return () => window.removeEventListener('click', handleStart);
  }, [started]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      src="/music/Dhara%20Dhara%20Tani%20Kamar%20Raja%20Ji.mp3"
    />
  );
}

export default BackgroundMusic;
