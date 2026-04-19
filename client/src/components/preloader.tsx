import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade-out animation after loading time
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Start fade-out after 2.5 seconds

    // Complete loading after fade-out animation
    const completeTimer = setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 3000); // Complete after 3 seconds total

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isLoading) return null;

  return (
    <div 
      className={`preloader-container ${!isVisible ? 'preloader-fade-out' : ''}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      <div className="loader">
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
      </div>
    </div>
  );
}