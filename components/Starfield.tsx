
import React, { useMemo } from 'react';

const Starfield: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 50 + Math.random() * 100;
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
          } as React.CSSProperties}
        />
      );
    });
  }, []);

  return <div className="stars-container">{stars}</div>;
};

export default Starfield;
