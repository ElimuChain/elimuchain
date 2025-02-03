import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

// Rate limiting helper
const RATE_LIMIT_MINUTES = 5;
const rateLimit = new Map<string, number>();

function Footer() {
  const [email, setEmail] = useState("");
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const checkRateLimit = (email: string): boolean => {
    const now = Date.now();
    const lastAttempt = rateLimit.get(email);

    if (lastAttempt && now - lastAttempt < RATE_LIMIT_MINUTES * 60 * 1000) {
      return false;
    }

    rateLimit.set(email, now);
    return true;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      setSubscriptionStatus("error");
      return;
    }

    // Rate limiting
    if (!checkRateLimit(email)) {
      setMessage(
        `Please wait ${RATE_LIMIT_MINUTES} minutes before trying again`
      );
      setSubscriptionStatus("error");
      return;
    }

    setSubscriptionStatus("loading");

    try {
      // Check if already subscribed
      const { data: existingSubscription } = await supabase
        .from("newsletter_subscribers")
        .select("status")
        .eq("email", email)
        .single();

      if (existingSubscription) {
        if (existingSubscription.status === "unsubscribed") {
          // Reactivate subscription
          const { error } = await supabase
            .from("newsletter_subscribers")
            .update({
              status: "active",
              subscribed_at: new Date().toISOString(),
            })
            .eq("email", email);

          if (error) throw error;
          setMessage("Welcome back! Your subscription has been reactivated.");
        } else {
          setMessage("You are already subscribed to our newsletter.");
        }
      } else {
        // New subscription
        const { error } = await supabase
          .from("newsletter_subscribers")
          .insert([{ email }]);

        if (error) throw error;
        setMessage("Thank you for subscribing!");
      }

      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      setSubscriptionStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleUnsubscribe = async (email: string) => {
    try {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .update({ status: "unsubscribed" })
        .eq("email", email);

      if (error) throw error;
      setMessage("You have been unsubscribed successfully.");
      setSubscriptionStatus("success");
    } catch (error) {
      setMessage("Error unsubscribing. Please try again.");
      setSubscriptionStatus("error");
    }
  };

  return (
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
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                  disabled={
                    subscriptionStatus === "loading" ||
                    subscriptionStatus === "success"
                  }
                />
                <button
                  type="submit"
                  className="newsletter-button"
                  disabled={
                    subscriptionStatus === "loading" ||
                    subscriptionStatus === "success"
                  }
                >
                  {subscriptionStatus === "success" ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </button>
              </div>
              {message && (
                <p
                  className={`text-sm ${
                    subscriptionStatus === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
              {subscriptionStatus === "success" && (
                <button
                  onClick={() => handleUnsubscribe(email)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Unsubscribe
                </button>
              )}
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
  );
}

export default Footer;
