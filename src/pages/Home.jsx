import { Link } from "react-router";
import ProductCard from "../components/ProductCard.jsx";
import Seo from "../components/Seo.jsx";
import { categories, getProducts } from "../services/products.js";

export default function Home() {
  const featured = getProducts().filter((p) => p.isFeatured);
  return (
    <>
      <Seo title="Calligraphy Reeds & Pens" description="Buy calligraphy reeds and pens one at a time or in bulk, for students, masters and schools" />
      <section className="grid items-stretch gap-0 md:grid-cols-5">
        <div className="flex flex-col justify-center py-8 md:col-span-3 md:pe-10">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Calligraphy reeds and pens,<br />one or a hundred</h1>
          <p className="mt-4 max-w-md leading-8 text-ink/75">
            Dried reeds and ready-cut pens for students, masters and calligraphy schools. Order any quantity, with tiered pricing that drops as you buy more.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/shop" className="bg-saffron px-6 py-3 font-bold text-ink">Shop now</Link>
            <Link to="/shop?category=set" className="border border-ink px-6 py-3">Beginner set</Link>
          </div>
        </div>
        <div className="relative min-h-64 overflow-hidden bg-ink md:col-span-2">
          <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <g transform="rotate(-28 100 130)">
              <rect x="94" y="-20" width="12" height="230" fill="#c8902a" />
              <path d="M94 210h12l-2 34-4 8-4-8z" fill="#f1f3f2" />
            </g>
            <path d="M20 240c40-60 80 20 160-40" stroke="#2b4c8c" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Categories</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {categories.map((c) => (
            <Link key={c.id} to={`/shop?category=${c.id}`} className="border border-lapis p-6 text-lg font-bold text-lapis hover:bg-lapis hover:text-paper">
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="mb-4 text-2xl font-bold">Best sellers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mt-14 bg-mist p-6">
        <h2 className="text-xl font-bold">Wholesale for schools and studios</h2>
        <p className="mt-2 text-ink/75">The more you buy, the less each piece costs. See the discount table on every product page, or <Link to="/wholesale" className="text-lapis underline">request a bulk quote</Link>.</p>
      </section>
    </>
  );
}
