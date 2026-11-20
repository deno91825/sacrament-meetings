import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      {children}
    </section>
  );
}
