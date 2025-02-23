// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Verify from './pages/Verify';
import Issue from './pages/Issue';
import About from './pages/About';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import { useToast } from './hooks/useToast';

function App() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1510519138101-570d1dca3d66?auto=format&fit=crop&q=80')] 
        bg-cover bg-center opacity-10 pointer-events-none" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/issue" element={<Issue />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;