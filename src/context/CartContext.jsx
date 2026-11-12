import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById } from "../services/products.js";
import { calcTieredPrice } from "../utils/index.js";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

const load = () => {
  try { return JSON.parse(localStorage.getItem("cart-v1")) || []; } catch { return []; }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try { localStorage.setItem("cart-v1", JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const setQty = (id, qty) => {
    const stock = getProductById(id)?.stock ?? 0;
    const q = Math.min(Math.max(qty, 0), stock);
    setItems((cur) => {
      const rest = cur.filter((i) => i.id !== id);
      return q > 0 ? [...rest, { id, qty: q }].sort((a, b) => a.id - b.id) : rest;
    });
  };
  const add = (id, qty) => setQty(id, (items.find((i) => i.id === id)?.qty || 0) + qty);
  const clear = () => setItems([]);

  const lines = useMemo(
    () => items.map((i) => { const product = getProductById(i.id); return { product, qty: i.qty, ...calcTieredPrice(product, i.qty) }; }),
    [items]
  );
  const total = lines.reduce((s, l) => s + l.total, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);

  return <CartContext.Provider value={{ lines, total, count, add, setQty, clear }}>{children}</CartContext.Provider>;
}
