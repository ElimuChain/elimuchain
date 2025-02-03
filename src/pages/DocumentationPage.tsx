import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Code, Terminal } from "lucide-react";
import Footer from "../components/Footer";

function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      items: [
        "Introduction to ElimuChain",
        "System Requirements",
        "Quick Start Guide",
        "Basic Concepts",
      ],
    },
    {
      title: "Core Features",
      items: [
        "Credential Issuance",
        "Verification Process",
        "Institution Management",
        "User Roles",
      ],
    },
    {
      title: "API Reference",
      items: [
        "Authentication",
        "Credentials API",
        "Verification API",
        "Webhooks",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold gradient-text">
                ElimuChain
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/get-started" className="btn-primary">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about implementing and using ElimuChain
          </p>
        </div>
      </section>

      {/* Documentation Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-4 gradient-text">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center text-gray-600 dark:text-gray-300"
                    >
                      <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Code Examples
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quick implementation examples to get you started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Code className="h-5 w-5 text-gray-400" />
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`
const { data, error } = await supabase
  .from('credentials')
  .insert([{
    title: 'Bachelor of Science',
    recipient_id: 'user_id',
    description: 'Computer Science'
  }]);
                `}</code>
              </pre>
            </div>
            <div className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <Terminal className="h-5 w-5 text-gray-400" />
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`
const txHash = await web3Service
  .issueCredential(
    recipientAddress,
    credentialHash
  );
                `}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DocumentationPage;
