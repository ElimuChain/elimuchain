import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function LandingPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (entry.target === statsRef.current) {
              setIsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleGetStarted = () => {
    navigate('/get-started');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold gradient-text">
                ElimuChain
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#benefits" className="nav-link">Benefits</a>
              <button 
                onClick={handleGetStarted}
                className="btn-primary"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-5xl font-bold leading-tight gradient-text mb-6">
                Empowering Education, One Blockchain at a Time
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Securely issue, manage, and verify academic credentials with ElimuChain—the future of trust in education.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={handleGetStarted}
                  className="btn-primary"
                >
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button className="btn-secondary">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-8">
                {[
                  { icon: Shield, label: 'Bank-Grade Security' },
                  { icon: Clock, label: 'Instant Verification' },
                  { icon: Globe2, label: 'Global Recognition' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-3">
                      <item.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl filter blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1557425955-df376b5903c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Blockchain visualization"
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { value: '500+', label: 'Partner Institutions' },
              { value: '1M+', label: 'Credentials Issued' },
              { value: '50+', label: 'Countries Reached' }
            ].map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Why Choose ElimuChain?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of academic credentials with our innovative blockchain solution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: "Secure & Immutable",
                description: "Bank-grade security ensures your credentials are tamper-proof and forever verifiable."
              },
              {
                icon: Zap,
                title: "Instant Verification",
                description: "Verify credentials in seconds, not days, with our blockchain-powered platform."
              },
              {
                icon: Globe2,
                title: "Global Access",
                description: "Access and share your credentials anywhere, anytime, with anyone."
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card animate-on-scroll">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg w-fit mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 feature-icon" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 gradient-text">How ElimuChain Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to revolutionize credential management
            </p>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              {
                icon: School,
                title: "Issue Credentials",
                description: "Institutions securely issue digital credentials on the blockchain"
              },
              {
                icon: Shield,
                title: "Store Securely",
                description: "Credentials are stored immutably with bank-grade security"
              },
              {
                icon: CheckCircle2,
                title: "Verify Instantly",
                description: "Employers verify credentials with a single click"
              }
            ].map((step, index) => (
              <div key={index} className="process-step animate-on-scroll">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                  <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Benefits for Everyone</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              ElimuChain provides value for all stakeholders in the education ecosystem
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: GraduationCap,
                title: "For Students",
                benefits: ["Own your credentials", "Share instantly", "Global recognition"]
              },
              {
                icon: School,
                title: "For Institutions",
                benefits: ["Reduce fraud", "Automate verification", "Enhance reputation"]
              },
              {
                icon: Building2,
                title: "For Employers",
                benefits: ["Instant verification", "Reduced costs", "Trusted hiring"]
              }
            ].map((group, index) => (
              <div key={index} className="feature-card animate-on-scroll">
                <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg w-fit mb-6">
                  <group.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 feature-icon" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{group.title}</h3>
                <ul className="space-y-3">
                  {group.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4 gradient-text">Trusted by Leaders in Education</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our partners say about ElimuChain
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "ElimuChain has revolutionized how we handle academic credentials. The efficiency and security are unmatched.",
                author: "Dr. Sarah Chen",
                role: "Dean of Admissions, Global University"
              },
              {
                quote: "The verification process that used to take weeks now takes seconds. It's transformed our recruitment process.",
                author: "Michael Rodriguez",
                role: "HR Director, Tech Innovations Inc"
              }
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card animate-on-scroll">
                <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Education?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join leading institutions worldwide in the credential revolution
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors flex items-center mx-auto"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
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
                Revolutionizing academic credential verification through blockchain technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Partners</a></li>
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
                  <button
                    type="submit"
                    className="newsletter-button"
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ElimuChain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;