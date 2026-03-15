import React from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        {/* Heading */}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>

          <p className="text-gray-500 text-sm mt-2">
            Login to continue creating your ebooks
          </p>
        </div>

        {/* Form */}

        <form className="space-y-6">
          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        {/* Divider */}

        <div className="flex items-center my-6">
          <div className="flex-grow border-t"></div>
          <span className="mx-4 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t"></div>
        </div>

        {/* Signup */}

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
