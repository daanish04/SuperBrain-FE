import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Print } from "../icons/Print";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const API_URL = useRef(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    if (!name || !username || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL.current}/signup`, {
        name,
        username,
        password,
      });
      alert("Signup Successfull");
      console.log(response);
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(`Error: ${error.response?.data.error}`);
      }
      console.log(error);
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
          <h2 className="text-4xl font-bold text-center mb-6 p-2">Sign Up</h2>
          <div className="m-3">
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Name :
            </label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              autoFocus
              className="w-full mt-1 p-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-1  focus:ring-blue-600"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
          </div>
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
              text="Sign Up"
              onClick={handleSubmit}
            />
          </div>
          <h3 className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
