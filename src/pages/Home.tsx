import React from "react";
import {
  Shield,
  GraduationCap,
  Search,
  Award,
  Clock,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="text-center">
              <div className="animate-float">
                <GraduationCap className="w-20 h-20 mx-auto mb-8 text-blue-400" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Secure Academic Credentials
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Verify and issue academic credentials with blockchain-powered
                security and instant verification
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/verify"
                  className="px-8 py-4 bg-blue-600/80 backdrop-blur-md hover:bg-blue-700/80 rounded-full text-lg font-semibold 
                    transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-white"
                >
                  Verify Credentials
                </Link>
                <Link
                  to="/issue"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full text-lg font-semibold 
                    transition-all duration-300 hover:scale-105 border border-white/20 text-white"
                >
                  Issue Credentials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Blockchain Security"
              description="Tamper-proof verification using advanced blockchain technology"
            />
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Instant Verification"
              description="Verify academic credentials in seconds with our powerful search"
            />
            <FeatureCard
              icon={<Award className="w-8 h-8" />}
              title="Digital Certificates"
              description="Issue and manage digital certificates with ease"
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8" />}
              title="Time-Stamped"
              description="Every credential is permanently time-stamped on the blockchain"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Institution Portal"
              description="Dedicated portal for educational institutions to manage credentials"
            />
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Student Access"
              description="Students can access and share their verified credentials anytime"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <StatCard number="1M+" label="Verified Credentials" />
              <StatCard number="500+" label="Partner Institutions" />
              <StatCard number="99.9%" label="Verification Accuracy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20
      transition-all duration-300 hover:scale-105 hover:bg-white/20 group"
    >
      <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4">
      <div className="text-4xl font-bold text-white mb-2">{number}</div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}
