import { useState } from "react";
import { Link } from "react-router";
import { toast } from "react-toastify";
import OrderLinks from "../components/OrderLinks.jsx";
import Seo from "../components/Seo.jsx";
import { site } from "../config/site.js";
import { getProducts } from "../services/products.js";
import { isPhone } from "../utils/index.js";

export default function Wholesale() {
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const c = Object.fromEntries(new FormData(e.currentTarget));
    const err = {};
    if (!c.name.trim()) err.name = "Please enter your name";
    if (!isPhone(c.phone)) err.phone = "Enter a valid mobile number";
    if (!c.qty.trim()) err.qty = "Please enter an approximate quantity";
    setErrors(err);
    if (Object.keys(err).length) return toast.error("Please check the form");
    setMessage(`Wholesale quote request from ${site.name}\n\nName: ${c.name}\nMobile: ${c.phone}\nProduct: ${c.product}\nApprox. quantity: ${c.qty}${c.note ? `\nNotes: ${c.note}` : ""}`);
  };

  const input = "mt-1 w-full border border-mist bg-white px-3 py-2";
  return (
    <div className="mx-auto max-w-2xl">
      <Seo title="Wholesale reeds & pens" description="Special prices for calligraphy schools, masters and shops" />
      <h1 className="text-3xl font-bold">Wholesale</h1>
      <p className="mt-3 leading-8 text-ink/75">
        For calligraphy schools, associations and shops. Each product page shows its tiered discount table. For quantities beyond those tiers, ask for a special quote.
      </p>
      <ul className="mt-4 list-disc space-y-1 ps-5 text-ink/80">
        <li>The more you buy, the lower the price per piece</li>
        <li>Mix several products in one order</li>
        <li>We reply with a quote by messenger or phone</li>
      </ul>
      <p className="mt-3 text-sm">For a regular purchase, go to the <Link to="/shop" className="text-lapis underline">shop</Link>.</p>

      {message ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Your request is ready</h2>
          <p className="mt-2 text-ink/75">Send the text below to us and we will reply with a price.</p>
          <pre className="mt-3 whitespace-pre-wrap border border-mist bg-white p-4 text-sm">{message}</pre>
          <OrderLinks message={message} />
        </div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-8 space-y-3">
          <h2 className="text-xl font-bold">Request a bulk quote</h2>
          <label className="block text-sm">Full name<input name="name" className={input} />{errors.name && <span className="text-saffron">{errors.name}</span>}</label>
          <label className="block text-sm">Mobile number<input name="phone" inputMode="numeric" className={input} />{errors.phone && <span className="text-saffron">{errors.phone}</span>}</label>
          <label className="block text-sm">Product
            <select name="product" className={input}>
              {getProducts().map((p) => <option key={p.id}>{p.name}</option>)}
              <option>Several products (details in notes)</option>
            </select>
          </label>
          <label className="block text-sm">Approximate quantity<input name="qty" className={input} />{errors.qty && <span className="text-saffron">{errors.qty}</span>}</label>
          <label className="block text-sm">Notes (optional)<textarea name="note" rows="3" className={input} /></label>
          <button className="w-full bg-saffron py-3 font-bold text-ink">Prepare request</button>
        </form>
      )}
    </div>
  );
}
