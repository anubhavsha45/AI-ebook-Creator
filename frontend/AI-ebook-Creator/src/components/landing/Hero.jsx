import React from "react";
import { Zap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import HERO_IMG from "../../assets/hero-img.avif";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 🔥 HANDLE CTA CLICK
  const handleStartCreating = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div>
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm font-medium mb-6">
            AI Powered Publishing
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Create Complete
            <span className="text-purple-600"> AI eBooks </span>
            In Minutes
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Generate full ebooks using AI. Write, design and export your digital
            books instantly without writing everything manually.
          </p>

          <div className="flex gap-4">
            {/* 🔥 UPDATED BUTTON */}
            <button
              onClick={handleStartCreating}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
            >
              Start Creating
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              Watch Demo
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10">
            <div>
              <div className="text-2xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-600">Books Created</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-gray-900">10 min</div>
              <div className="text-gray-600">Avg Creation</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="relative lg:pl-8">
          <div className="relative">
            <div className="absolute inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur-xl opacity-20"></div>

            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border">
              <img
                src={HERO_IMG}
                alt="AI Ebook Creator Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* FLOATING CARD 1 */}
          <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="text-xs text-gray-500">Processing</div>
              <div className="text-sm font-semibold text-gray-900">
                AI Generation
              </div>
            </div>
          </div>

          {/* FLOATING CARD 2 */}
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl shadow-xl p-4 backdrop-blur-sm border flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>

            <div>
              <div className="text-xs text-gray-500">Completed</div>
              <div className="text-sm font-semibold text-gray-900">
                247 Pages
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
