import React from 'react';
import { Shield, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About ElimuChain</h1>
          <p className="text-gray-300">Revolutionizing academic credential verification through blockchain technology</p>
        </div>

        <div className="space-y-8">
          <section className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              ElimuChain is dedicated to creating a secure, transparent, and efficient system for academic credential 
              verification. By leveraging blockchain technology, we provide a tamper-proof solution that enables 
              educational institutions to issue digital credentials and allows employers to instantly verify their authenticity.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Security"
              description="Uncompromising security through advanced blockchain technology"
            />
            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Accessibility"
              description="Making credential verification accessible to everyone"
            />
            <ValueCard
              icon={<Globe className="w-8 h-8" />}
              title="Global Impact"
              description="Creating a worldwide standard for academic verification"
            />
          </div>

          <section className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Our Technology</h2>
            <p className="text-gray-300 leading-relaxed">
              ElimuChain utilizes cutting-edge blockchain technology to create an immutable record of academic 
              credentials. Our platform ensures that once a credential is issued, it cannot be tampered with or 
              falsified, providing absolute trust in the verification process.
            </p>
          </section>

          <section className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Join Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Whether you're an educational institution looking to issue secure digital credentials or an 
              organization seeking to verify academic qualifications, ElimuChain provides the tools and 
              infrastructure you need.
            </p>
            <button className="px-6 py-3 bg-blue-600/80 text-white rounded-lg font-semibold
              hover:bg-blue-700/80 transition-all duration-300">
              Contact Us
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="backdrop-blur-lg bg-white/10 p-6 rounded-2xl border border-white/20
      transition-all duration-300 hover:scale-105 hover:bg-white/20 text-center">
      <div className="mb-4 text-blue-400 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}