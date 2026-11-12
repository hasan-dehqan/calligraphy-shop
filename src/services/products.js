import data from "../data/products.json";

// Replace these functions with real API calls later
export const getProducts = () => data;
export const getProductBySlug = (slug) => data.find((p) => p.slug === slug);
export const getProductById = (id) => data.find((p) => p.id === id);

export const categories = [
  { id: "ney", label: "Reeds" },
  { id: "qalam", label: "Pens" },
  { id: "set", label: "Sets" },
];
