import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { web3Service } from "../lib/web3";
import { Routes, Route, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Award,
  UserCircle,
  Settings,
  Bell,
  HelpCircle,
  Search,
  CheckCircle,
  ChevronRight,
  Clock,
} from "lucide-react";
import { ethers } from "ethers";

// Add new types
type User = {
  id: string;
  email: string;
  full_name: string;
  user_type: string;
  wallet_address: string | null;
};

type Credential = {
  id: string;
  title: string;
  description: string;
  issue_date: string;
  blockchain_tx_hash: string | null;
  issuer: User;
  recipient: User;
};

// Components
const Sidebar = () => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: UserCircle, label: "Profile", path: "/dashboard/profile" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Help", path: "/dashboard/help" },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold gradient-text">ElimuChain</span>
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activePath === item.path
                  ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActivePath(item.path)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

const Header = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Certificate Issued",
      message: "Your Computer Science degree has been verified",
      time: "5m ago",
    },
    {
      id: 2,
      title: "Verification Request",
      message: "Tech Corp wants to verify your credentials",
      time: "1h ago",
    },
  ]);

  return (
    <header className="fixed top-0 right-0 left-64 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates, institutions..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Overview = () => {
  const stats = [
    {
      label: "Total Certificates",
      value: "12",
      icon: Award,
      trend: "+2 this month",
    },
    {
      label: "Pending Verifications",
      value: "3",
      icon: Clock,
      trend: "5 completed",
    },
    {
      label: "Institutions",
      value: "4",
      icon: Award,
      trend: "All verified",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "certificate",
      title: "Bachelor of Science in Computer Science",
      institution: "Tech University",
      date: "2024-03-15",
      status: "verified",
    },
    {
      id: 2,
      type: "verification",
      title: "Data Science Certificate",
      institution: "Data Academy",
      date: "2024-03-10",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.trend}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/50 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "verified"
                      ? "bg-green-50 dark:bg-green-900/50"
                      : "bg-yellow-50 dark:bg-yellow-900/50"
                  }`}
                >
                  {activity.status === "verified" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.date}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        throw new Error("Not authenticated");
      }

      // Get user profile
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (userError) throw userError;
      setUser(userData);

      // Get credentials
      const { data: credentialsData, error: credentialsError } = await supabase
        .from("credentials")
        .select(
          `
          *,
          issuer:users!credentials_issuer_id_fkey(*),
          recipient:users!credentials_recipient_id_fkey(*)
        `
        )
        .or(`issuer_id.eq.${authUser.id},recipient_id.eq.${authUser.id}`);

      if (credentialsError) throw credentialsError;
      setCredentials(credentialsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const issueCredential = async (
    recipientEmail: string,
    title: string,
    description: string
  ) => {
    try {
      // 1. Get recipient user
      const { data: recipientData, error: recipientError } = await supabase
        .from("users")
        .select("*")
        .eq("email", recipientEmail)
        .single();

      if (recipientError) throw recipientError;

      // 2. Create credential hash
      const credentialHash = ethers.keccak256(
        ethers.toUtf8Bytes(
          JSON.stringify({
            issuer: user?.id,
            recipient: recipientData.id,
            title,
            description,
            timestamp: new Date().toISOString(),
          })
        )
      );

      // 3. Issue on blockchain
      const txHash = await web3Service.issueCredential(
        recipientData.wallet_address || recipientData.id,
        credentialHash
      );

      // 4. Store in database
      const { error: credentialError } = await supabase
        .from("credentials")
        .insert([
          {
            issuer_id: user?.id,
            recipient_id: recipientData.id,
            title,
            description,
            blockchain_tx_hash: txHash,
          },
        ]);

      if (credentialError) throw credentialError;

      // 5. Refresh credentials
      fetchUserData();
    } catch (error) {
      console.error("Error issuing credential:", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar userType={user?.user_type} />
      <Header userType={user?.user_type} />
      <main className="ml-64 pt-16 p-8">
        <Routes>
          <Route
            path="/"
            element={
              <Overview userType={user?.user_type} credentials={credentials} />
            }
          />
          <Route
            path="/certificates"
            element={
              <Certificates
                userType={user?.user_type}
                credentials={credentials}
                onIssueCredential={issueCredential}
              />
            }
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/settings" element={<Settings user={user} />} />
          <Route path="/help" element={<div>Help Page</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default Dashboard;
