import React from "react";
import { TESTIMONIALS } from "../../utils/data";

const Testimonials = () => {
  return (
    <div
      id="testimonials"
      className="relative py-24 lg:py-32 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-violet-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-violet-900">
              Testimonials
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Loved by
            <span className="block mt-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Creators Worldwide
            </span>
          </h2>

          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Thousands of writers and creators use our platform to generate
            beautiful ebooks quickly and effortlessly.
          </p>
        </div>

        {/* Testimonials Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300"
            >
              {/* Quote */}

              <p className="text-gray-600 leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* User */}

              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {testimonial.author}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {testimonial.rating} ⭐
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
