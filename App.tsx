
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
      </div>
    </Router>
  );
};

export default App;
