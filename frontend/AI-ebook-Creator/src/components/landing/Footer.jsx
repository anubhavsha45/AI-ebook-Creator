import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}

          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              AI Ebook Creator
            </h2>

            <p className="text-sm text-gray-400 max-w-sm">
              Create professional ebooks in minutes using the power of AI.
              Write, design, and export your ebook effortlessly.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#testimonials" className="hover:text-white transition">
                  Testimonials
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-white transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="/signup" className="hover:text-white transition">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex space-x-4">
              <a
                href="https://github.com/anubhavsha45"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Github size={20} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://twitter.com/anubhav_code"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} AI Ebook Creator. All rights reserved.
          </p>

          <p className="text-gray-500 mt-3 md:mt-0">
            Crafted with ❤️ by{" "}
            <span className="text-white">Anubhav Sharma</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
