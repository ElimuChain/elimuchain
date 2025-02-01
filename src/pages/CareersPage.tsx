import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Building2,
  Users,
  Heart,
} from "lucide-react";

function CareersPage() {
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
            Join Our Mission
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            WE'LL FIND YOU, WHEN YOU WANT US!!! Alright, listen up! we're not
            currently hiring, we're always interested in connecting with
            talented individuals who share our vision.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">
              Our Culture
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              At ElimuChain, we foster an environment of innovation,
              collaboration, and continuous learning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Innovation First",
                description:
                  "We encourage creative thinking and innovative solutions to transform education.",
              },
              {
                icon: Users,
                title: "Collaborative Spirit",
                description:
                  "We believe in the power of teamwork and diverse perspectives.",
              },
              {
                icon: Heart,
                title: "Impact Driven",
                description:
                  "Every team member contributes to our mission of securing education's future.",
              },
            ].map((value, index) => (
              <div key={index} className="feature-card">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg w-fit mb-6">
                  <value.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 feature-icon" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Opportunities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              Future Opportunities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              While we don't have any open positions at the moment, you can stay
              updated about future opportunities by:
            </p>
            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                Following us on LinkedIn
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                Subscribing to our newsletter
              </li>
              <li className="flex items-center">
                <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                Checking back on our careers page
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <GraduationCap className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">ElimuChain</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing academic credential verification through
                blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/documentation"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <form className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-button">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} ElimuChain. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CareersPage;
