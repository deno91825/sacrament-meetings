import Link from "next/link";

export default function NavLinks() {
  return (
    <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm font-medium">
      <Link href="/">Home</Link>
      <Link href="/meetings">All Meetings</Link>
      <Link href="/meetings/current">Current Meeting</Link>
    </nav>
  );
}
