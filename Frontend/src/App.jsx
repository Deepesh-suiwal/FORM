import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDetail from "./pages/UserDetail";
import First from "./First";
import { CartProvider } from "./context/CartProvider";

function App() {
  const name = createBrowserRouter([
    {
      path: "/",
      element: <First />,
      children: [
        {
          index: true,
          element: <Login />,
        },

        {
          path: "/register",
          element: <Register />,
        },

        {
          path: "/UserDetail",
          element: <UserDetail />,
        },
      ],
    },
  ]);
  return (
    <>
      <CartProvider>
        <RouterProvider router={name} />
      </CartProvider>
    </>
  );
}

export default App;
