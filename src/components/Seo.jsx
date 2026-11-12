import { site } from "../config/site.js";

// React 19 hoists <title> and <meta> into <head> automatically
export default function Seo({ title, description }) {
  return (
    <>
      <title>{`${title} | ${site.name}`}</title>
      {description && <meta name="description" content={description} />}
    </>
  );
}
