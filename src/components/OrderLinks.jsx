import { toast } from "react-toastify";
import { site } from "../config/site.js";

export default function OrderLinks({ message }) {
  const text = encodeURIComponent(message);
  const btn = "bg-lapis px-4 py-2 text-paper";
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <a className={btn} href={`https://t.me/${site.telegram}?text=${text}`}>Send on Telegram</a>
      <a className={btn} href={`https://wa.me/${site.whatsapp}?text=${text}`}>Send on WhatsApp</a>
      <a className={btn} href={`https://eitaa.com/${site.eitaa}`}>Eitaa (copy first)</a>
      <button className="border border-ink px-4 py-2" onClick={() => navigator.clipboard.writeText(message).then(() => toast.success("Copied"))}>
        Copy text
      </button>
    </div>
  );
}
