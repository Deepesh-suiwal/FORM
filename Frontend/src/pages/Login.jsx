import { useState } from "react";
// import instance from "./axiosConfig";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navivage = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await instance.post("/user/login", { email, password });
      if (res.data.success) {
        onLoginSuccess(res.data.user);
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError("Login error");
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Login</h2>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p className="mt-2 text-sm">
        Don't have an account?{" "}
        <button type="button" className="text-blue-600 underline cursor-pointer" onClick={()=> navivage("/Register")}>
          Register
        </button>
      </p>
    </form>
  );
}
export default Login;
