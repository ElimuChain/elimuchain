import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/5 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">ElimuChain</h3>
            <p className="text-gray-300">
              Secure Academic Credential Verification powered by blockchain technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/verify" className="text-gray-300 hover:text-white">Verify Credentials</a></li>
              <li><a href="/issue" className="text-gray-300 hover:text-white">Issue Credentials</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} ElimuChain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}