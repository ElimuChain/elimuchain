import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Calendar, User, Clock } from "lucide-react";

function BlogPage() {
  const blogPosts = [
    {
      title: "The Future of Academic Credentials",
      excerpt:
        "How blockchain technology is revolutionizing the way we verify and manage academic credentials.",
      author: "Khalid Hussein",
      date: "Feb 15, 2024",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Blockchain in Education: A Game Changer",
      excerpt:
        "Exploring the transformative impact of blockchain technology on educational institutions.",
      author: "Doreen Onyango",
      date: "Feb 10, 2025",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
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
            ElimuChain Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights and updates from the forefront of blockchain-based academic
            credentials
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
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

export default BlogPage;
