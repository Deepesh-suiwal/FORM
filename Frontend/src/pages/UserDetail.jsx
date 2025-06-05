import { useEffect } from "react";
import { cartData } from "../context/cartProvider.jsx";
import instance from "../axiosConfig.js";
import { useNavigate } from "react-router-dom";

function UserDetail() {
  const navigate = useNavigate();
  const { data, token, setData, setToken } = cartData();

  useEffect(() => {
    if (!token) return;
    async function fetchUser() {
      try {
        const res = await instance.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setToken("");
      }
    }
    fetchUser();
  }, [token]);

  return (
    <>
      {data && (
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <p>
              <span className="font-medium">Email:</span> {data.email}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {data.gender}
            </p>
            <p>
              <span className="font-medium">Number:</span> {data.number}
            </p>
            <p>
              <span className="font-medium">Course:</span> {data.course}
            </p>
          </div>
          <div className="flex gap-4">
            <img
              src={data.aadhaar1}
              alt="Photo 1"
              className="w-32 h-32 object-cover rounded-md shadow"
            />
            <img
              src={data.aadhaar2}
              alt="Photo 2"
              className="w-32 h-32 object-cover rounded-md shadow"
            />
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              setData(null);
              navigate("/");
            }}
            className="bg-red-500 text-white my-4 mx-23 py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default UserDetail;
