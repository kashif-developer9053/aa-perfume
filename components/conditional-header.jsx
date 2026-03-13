"use client"

import { usePathname } from "next/navigation"
import MainNav from "@/components/main-nav"

export default function ConditionalHeader() {
  const pathname = usePathname()

  // Don't render the main nav on admin routes
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#0a0a0a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0a]/80">
      <div className="container flex h-20 items-center">
        <MainNav />
      </div>
    </header>
  )
}
