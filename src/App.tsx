import Dashboard from "./routes/Dashboard";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import PublicShare from "./routes/PublicShare";
import Signup from "./routes/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/brain/:shareLink" element={<PublicShare />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
