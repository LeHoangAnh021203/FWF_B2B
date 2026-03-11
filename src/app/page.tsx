"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight, ChevronDown, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeroBackground } from "@/components/Hero"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { branches } from "@/data/branches"
import "./styles/animation.css"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [selectedBranchId, setSelectedBranchId] = useState(branches[0]?.id ?? 1)
  const [distanceByBranchId, setDistanceByBranchId] = useState<Record<number, number>>({})
  const [nearestBranch, setNearestBranch] = useState<{ id: number; distanceKm: number } | null>(null)
  const [locationError, setLocationError] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDetectNearestBranch = () => {
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị.")
      return
    }

    setIsLocating(true)
    setLocationError("")
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const distances = Object.fromEntries(
          branches.map((branch) => [
            branch.id,
            getDistanceKm(latitude, longitude, branch.lat, branch.lng),
          ]),
        ) as Record<number, number>
        setDistanceByBranchId(distances)

        const nearest = branches.reduce(
          (best, branch) => {
            const distanceKm = distances[branch.id]
            if (!best || distanceKm < best.distanceKm) {
              return { id: branch.id, distanceKm }
            }
            return best
          },
          null as { id: number; distanceKm: number } | null,
        )

        if (nearest) {
          setNearestBranch(nearest)
          setSelectedBranchId(nearest.id)
        }
        setIsLocating(false)
      },
      () => {
        setLocationError("Không thể lấy vị trí hiện tại. Vui lòng chọn chi nhánh thủ công.")
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  useEffect(() => {
    handleDetectNearestBranch()
  }, [])

  const handleSubmitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")

    if (!fullName.trim() || !phone.trim()) {
      setSubmitError("Vui lòng điền đầy đủ họ tên và số điện thoại.")
      return
    }

    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitSuccess("Đăng ký thành công. Face Wash Fox sẽ liên hệ bạn sớm.")
      setNote("")
    } catch {
      setSubmitError("Gửi thông tin thất bại. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById("booking")
    if (!bookingSection) return
    bookingSection.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div>
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold">
              Face Wash Fox
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    <Link href="https://menu.facewashfox.com/">
                      FOX MENU
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    <Link href="https://cuahang.facewashfox.com/">
                      FOX MAP
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button onClick={handleScrollToBooking}>Liên Hệ</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-zinc-950">
        <HeroBackground />
        <motion.div className="container mx-auto px-4 pt-32 pb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-xl lg:text-4xl font-bold text-white mb-6"
            >
              FACE WASH FOX – GIẢI PHÁP PHÚC LỢI CHĂM SÓC DA TẠI DOANH NGHIỆP
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              <span className="text-orange-400 font-semibold">Face Wash Fox</span> mang đến giải pháp chăm sóc da
              và chăm sóc sức khỏe tinh thần ngay tại nơi làm việc, giúp doanh nghiệp nâng tầm phúc lợi dành cho nhân
              viên theo cách thiết thực, gần gũi và tạo dấu ấn riêng.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link href="#services">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="#fox-swat">View Fox Swat</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            <video
              src="/video/To_video_ngn_202512051030.mp4"
              className="w-full rounded-lg shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-8 z-10">
          <ChevronDown className="w-6 h-6 text-white animate-bounce mx-auto" />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-5 relative overflow-hidden opacity-70">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-medium text-orange-400 mb-12 px-4 ">
            ĐƯỢC CÁC CÔNG TY TIN DÙNG
          </h2>
          <div className="relative w-full overflow-hidden gradient-mask">
            <div className="flex space-x-16 animate-scroll">
              {/* First set of logos */}
              {[...companies, ...companies].map((company, index) => (
                <div key={`${company.name}-${index}`} className="flex items-center justify-center min-w-[160px] group">
                  <div className="relative w-32 h-32 opacity-100 transition-all duration-300">
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DỊCH VỤ CỦA CHÚNG TÔI</h2>
            <p className="text-lg text-muted-foreground">
              Các giải pháp công nghệ toàn diện được thiết kế riêng để thúc đẩy sự phát triển của doanh nghiệp bạn.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-lg bg-card hover:bg-card/80 transition-all border"
              >

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                  Learn More
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-10 bg-gradient-to-b from-background via-[#020817] to-[#020817] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%209.40.27%E2%80%AFAM-373LVsiWeCMUoIp1mD84gCtt4nlzTn.png')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative p-8 rounded-2xl bg-[#0a101f]/40 border border-gray-800/50 backdrop-blur-sm hover:bg-[#0a101f]/60 transition-all duration-300">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 rounded-full bg-[#1a1f2e] flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300">
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-300" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 text-primary [&_svg]:w-8 [&_svg]:h-8">
                        <industry.icon />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="fox-swat" className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FOX SWAT</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Card>
                  <CardContent className="p-0">
                    <div className="relative h-64 mb-6 rounded-t-lg overflow-hidden bg-black/20">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {study.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{study.description}</p>
                      <Button variant="ghost" className="group-hover:translate-x-2 transition-transform">
                        Read Case Study
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="booking" className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Doanh Nghiệp Của Bạn Đã Sẵn Sàng Chưa?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Hãy cung cấp cho chúng tôi thông tin của bạn để chúng tôi biết rằng bạn đã sẵn sàng để hợp tác với FWF nhé.
            </p>
            <form className="mt-8 space-y-6 md:mt-10" onSubmit={handleSubmitBooking}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <input
                    id="booking-name"
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Nhập họ và tên"
                    required
                    className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                  />
                </div>

                <div>

                  <input
                    id="booking-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Nhập số điện thoại"
                    required
                    className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                  />
                </div>
              </div>

              <div>

                <input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Nhập email"
                  className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="booking-branch" className="text-[1.05rem] font-semibold text-orange">
                    Chi nhánh gần nhất
                  </label>
                  <button
                    type="button"
                    onClick={handleDetectNearestBranch}
                    className="text-[1.05rem] text-[#0369a1] underline underline-offset-2"
                  >
                    {isLocating ? "Đang dò vị trí..." : "Dò vị trí để gợi ý"}
                  </button>
                </div>
                <select
                  id="booking-branch"
                  className="h-14 w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 text-[1.05rem] text-[#111827] outline-none focus:border-[#a855f7]/50 md:text-[1.15rem]"
                  value={selectedBranchId}
                  onChange={(event) => setSelectedBranchId(Number(event.target.value))}
                >
                  {branches.map((branch) => {
                    const distance = distanceByBranchId[branch.id];
                    return (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                        {typeof distance === "number"
                          ? ` — ${distance.toFixed(1)} km`
                          : ""}
                      </option>
                    );
                  })}
                </select>
                {locationError ? (
                  <p className="mt-2 text-[0.95rem] text-[#dc2626]">{locationError}</p>
                ) : null}
                {nearestBranch ? (
                  <p className="mt-2 text-[0.95rem] text-[#0f766e]">
                    Đã gợi ý chi nhánh gần nhất ({nearestBranch.distanceKm.toFixed(1)} km).
                  </p>
                ) : null}
              </div>

              <div>

                <textarea
                  id="booking-note"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Hãy cho chúng tôi biết bạn đang cần gì..."
                  className="w-full rounded-[14px] border border-[#c7cdd5] bg-[#f1dce9] px-5 py-4 text-[1.05rem] text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-[#a855f7]/50 md:text-[1.15rem]"
                />
              </div>

              {submitError ? (
                <p className="text-[0.95rem] text-[#dc2626]">{submitError}</p>
              ) : null}
              {submitSuccess ? (
                <p className="text-[0.95rem] text-[#0f766e]">{submitSuccess}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-16 w-full rounded-[14px] bg-gradient-to-r from-[#f04b9a] to-[#7c3aed] px-8 text-[1.35rem] font-extrabold text-white transition-opacity hover:opacity-90 md:text-[1.65rem]"
              >
                {isSubmitting
                  ? "Đang gửi thông tin..."
                  : "Đặt lịch ngay - Miễn phí tư vấn"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Face Wash Fox</h3>
              <p className="text-sm text-muted-foreground">
                FACE WASH FOX – GIẢI PHÁP PHÚC LỢI CHĂM SÓC DA TẠI DOANH NGHIỆP
              </p>
              <div className="flex space-x-4">{/* Social Media Icons */}</div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    AI Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Custom Software
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Cloud Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Cybersecurity
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">Hồ Chí Minh, Hà Nội</li>

                <li>
                  <Link href="tel:+2341234567890" className="text-sm text-muted-foreground hover:text-primary">
                    0889 866 666
                  </Link>
                </li>
                <li>
                  <div className="flex items-center gap-3">
                    <Link
                      href="https://www.facebook.com/facewashfox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Link>
                    <Link
                      href="https://www.instagram.com/facewashfox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </Link>
                    <Link
                      href="https://www.youtube.com/@facewashfox"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Youtube className="h-4 w-4" />
                      YouTube
                    </Link>
                    <Link
                      href="https://zalo.me/352472932154112250"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Zalo
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Madison. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const companies = [
  { name: "Danh Giá", logo: "/logo-company/danh-gia-logo.png" },
  { name: "Phương Phát", logo: "/logo-company/PPLogo.png" },
  { name: "Danh Giá", logo: "/logo-company/danh-gia-logo.png" },
  { name: "Phương Phát", logo: "/logo-company/PPLogo.png" },
  { name: "Danh Giá", logo: "/logo-company/danh-gia-logo.png" },
  { name: "Phương Phát", logo: "/logo-company/PPLogo.png" },
]

const services = [
  {
    title: "Triển khai tận nơi",
    description: "Facewashfox mang dịch vụ soi da và tư vấn chăm sóc da trực tiếp đến văn phòng, linh hoạt theo lịch làm việc của doanh nghiệp.",


  },
  {
    title: "Quy trình chuyên nghiệp",
    description: "Đội ngũ chuyên viên được đào tạo bài bản, quy trình rõ ràng từ check-in, soi da đến tư vấn cá nhân hóa, đảm bảo trải nghiệm đồng bộ và chất lượng.",
  },
  {
    title: "Tối ưu chi phí",
    description: "Chi phí hợp lý theo số lượng nhân viên, không phát sinh ngoài dự kiến. Chỉ cần một ngân sách nhỏ nhưng tạo giá trị lâu dài.",

  },


]

const industries = [
  {
    name: "Công nghệ hiện đại",
    description: "Ứng dụng công nghệ soi da thông minh giúp phân tích chính xác tình trạng da, đưa ra giải pháp phù hợp cho từng nhân viên.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M2 17a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V8.32a5 5 0 0 0-2.64-4.4L12 0 4.64 3.92A5 5 0 0 0 2 8.32Z" />
        <path d="m6 12 6-3 6 3" />
        <path d="M12 9v8" />
      </svg>
    ),
  },
  {
    name: "Dễ dàng tổ chức",
    description: "Facewashfox phụ trách toàn bộ khâu chuẩn bị, vận chuyển, lắp đặt và vận hành. Doanh nghiệp không cần thêm nguồn lực nội bộ.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: "Nâng tầm phúc lợi",
    description: "Building seamless shopping experiences with scalable platforms and smart inventory systems",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
  },
]

const caseStudies = [
  {
    title: "Biệt đội chăm sóc da tận nơi",
    description:
      "Facewashfox mang nơi soi da và tư vấn chăm sóc da đến trực tiếp doanh nghiệp, thiết lập một góc thư giãn ngay tại văn phòng.",
    image:
      "/Fox Swat/fx1.JPG",
    tags: ["Tiện lợi, không gián đoạn công việc", "Chuyên nghiệp, cá nhân hóa"],
  },
  {
    title: "Gói chăm sóc linh hoạt",
    description:
      "Linh hoạt ngân sách theo quy mô và mục tiêu doanh nghiệp .Giữ trọn quyền lợi đầy đủ dịch vụ và chuyên nghiệp. Doanh nghiệp lựa chọn gói dịch vụ, nhân viên chủ động trải nghiệm tại Facewashfox theo lịch trình riêng",
    image:
      "/Fox Swat/fx3.JPG",
    tags: ["Linh hoạt ngân sách", "Giữ trọn quyền lợi"],
  },

  {
    title: "Thẻ quà tặng cho nhân viên",
    description:
      "Doanh nghiệp mua thẻ quà tặng Facewashfox dành tặng nhân viên như một hình thức phúc lợi linh hoạt và tinh tế. Nhân viên chủ động sử dụng dịch vụ chăm sóc da tại Facewashfox theo nhu cầu và thời gian cá nhân.",
    image:
      "/Fox Swat/fx3.png",
    tags: ["Thẻ quà tặng Face Wash Fox", "Chủ động sử dụng"],
  },
]

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}
