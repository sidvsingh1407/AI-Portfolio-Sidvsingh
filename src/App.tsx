
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import Header from './components/Header';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen relative overflow-x-hidden">
        <div className="noise" />
        <Header />
        <ScrollToTop />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/agentic-systems" element={<Projects />} />
            <Route path="/vibe-coding" element={<Projects />} />
          </Routes>
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </div>
    </Router>
  );
};

export default App;
