import { Playfair_Display, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import ConditionalHeader from "@/components/conditional-header"
import { CartProvider } from "@/context/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata = {
  title: "AyeshaAslam - Luxury Fragrances & Premium Perfumes",
  description: "Discover exquisite luxury fragrances. Premium handcrafted perfumes that define elegance and sophistication.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${playfair.variable} ${montserrat.variable} bg-[#0a0a0a] text-[#fafafa]`} style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <CartProvider>
            <ConditionalHeader />
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
