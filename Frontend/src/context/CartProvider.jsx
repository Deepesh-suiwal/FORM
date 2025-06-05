import { createContext, useContext, useState } from "react";

const cartContext = createContext();
function CartProvider({ children }) {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  return (
    <cartContext.Provider value={{ data, setData, token, setToken }}>
      {children}
    </cartContext.Provider>
  );
}
export function cartData() {
  return useContext(cartContext);
}
export default CartProvider;
