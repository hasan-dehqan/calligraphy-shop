import { useParams } from "react-router";
import Seo from "../components/Seo.jsx";
import NotFound from "./NotFound.jsx";

// Replace these texts with your shop's real information
const pages = {
  about: {
    title: "About us",
    body: [
      "We supply calligraphy reeds and pens for students, masters and calligraphy schools.",
      "Every reed is checked and sorted before sale, so the diameter and length you see are what you receive.",
    ],
  },
  shipping: {
    title: "Shipping & returns",
    body: [
      "After we confirm your order by phone or messenger, it is packed securely and sent to your address.",
      "Shipping method and cost depend on your city and the size of the order.",
      "If an item arrives broken or not as ordered, send us a photo within 48 hours of delivery and we will look into it.",
    ],
  },
  faq: {
    title: "Frequently asked questions",
    faq: [
      ["How do I place an order?", "Add products to your cart, fill in the form, and send the order text to us on Telegram, WhatsApp or Eitaa."],
      ["How does wholesale pricing work?", "The price per piece drops automatically as the quantity grows. The table is on each product page."],
      ["How do I pay?", "After we confirm your order, the payment method is arranged by messenger or phone."],
      ["Are reeds fragile? How are they shipped?", "Reeds are shipped in sturdy tube packaging to prevent damage."],
    ],
  },
};

export default function Info() {
  const { page } = useParams();
  const p = pages[page];
  if (!p) return <NotFound />;
  return (
    <div className="mx-auto max-w-2xl">
      <Seo title={p.title} description={p.body?.[0]} />
      <h1 className="text-3xl font-bold">{p.title}</h1>
      {p.body?.map((t, i) => <p key={i} className="mt-4 leading-8 text-ink/80">{t}</p>)}
      {p.faq && (
        <div className="mt-6 divide-y divide-mist border border-mist bg-white">
          {p.faq.map(([q, a]) => (
            <details key={q} className="p-4">
              <summary className="cursor-pointer font-bold">{q}</summary>
              <p className="mt-2 leading-8 text-ink/80">{a}</p>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
