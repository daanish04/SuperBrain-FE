import axios from "axios";
import { Button } from "../components/Button";
import { Print } from "../icons/Print";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { API_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (loading) return;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        username,
        password,
      });
      alert("Login Successfull");
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data.error}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-5 w-full min-h-screen bg-gray-100">
      <div className="py-2 flex justify-between items-center gap-1.5">
        <div className="flex gap-2">
          <Print />
          <Link to={"/"} className="text-blue-700 text-2xl font-bold">
            SuperBrain
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-slate-300">
          <h2 className="text-4xl font-bold text-center mb-6 p-2">Log In</h2>
          <div className="m-3">
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700"
            >
              Username :
            </label>
            <input
              ref={usernameRef}
              type="text"
              name="username"
              autoFocus
              className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-700"
            >
              Password :
            </label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
          </div>
          <div className="text-center mt-7">
            <Button
              variant="primary"
              size="md"
              text="Log In"
              onClick={handleSubmit}
            />
          </div>
          <h3 className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
