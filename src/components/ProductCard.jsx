import { Link } from "react-router";
import ProductArt from "./ProductArt.jsx";
import { formatPrice } from "../utils/index.js";

export default function ProductCard({ product: p }) {
  return (
    <Link to={`/product/${p.slug}`} className="block border border-mist bg-white">
      <ProductArt category={p.category} className="w-full" />
      <div className="p-4">
        <h3 className="font-bold">{p.name}</h3>
        <p className="mt-1 text-sm text-ink/70">{p.shortDescription}</p>
        <p className="mt-3 text-sm">
          From <span className="font-bold text-lapis">{formatPrice(p.price * (1 - p.tiers.at(-1).discount / 100))}</span>
          <span className="text-ink/60"> (wholesale)</span>
        </p>
        {p.stock === 0 && <p className="mt-2 text-sm text-saffron">Out of stock</p>}
      </div>
    </Link>
  );
}
