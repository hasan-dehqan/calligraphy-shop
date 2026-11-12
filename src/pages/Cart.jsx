import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import Seo from "../components/Seo.jsx";
import OrderLinks from "../components/OrderLinks.jsx";
import { useCart } from "../context/CartContext.jsx";
import { buildOrderMessage, formatPrice, isPhone, isPostal, toNum } from "../utils/index.js";

const fields = [
  ["name", "Full name"], ["phone", "Mobile number"], ["city", "Province and city"],
  ["address", "Full address"], ["postal", "Postal code (10 digits)"],
];

export default function Cart() {
  const { lines, total, setQty, clear } = useCart();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const c = Object.fromEntries(new FormData(e.currentTarget));
    const err = {};
    fields.forEach(([k]) => { if (!c[k]?.trim()) err[k] = "This field is required"; });
    if (!err.phone && !isPhone(c.phone)) err.phone = "Enter a valid mobile number (e.g. 09123456789)";
    if (!err.postal && !isPostal(c.postal)) err.postal = "Postal code must be 10 digits";
    setErrors(err);
    if (Object.keys(err).length) return toast.error("Please check the form");
    setMessage(buildOrderMessage(c, lines, total));
    clear();
  };

  if (message) {
    return (
      <div className="mx-auto max-w-lg">
        <h1 className="text-2xl font-bold">Your order is ready</h1>
        <p className="mt-2 text-ink/75">To finish, send the order text to us on one of the messengers below. We will contact you after we receive it.</p>
        <pre className="mt-4 whitespace-pre-wrap border border-mist bg-white p-4 text-sm">{message}</pre>
        <OrderLinks message={message} />
      </div>
    );
  }

  if (lines.length === 0)
    return <p className="py-16 text-center">Your cart is empty. <Link to="/shop" className="text-lapis underline">Browse products</Link></p>;

  return (
    <div className="grid gap-8 md:grid-cols-5">
      <Seo title="Cart" />
      <section className="md:col-span-3">
        <h1 className="mb-4 text-2xl font-bold">Cart</h1>
        <ul className="divide-y divide-mist border border-mist bg-white">
          {lines.map((l) => (
            <li key={l.product.id} className="flex items-center gap-3 p-3">
              <div className="flex-1">
                <Link to={`/product/${l.product.slug}`} className="font-bold">{l.product.name}</Link>
                <p className="text-sm text-ink/70">{formatPrice(l.unit)} each{l.discount > 0 && ` · ${l.discount}% off`}</p>
              </div>
              <input type="number" min="1" max={l.product.stock} value={l.qty} aria-label="Quantity"
                onChange={(e) => setQty(l.product.id, Number(e.target.value) || 0)}
                className="h-9 w-16 border border-mist text-center" />
              <span className="w-32 text-end text-sm font-bold">{formatPrice(l.total)}</span>
              <button onClick={() => setQty(l.product.id, 0)} aria-label="Remove"><FiTrash2 /></button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xl">Total: <span className="font-bold text-lapis">{formatPrice(total)}</span></p>
        <p className="text-xs text-ink/60">Shipping cost is confirmed after we contact you. {toNum(lines.length)} item type(s) in cart.</p>
      </section>

      <form onSubmit={submit} className="space-y-3 md:col-span-2" noValidate>
        <h2 className="text-xl font-bold">Shipping details</h2>
        {fields.map(([k, label]) => (
          <label key={k} className="block text-sm">
            {label}
            <input name={k} inputMode={k === "phone" || k === "postal" ? "numeric" : "text"} className="mt-1 w-full border border-mist bg-white px-3 py-2" />
            {errors[k] && <span className="text-saffron">{errors[k]}</span>}
          </label>
        ))}
        <label className="block text-sm">Notes (optional)
          <textarea name="note" rows="2" className="mt-1 w-full border border-mist bg-white px-3 py-2" />
        </label>
        <button className="w-full bg-saffron py-3 font-bold text-ink">Place order</button>
      </form>
    </div>
  );
}
