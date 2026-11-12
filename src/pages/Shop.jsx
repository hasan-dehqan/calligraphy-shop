import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard.jsx";
import Seo from "../components/Seo.jsx";
import { categories, getProducts } from "../services/products.js";
import { toNum } from "../utils/index.js";

const PAGE_SIZE = 8;
const sorters = {
  newest: (a, b) => b.id - a.id,
  cheap: (a, b) => a.price - b.price,
  expensive: (a, b) => b.price - a.price,
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";
  const q = params.get("q") || "";
  const sort = params.get("sort") || "newest";
  const inStock = params.get("stock") === "1";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const set = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };

  const list = getProducts()
    .filter((p) => (!category || p.category === category) && p.name.toLowerCase().includes(q.toLowerCase()) && (!inStock || p.stock > 0))
    .sort(sorters[sort] || sorters.newest);
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const shown = list.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const chip = (active) => `px-4 py-2 text-sm border ${active ? "bg-ink text-paper border-ink" : "border-mist bg-white"}`;

  return (
    <>
      <Seo title="Shop calligraphy reeds & pens" description="Buy calligraphy reeds and pens in single units or bulk with tiered pricing" />
      <h1 className="mb-4 text-3xl font-bold">Shop</h1>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button className={chip(!category)} onClick={() => set("category", "")}>All</button>
        {categories.map((c) => (
          <button key={c.id} className={chip(category === c.id)} onClick={() => set("category", c.id)}>{c.label}</button>
        ))}
        <input value={q} onChange={(e) => set("q", e.target.value)} placeholder="Search products" aria-label="Search"
          className="ms-auto w-full border border-mist bg-white px-3 py-2 sm:w-64" />
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          Sort by
          <select value={sort} onChange={(e) => set("sort", e.target.value)} className="border border-mist bg-white px-2 py-1">
            <option value="newest">Newest</option>
            <option value="cheap">Price: low to high</option>
            <option value="expensive">Price: high to low</option>
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={inStock} onChange={(e) => set("stock", e.target.checked ? "1" : "")} />
          In stock only
        </label>
        <span className="ms-auto text-ink/60">{toNum(list.length)} products</span>
      </div>
      {shown.length === 0 ? (
        <p className="py-16 text-center text-ink/70">No products found. Try changing the filters or search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
      {pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button key={n} className={chip(n === page)} onClick={() => set("page", String(n))} aria-label={`Page ${n}`}>{n}</button>
          ))}
        </div>
      )}
    </>
  );
}
