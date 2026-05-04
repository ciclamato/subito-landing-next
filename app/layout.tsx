import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Súbito Red · Laboratorio de Ideas",
  description:
    "Laboratorio de ideas que fusiona narrativa, diseño y tecnología emergente para crear experiencias inmersivas en cultura y turismo.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
