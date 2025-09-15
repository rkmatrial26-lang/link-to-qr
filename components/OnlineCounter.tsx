
import React, { useState, useEffect } from 'react';

export const OnlineCounter: React.FC = () => {
  const [count, setCount] = useState(2626);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => {
        const change = Math.floor(Math.random() * 10) - 4; // -4 to +5
        const newCount = prevCount + change;
        return newCount > 0 ? newCount : 2500;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
        <div className="relative bg-slate-800 px-6 py-3 rounded-full shadow-lg">
            <div className="flex items-center space-x-3">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-slate-400">
                    <span className="font-bold text-slate-200">
                      {count}
                    </span>{' '}
                    people online are creating QR codes right now
                </p>
            </div>
        </div>
    </div>
  );
};