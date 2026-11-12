import { useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import ProductArt from "../components/ProductArt.jsx";
import Seo from "../components/Seo.jsx";
import { useCart } from "../context/CartContext.jsx";
import { getProductBySlug } from "../services/products.js";
import { calcTieredPrice, formatPrice, toNum } from "../utils/index.js";

export default function Product() {
  const { slug } = useParams();
  const p = getProductBySlug(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!p) return <p className="py-16 text-center">Product not found. <Link to="/shop" className="text-lapis underline">Back to shop</Link></p>;

  const { unit, discount, total } = calcTieredPrice(p, qty);
  const tiers = [{ min: 1, discount: 0 }, ...p.tiers];
  const activeTier = [...tiers].reverse().find((t) => qty >= t.min);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Seo title={p.name} description={p.shortDescription} />
      <ProductArt category={p.category} className="w-full" />
      <div>
        <h1 className="text-3xl font-bold">{p.name}</h1>
        <p className="mt-2 text-ink/75">{p.shortDescription}</p>
        <dl className="mt-4 grid grid-cols-2 gap-y-1 text-sm">
          {Object.entries(p.specs).map(([k, v]) => (
            <div key={k} className="contents"><dt className="text-ink/60">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>

        <table className="mt-6 w-full border border-mist text-sm">
          <thead className="bg-mist"><tr><th className="p-2 text-start">Quantity</th><th className="p-2 text-start">Price each</th></tr></thead>
          <tbody>
            {tiers.map((t) => (
              <tr key={t.min} className={t === activeTier ? "bg-saffron/20 font-bold" : ""}>
                <td className="p-2">{toNum(t.min)}+</td>
                <td className="p-2">{formatPrice(p.price * (1 - t.discount / 100))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex items-center gap-3">
          <button className="h-10 w-10 border border-ink" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
          <input
            type="number" min="1" max={p.stock} value={qty} aria-label="Quantity"
            onChange={(e) => setQty(Math.min(p.stock, Math.max(1, Number(e.target.value) || 1)))}
            className="h-10 w-20 border border-mist bg-white text-center"
          />
          <button className="h-10 w-10 border border-ink" onClick={() => setQty((q) => Math.min(p.stock, q + 1))} aria-label="Increase">+</button>
          <span className="text-sm text-ink/60">In stock: {toNum(p.stock)}</span>
        </div>

        <p className="mt-4">
          Total: <span className="text-xl font-bold text-lapis">{formatPrice(total)}</span>
          {discount > 0 && <span className="ms-2 text-sm text-saffron">({discount}% wholesale discount)</span>}
        </p>
        <button
          disabled={p.stock === 0}
          onClick={() => { add(p.id, qty); toast.success("Added to cart"); }}
          className="mt-4 w-full bg-saffron py-3 font-bold text-ink disabled:opacity-40"
        >
          Add to cart
        </button>
        <p className="mt-2 text-xs text-ink/60">Price each: {formatPrice(unit)}</p>
      </div>
    </div>
  );
}
