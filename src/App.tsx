import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Globe2, 
  Clock, 
  ChevronRight, 
  GraduationCap,
  Building2,
  School,
  CheckCircle2,
  ArrowRight,
  Mail,
  Lock,
  Users,
  Zap,
  Award
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import GetStarted from './pages/GetStarted';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started/*" element={<GetStarted />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;