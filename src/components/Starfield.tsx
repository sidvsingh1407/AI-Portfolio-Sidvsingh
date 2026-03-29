
import React, { useMemo } from 'react';

const Starfield: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 250 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 20 + Math.random() * 60; // Faster twinkle
      const driftX = (Math.random() - 0.5) * 100; // Drift range
      const driftY = (Math.random() - 0.5) * 100;
      return (
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            '--duration': `${duration}s`,
            '--drift-x': `${driftX}px`,
            '--drift-y': `${driftY}px`,
          } as React.CSSProperties}
        />
      );
    });
  }, []);

  return <div className="stars-container">{stars}</div>;
};

export default Starfield;
