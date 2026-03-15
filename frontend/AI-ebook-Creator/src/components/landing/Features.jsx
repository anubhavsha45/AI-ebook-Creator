import React from "react";
import { FEATURES } from "../../utils/data";

const Features = () => {
  return (
    <div
      id="features"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Heading Section */}

        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-violet-900">
              Features
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Everything You Need to
            <span className="block mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Create Your Ebook
            </span>
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Our platform is packed with powerful features to help you write,
            design, and publish your ebook effortlessly.
          </p>
        </div>

        {/* Features Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-violet-200 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10"
              >
                {/* Background gradient hover */}

                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 opacity-0 group-hover:opacity-100 rounded-2xl transition"></div>

                <div className="relative z-10">
                  {/* Icon */}

                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  {/* Title */}

                  <h3 className="mt-6 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-2 text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}

        <div className="text-center mt-20">
          <p className="text-lg text-gray-700 mb-6">Ready to get started?</p>

          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            <span>Start Creating Today</span>

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Features;
