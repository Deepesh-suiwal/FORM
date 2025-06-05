import { useState } from "react";
import instance from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { cartData } from "../context/cartProvider";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setData, setToken, } = cartData();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await instance.post("/api/auth/login", { email, password });
      
      if (res.status == 200) {
        setData(res.data.user);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        navigate("/UserDetail");
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
        className="w-[50%] p-2 border rounded"
        autoFocus
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-[50%] p-2 border rounded"
      />
      <br />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <p className="mt-2 text-sm">
        Don't have an account?
        <button
          type="button"
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate("/Register")}
        >
          Register
        </button>
      </p>
    </form>
  );
}
export default Login;
