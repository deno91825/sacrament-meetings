import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold text-blue-900">
          Sacrament Planner
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
