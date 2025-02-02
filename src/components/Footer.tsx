import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

type FooterProps = {
  showNewsletter?: boolean;
};

function Footer({ showNewsletter = true }: FooterProps) {
  const [email, setEmail] = React.useState("");
  const [subscribeStatus, setSubscribeStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");

    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert([{ email }]);

      if (error) throw error;

      setSubscribeStatus("success");
      setStatusMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setSubscribeStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-6">
              <GraduationCap className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">ElimuChain</span>
            </Link>
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
          {showNewsletter && (
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button
                    type="submit"
                    className="newsletter-button"
                    disabled={subscribeStatus === "loading"}
                  >
                    {subscribeStatus === "loading" ? (
                      <span className="animate-spin">⌛</span>
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {statusMessage && (
                  <p
                    className={`text-sm ${
                      subscribeStatus === "success"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ElimuChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
