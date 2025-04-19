import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        "http://localhost:8000",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (!res.ok) setMessage(data.message);
      else setMessage("Reset link sent! Check your email.");
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary w-full">Send Reset Link</button>
        </form>

        {message && (
          <p className="text-center mt-4 text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
