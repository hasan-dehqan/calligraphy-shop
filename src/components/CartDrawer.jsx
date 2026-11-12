import { useEffect } from "react";
import { Link } from "react-router";
import { FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice, toNum } from "../utils/index.js";

export default function CartDrawer({ open, onClose }) {
  const { lines, total, setQty } = useCart();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  const step = "h-7 w-7 border border-ink";
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Cart">
      <div className="absolute inset-0 bg-ink/50" onClick={onClose} />
      <aside className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">Your cart</h2>
          <button onClick={onClose} aria-label="Close"><FiX size={22} /></button>
        </div>
        {lines.length === 0 ? (
          <p className="py-10 text-center text-ink/70">Your cart is empty.</p>
        ) : (
          <ul className="flex-1 divide-y divide-mist overflow-y-auto">
            {lines.map((l) => (
              <li key={l.product.id} className="py-3">
                <p className="font-bold">{l.product.name}</p>
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <button className={step} onClick={() => setQty(l.product.id, l.qty - 1)} aria-label="Decrease">−</button>
                  <span className="w-8 text-center">{toNum(l.qty)}</span>
                  <button className={step} onClick={() => setQty(l.product.id, l.qty + 1)} aria-label="Increase">+</button>
                  <span className="ms-auto font-bold">{formatPrice(l.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t border-mist pt-3">
          <p>Total: <span className="font-bold text-lapis">{formatPrice(total)}</span></p>
          <Link to="/cart" onClick={onClose} className="mt-3 block bg-saffron py-3 text-center font-bold text-ink">
            Continue to checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
