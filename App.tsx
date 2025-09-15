
import React, { useState, useEffect } from 'react';
import { QRCodeGenerator } from './components/QRCodeGenerator';
import { HowItWorks } from './components/HowItWorks';
import { OnlineCounter } from './components/OnlineCounter';
import { StatsCards } from './components/StatsCards';

const Header: React.FC = () => (
  <header className="text-center py-8 sm:py-12">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-200">
      <span className="bg-gradient-to-r from-blue-500 to-indigo-400 text-transparent bg-clip-text">
        Link-to-QR
      </span>{' '}
      Code Generator
    </h1>
    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
      Instantly create and customize stunning QR codes for your links. Simple, fast, and professional.
    </p>
  </header>
);

const Footer: React.FC = () => (
  <footer className="text-center py-8 mt-12 border-t border-slate-800">
    <p className="text-slate-400">
      Made by{' '}
      <a
        href="https://github.com/rushi-d"
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-indigo-400 hover:text-indigo-300"
      >
        CodeByRushi
      </a>
    </p>
  </footer>
);

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 antialiased">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <Header />
        <main>
          <QRCodeGenerator />
          <div className="mt-24">
            <OnlineCounter />
          </div>
          <div className="mt-16">
            <HowItWorks />
          </div>
          <div className="mt-24">
            <StatsCards />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;