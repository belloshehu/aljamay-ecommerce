import Link from "next/link";

export default function NavItems() {
  return (
    <nav>
      <ul className="list-none flex gap-5 items-center">
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/distributors">Distributors</Link>
        </li>
      </ul>
    </nav>
  );
}
