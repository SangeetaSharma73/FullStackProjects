import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../services/httpMethods";
import { USER_LOGIN_API } from "../../utils/endpoint";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
      } else {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        navigate("/");
      }
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {message && <p className="text-red-500 text-center mt-4">{message}</p>}

        <div className="text-center mt-6 text-sm">
          <Link to="/signup" className="link link-primary">
            Don't have an account? Sign up
          </Link>
          <br />
          <Link to="/forgot-password" className="link link-secondary">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
