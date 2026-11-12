import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";
import { FaTelegram, FaWhatsapp, FaInstagram } from "react-icons/fa";
import CartDrawer from "./CartDrawer.jsx";
import { site } from "../config/site.js";
import { useCart } from "../context/CartContext.jsx";
import { toNum } from "../utils/index.js";

export default function Layout() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const link = ({ isActive }) => (isActive ? "font-bold text-lapis" : "hover:text-lapis");
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-mist bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold">{site.name}</Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink to="/" end className={link}>Home</NavLink>
            <NavLink to="/shop" className={link}>Shop</NavLink>
            <NavLink to="/wholesale" className={link}>Wholesale</NavLink>
            <button onClick={() => setOpen(true)} className="flex items-center gap-1" aria-label="Open cart">
              <FiShoppingBag size={20} />
              {count > 0 && <span className="rounded-full bg-saffron px-2 text-xs text-ink">{toNum(count)}</span>}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"><Outlet /></main>
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm">
          <div>
            <p>{site.name} · Tel {site.phone}</p>
            <nav className="mt-2 flex gap-4 text-paper/80">
              <Link to="/info/about">About us</Link>
              <Link to="/info/shipping">Shipping &amp; returns</Link>
              <Link to="/info/faq">FAQ</Link>
            </nav>
          </div>
          <div className="flex gap-4 text-xl">
            <a href={`https://t.me/${site.telegram}`} aria-label="Telegram"><FaTelegram /></a>
            <a href={`https://wa.me/${site.whatsapp}`} aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href={`https://instagram.com/${site.instagram}`} aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </footer>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <ToastContainer position="bottom-right" autoClose={2500} />
    </div>
  );
}
