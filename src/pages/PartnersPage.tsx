import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Handshake,
  Globe2,
  Shield,
} from "lucide-react";
import Footer from "../components/Footer";

function PartnersPage() {
  const partners = [
    {
      name: "Lisk",
      description:
        "Lisk offers a highly efficient, lightning-fast, and easily scalable Layer 2 (L2) network built on Optimism (OP) and secured by Ethereum.",
      logo: "https://usethebitcoin.com/wp-content/uploads/2018/04/Lisk-UsetheBTC-2.png",
    },
    {
      name: "Web3 Clubs",
      description:
        "A movement whose focus is championing for web3 acceleration & adoption in Africa by setting up web3clubs in learning institutions.",
      logo: "https://miro.medium.com/v2/resize:fit:2400/1*oCAGgIw9D0F5Uw-9TnAFsg.png",
    },
    {
      name: "Adamur",
      description:
        "Leading technology consulting firm specializing in blockchain solutions.",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
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
            Our Partners
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Collaborating with industry leaders to transform education
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Partnership Benefits
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our ecosystem and help shape the future of education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                title: "Global Reach",
                description:
                  "Access to a worldwide network of educational institutions and employers",
              },
              {
                icon: Shield,
                title: "Technology Access",
                description:
                  "Priority access to our blockchain infrastructure and tools",
              },
              {
                icon: Handshake,
                title: "Collaborative Growth",
                description:
                  "Joint development opportunities and shared success",
              },
            ].map((benefit, index) => (
              <div key={index} className="feature-card">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg w-fit mb-6">
                  <benefit.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 feature-icon" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
            <p className="text-lg mb-8 opacity-90">
              Join us in revolutionizing the future of academic credentials
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors inline-flex items-center">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PartnersPage;
