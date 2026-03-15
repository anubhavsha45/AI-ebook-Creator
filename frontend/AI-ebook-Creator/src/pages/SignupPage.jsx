import React from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        {/* Heading */}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            Start creating your AI-powered ebooks today
          </p>
        </div>

        {/* Form */}

        <form className="space-y-6">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your name"
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        {/* Divider */}

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-4 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Login Link */}

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-violet-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
