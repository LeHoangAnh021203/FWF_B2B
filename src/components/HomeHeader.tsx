"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const headerLinks = [
  { label: "Dịch Vụ", href: "#fox-swat" },
  { label: "FAQ", href: "#faq" },
]

export function HomeHeader() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full p-2 transition-all duration-300 ${isScrolled ? "border-b border-orange-100 bg-white/90 backdrop-blur-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-3 md:h-20 md:gap-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_FWF/Logo tiêu chuẩn.png"
              alt="Face Wash Fox"
              width={144}
              height={144}
              className="h-12 w-auto md:h-20"
            />
          </Link>
          <nav className="nav-shimmer hidden items-center gap-3 rounded-full border border-orange-300/80 bg-white/90 px-4 py-3 shadow-[0_18px_40px_-28px_rgba(234,88,12,0.38)] backdrop-blur md:flex">
            <Link
              href="https://menu.facewashfox.com/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-6 text-lg font-semibold text-slate-600 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
            >
              Fox Menu
            </Link>
            <Link
              href="https://cuahang.facewashfox.com/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-6 text-lg font-semibold text-slate-600 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
            >
              Fox Map
            </Link>
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex h-12 items-center justify-center rounded-full border border-transparent px-6 text-lg font-semibold text-slate-600 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button asChild className="nav-shimmer h-11 rounded-full border border-orange-300 bg-orange-500 px-4 text-sm font-semibold text-white shadow-[0_18px_40px_-28px_rgba(234,88,12,0.45)] hover:bg-orange-600 md:h-14 md:px-10 md:text-lg">
            <Link href="#booking">
              <span className="md:hidden">Liên Hệ</span>
              <span className="hidden md:inline">Liên Hệ Ngay</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
