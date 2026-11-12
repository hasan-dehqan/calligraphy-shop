import { site } from "../config/site.js";

export const formatPrice = (n) => `${Math.round(n).toLocaleString("en-US")} Toman`;
export const toNum = (n) => Number(n).toLocaleString("en-US");

const toEn = (s = "") =>
  s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

export const isPhone = (s) => /^09\d{9}$/.test(toEn(s).trim());
export const isPostal = (s) => /^\d{10}$/.test(toEn(s).trim());

// Tiered pricing: highest tier whose minimum quantity has been reached
export function calcTieredPrice(product, qty) {
  const tier = [...product.tiers].reverse().find((t) => qty >= t.min);
  const discount = tier ? tier.discount : 0;
  const unit = Math.round(product.price * (1 - discount / 100));
  return { unit, discount, total: unit * qty };
}

export function buildOrderMessage(c, lines, total) {
  const items = lines
    .map((l) => `• ${l.product.name} × ${toNum(l.qty)} (${formatPrice(l.unit)} each)`)
    .join("\n");
  return `New order from ${site.name}\n\n${items}\n\nTotal: ${formatPrice(total)}\n\nName: ${c.name}\nMobile: ${c.phone}\nCity: ${c.city}\nAddress: ${c.address}\nPostal code: ${c.postal}${c.note ? `\nNotes: ${c.note}` : ""}`;
}
