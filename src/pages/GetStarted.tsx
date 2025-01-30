import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Building2, GraduationCap, Users, ChevronRight, ArrowLeft } from 'lucide-react';

function GetStarted() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<string>('');

  const steps = [
    { path: '', component: UserTypeSelection },
    { path: 'account', component: AccountSetup },
    { path: 'verification', component: Verification },
    { path: 'complete', component: Complete }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Routes>
          {steps.map((step) => (
            <Route 
              key={step.path} 
              path={step.path} 
              element={<step.component userType={userType} setUserType={setUserType} />} 
            />
          ))}
        </Routes>
      </div>
    </div>
  );
}

function UserTypeSelection({ setUserType }: { setUserType: (type: string) => void }) {
  const navigate = useNavigate();
  
  const handleSelection = (type: string) => {
    setUserType(type);
    navigate('account');
  };

  const options = [
    {
      type: 'institution',
      icon: Building2,
      title: 'Educational Institution',
      description: 'Universities, colleges, and certification providers'
    },
    {
      type: 'student',
      icon: GraduationCap,
      title: 'Student/Graduate',
      description: 'Access and share your academic credentials'
    },
    {
      type: 'employer',
      icon: Users,
      title: 'Employer',
      description: 'Verify credentials and streamline hiring'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">Welcome to ElimuChain</h1>
        <p className="text-gray-600 dark:text-gray-300">Select your role to get started</p>
      </div>
      
      <div className="grid gap-6">
        {options.map((option) => (
          <button
            key={option.type}
            onClick={() => handleSelection(option.type)}
            className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group text-left"
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mr-6">
              <option.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {option.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{option.description}</p>
            </div>
            <ChevronRight className="h-6 w-6 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AccountSetup() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-md mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Create Your Account</h2>
        <p className="text-gray-600 dark:text-gray-300">Set up your ElimuChain account</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('verification'); }}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full btn-primary justify-center"
        >
          Continue
          <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Verification() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-md mx-auto space-y-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Verify Your Account</h2>
        <p className="text-gray-600 dark:text-gray-300">Enter the verification code sent to your email</p>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-xl font-bold rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
          />
        ))}
      </div>

      <button
        onClick={() => navigate('complete')}
        className="w-full btn-primary justify-center"
      >
        Verify
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function Complete() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-md mx-auto text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900">
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 gradient-text">Welcome to ElimuChain!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your account has been successfully created. You're ready to start using ElimuChain.
        </p>
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="w-full btn-primary justify-center"
      >
        Go to Dashboard
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default GetStarted;