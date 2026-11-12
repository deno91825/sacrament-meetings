export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className="space-y-6">{children}</section>;
}
