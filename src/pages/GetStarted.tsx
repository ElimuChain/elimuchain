import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Building2,
  GraduationCap,
  Users,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { web3Service } from "../lib/web3";
import Footer from "../components/Footer";

function GetStarted() {
  const [userType, setUserType] = useState<string>("");

  const steps = [
    { path: "", component: UserTypeSelection },
    { path: "account", component: AccountSetup },
    { path: "verification", component: Verification },
    { path: "complete", component: Complete },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Routes>
          {steps.map((step) => (
            <Route
              key={step.path}
              path={step.path}
              element={
                <step.component userType={userType} setUserType={setUserType} />
              }
            />
          ))}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function UserTypeSelection({
  setUserType,
}: {
  setUserType: (type: string) => void;
}) {
  const navigate = useNavigate();

  const handleSelection = (type: string) => {
    setUserType(type);
    navigate("account");
  };

  const options = [
    {
      type: "institution",
      icon: Building2,
      title: "Educational Institution",
      description: "Universities, colleges, and certification providers",
    },
    {
      type: "student",
      icon: GraduationCap,
      title: "Student/Graduate",
      description: "Access and share your academic credentials",
    },
    {
      type: "employer",
      icon: Users,
      title: "Employer",
      description: "Verify credentials and streamline hiring",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          Welcome to ElimuChain
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Select your role to get started
        </p>
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
              <p className="text-gray-600 dark:text-gray-300">
                {option.description}
              </p>
            </div>
            <ChevronRight className="h-6 w-6 ml-auto text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
          </button>
        ))}
      </div>
    </div>
  );
}

function AccountSetup({ userType }: { userType: string }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Create user profile
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: authData.user?.id,
          email: formData.email,
          full_name: formData.fullName,
          user_type: userType,
        },
      ]);

      if (profileError) throw profileError;

      // 3. If institution or employer, connect wallet
      if (userType !== "student") {
        try {
          const walletAddress = await web3Service.connect();
          await supabase
            .from("users")
            .update({ wallet_address: walletAddress })
            .eq("id", authData.user?.id);
        } catch (walletError) {
          console.error("Wallet connection error:", walletError);
          // Continue without wallet - user can connect later
        }
      }

      navigate("verification");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-bold mb-4 gradient-text">
          Create Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Set up your ElimuChain account
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, fullName: e.target.value }))
            }
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
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
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
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-primary justify-center ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating Account..." : "Continue"}
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
        <h2 className="text-2xl font-bold mb-4 gradient-text">
          Verify Your Account
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Enter the verification code sent to your email
        </p>
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
        onClick={() => navigate("complete")}
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
        <h2 className="text-2xl font-bold mb-4 gradient-text">
          Welcome to ElimuChain!
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your account has been successfully created. Please sign in to access
          your dashboard.
        </p>
      </div>

      <button
        onClick={() => navigate("/sign-in")}
        className="w-full btn-primary justify-center"
      >
        Sign In
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default GetStarted;
