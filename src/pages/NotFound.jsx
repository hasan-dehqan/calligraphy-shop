import { Link } from "react-router";

export default function NotFound() {
  return <p className="py-16 text-center">This page does not exist. <Link to="/" className="text-lapis underline">Back to home</Link></p>;
}
