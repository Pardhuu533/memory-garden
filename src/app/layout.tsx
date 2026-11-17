import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { WatercolorDefs } from "@/components/ui/WatercolorDefs";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Memory Garden • 記憶の庭",
  description: "A quiet, hand-drawn daily journal where memories become plants in a living garden.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ebGaramond.variable}>
      <body className="antialiased bg-[#faf6ee] text-[#2c2825]">
        {/* Global SVG Filters for watercolor and ink textures */}
        <WatercolorDefs />
        {children}
      </body>
    </html>
  );
}
