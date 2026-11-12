import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "./index.css";
import Layout from "./components/Layout.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const page = (loader) => ({ lazy: () => loader().then((m) => ({ Component: m.default })) });

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, ...page(() => import("./pages/Home.jsx")) },
      { path: "shop", ...page(() => import("./pages/Shop.jsx")) },
      { path: "product/:slug", ...page(() => import("./pages/Product.jsx")) },
      { path: "cart", ...page(() => import("./pages/Cart.jsx")) },
      { path: "wholesale", ...page(() => import("./pages/Wholesale.jsx")) },
      { path: "info/:page", ...page(() => import("./pages/Info.jsx")) },
      { path: "*", ...page(() => import("./pages/NotFound.jsx")) },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>
);
