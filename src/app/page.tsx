"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight, ChevronDown, Facebook, Instagram, MessageCircle, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HeroBackground } from "@/components/Hero"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { branches } from "@/data/branches"
import "./styles/animation.css"

type CaseStudy = {
  title: string
  description: string
  image: string
  tags: string[]
  detailPoints: string[]
}

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
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)

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

    const selectedBranch = branches.find((branch) => branch.id === selectedBranchId)
    if (!selectedBranch) {
      setSubmitError("Không tìm thấy chi nhánh đã chọn.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: note.trim(),
          branchId: selectedBranch.id,
          branchName: selectedBranch.name,
          branchAddress: selectedBranch.address,
          branchCity: selectedBranch.city,
          branchMapsUrl: selectedBranch.mapsUrl,
          nearestDistanceKm: nearestBranch?.id === selectedBranch.id ? nearestBranch.distanceKm : null,
        }),
      })

      if (!response.ok) {
        throw new Error("BOOKING_SUBMIT_FAILED")
      }

      setSubmitSuccess("Đăng ký thành công. Face Wash Fox sẽ liên hệ với bạn trong thời gian sớm nhất!")
      setFullName("")
      setPhone("")
      setEmail("")
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
              FACE WASH FOX – GIẢI PHÁP CHĂM SÓC TINH TẾ CHO DOANH NGHIỆP
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
                  Tham Khảo Dịch Vụ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link href="#fox-swat">Xem Fox Swat</Link>
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

      {/* <section className="py-5 relative overflow-hidden opacity-70">
        <div className="container mx-auto">
          <h2 className="text-center text-xl font-medium text-orange-400 mb-12 px-4 ">
            ĐƯỢC CÁC CÔNG TY TIN DÙNG
          </h2>
          <div className="relative w-full overflow-hidden gradient-mask">
            <div className="flex space-x-16 animate-scroll">
             
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
      </section> */}

      <section id="fox-swat" className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">DỊCH VỤ CUNG CẤP</h2>
            <p className="text-xl md:text-xl font-bold mb-4">Hai Giải Pháp Chăm Sóc Da Linh Hoạt Cho Doanh Nghiệp</p>
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
                      <p
                        className="text-muted-foreground mb-4"
                        dangerouslySetInnerHTML={{ __html: study.description }}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        className="group-hover:translate-x-2 transition-transform"
                        onClick={() => setSelectedStudy(study)}
                      >
                        Chi tiết
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <Dialog open={Boolean(selectedStudy)} onOpenChange={(open) => !open && setSelectedStudy(null)}>
          <DialogContent className="border-white/10 bg-[#020817] text-white sm:max-w-2xl">
            {selectedStudy ? (
              <div className="space-y-6">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-2xl leading-tight">{selectedStudy.title}</DialogTitle>
                  <div
                    className="text-sm leading-6 text-gray-300"
                    dangerouslySetInnerHTML={{ __html: selectedStudy.description }}
                  />
                </DialogHeader>

                <ul className="space-y-3 text-base leading-7 text-gray-200">
                  {selectedStudy.detailPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-gradient-to-b from-[#020817] via-background to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">TẠI SAO CHỌN FACE WASH FOX?</h2>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <Dialog open={Boolean(submitSuccess)} onOpenChange={(open) => !open && setSubmitSuccess("")}>
          <DialogContent className="border-white/10 bg-[#020817] text-white sm:max-w-md">
            <DialogHeader className="space-y-3 text-center">
              <DialogTitle className="text-2xl">Đăng ký thành công</DialogTitle>
            </DialogHeader>
            <p className="text-center text-base leading-7 text-gray-300">{submitSuccess}</p>
            <Button
              type="button"
              className="w-full bg-gradient-to-r from-[#f04b9a] to-[#7c3aed] text-white hover:opacity-90"
              onClick={() => setSubmitSuccess("")}
            >
              Đóng
            </Button>
          </DialogContent>
        </Dialog>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Face Wash Fox</h3>
              <p className="text-sm text-muted-foreground">
                FACE WASH FOX – GIẢI PHÁP PHÚC LỢI CHĂM SÓC DA TẠI DOANH NGHIỆP
              </p>
              <div className="flex space-x-4">{/* Social Media Icons */}</div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="https://facewashfox.com/ve-chung-toi/" className="text-sm text-muted-foreground hover:text-primary">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="https://menu.facewashfox.com/˝" className="text-sm text-muted-foreground hover:text-primary">
                    Dịch vụ
                  </Link>
                </li>
                <li>
                  <Link href="https://facewashfox.com/tin-tuc/" className="text-sm text-muted-foreground hover:text-primary">
                    Tin tức
                  </Link>
                </li>
                <li>
                  <Link href="https://cuahang.facewashfox.com/" className="text-sm text-muted-foreground hover:text-primary">
                    Cửa hàng
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

const industries = [
  {
    name: "Ngân sách linh hoạt",
    description: "gói dịch vụ tùy chỉnh theo quy mô và ngân sách doanh nghiệp, không phát sinh chi phí ngoài.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-hand-coins-icon lucide-hand-coins"
      >
        <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
        <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
        <path d="m2 16 6 6" />
        <circle cx="16" cy="9" r="2.9" />
        <circle cx="6" cy="5" r="3" />
      </svg>
    ),
  },
  {
    name: "Chuỗi hơn 50 cửa hàng",
    description: "nhân viên dễ dàng tiếp cận dịch vụ tại bất kỳ chi nhánh nào trên toàn quốc.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-store-icon lucide-store"
      >
        <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
        <path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
        <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
      </svg>
    ),
  },
  {
    name: "Quy trình chuyên nghiệp",
    description: "đội ngũ được đào tạo bài bản, quy trình chuẩn hóa từ soi da AI đến liệu trình, đồng bộ chất lượng tại mọi điểm.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-check-icon lucide-check-check"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
      </svg>
    ),
  },
  {
    name: "Nâng tầm phúc lợi",
    description: "phúc lợi skincare độc đáo, tăng employer branding, nhân viên cảm thấy được quan tâm thực sự.",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-gem-icon lucide-gem"
      >
        <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
        <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
        <path d="M2 9h20" />
      </svg>
    ),
  },
]

