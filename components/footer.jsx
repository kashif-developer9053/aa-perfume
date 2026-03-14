import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#262626]">
      <div className="container py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-2xl font-bold tracking-wider"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#d4af37",
                  letterSpacing: "0.1em",
                }}
              >
                Aslam Baig Fragrance
              </span>
            </Link>
            <p
              className="mt-2 max-w-xs text-sm text-[#a1a1a1] leading-relaxed"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Bringing you the world's finest luxury fragrances. Experience elegance, sophistication, and authenticity with every spritz.
            </p>
            <div className="mt-6 flex space-x-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center border border-[#262626] text-[#a1a1a1] hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
                  style={{ borderRadius: "4px" }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold tracking-widest uppercase text-[#fafafa]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Collection" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/categories", label: "Categories" },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold tracking-widest uppercase text-[#fafafa]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/categories", label: "For Her" },
                { href: "/categories", label: "For Him" },
                { href: "/categories", label: "Unisex" },
                { href: "/categories", label: "Oud Collection" },
                { href: "/categories", label: "Gift Sets" },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-5 text-sm font-semibold tracking-widest uppercase text-[#fafafa]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+923165658165"
                  className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors duration-300 flex items-center gap-2"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  +92 304 56 12 169
                </a>
              </li>
              <li>
                <a
                  href="mailto:thechocolatesfactory@icloud.com"
                  className="text-[#a1a1a1] hover:text-[#d4af37] transition-colors duration-300 break-all"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  www.aslambaig.com
                </a>
              </li>
              <li>
                <address
                  className="text-[#a1a1a1] not-italic text-xs leading-relaxed"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Lane 17A, Sector D PWD Society<br />
                   Islamabad, 44000
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#262626] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p
              className="text-center text-xs text-[#a1a1a1]"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              &copy; {new Date().getFullYear()} Aslam Baig Fragrance. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/shipping", label: "Shipping & Returns" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs text-[#a1a1a1] hover:text-[#d4af37] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
