import { Literata, Inter } from "next/font/google";

export const literata = Literata({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-literata",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // Ainda não usada em nenhum estilo: não pré-carregar evita baixar a fonte em toda página.
  preload: false,
  variable: "--font-inter",
});
