import type { Metadata } from "next";
import "@repo/ui/globals.css";

export const metadata: Metadata = {
  title: "Customer | Food Delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
