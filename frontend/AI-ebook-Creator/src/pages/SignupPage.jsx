import React, { useState } from "react";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axiosInstance.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Save token (if backend returns it)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup successful!");

      navigate("/dashboard"); // 🔥 redirect
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

          <Button type="submit" className="w-full">
            {loading ? "Creating..." : "Create Account"}
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
          <span
            onClick={() => navigate("/login")}
            className="text-violet-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