const caseStudies: CaseStudy[] = [
  {
    title: "Gói chăm sóc ngay tại văn phòng",
    description:
      "Face Wash Fox mang đội ngũ chuyên viên, thiết bị soi da AI và đầy đủ công cụ chăm sóc da đến trực tiếp doanh nghiệp.",
    image:
      "/Fox Swat/fx3.JPG",
    tags: ["Tiện lợi, không gián đoạn công việc", "Chuyên nghiệp, cá nhân hóa"],
    detailPoints: [
      "Nhân viên trải nghiệm soi da, chăm sóc da nhanh, mini game và lucky draw ngay tại văn phòng.",
      "FWF lo toàn bộ vận hành, doanh nghiệp không cần chuẩn bị.",
      "Phù hợp cho Brand Day, sự kiện nội bộ, team building.",
    ],
  },

  {
    title: "Card Voucher – Thẻ quà tặng chăm sóc da",
    description:
      'Doanh nghiệp mua <b>thẻ quà tặng Face Wash Fox</b> dành tặng nhân viên như một hình thức phúc lợi linh hoạt và tinh tế.',
    image:
      "/Fox Swat/fx3.png",
    tags: ["Thẻ quà tặng Face Wash Fox", "Chủ động sử dụng"],
    detailPoints: [
      "Thẻ vật lý hoặc điện tử, nhân viên dễ dàng sử dụng.",
      "Chủ động đặt lịch và trải nghiệm tại hơn 50 cửa hàng Face Wash Fox trên toàn quốc.",
      "Linh hoạt thời gian, phù hợp làm quà tặng dịp lễ, ghi nhận hiệu suất hoặc tặng định kỳ cho đội ngũ.",
    ],
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
