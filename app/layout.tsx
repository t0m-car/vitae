import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CV - Tom Cardoen",
  description: "CV - Tom Cardoen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
