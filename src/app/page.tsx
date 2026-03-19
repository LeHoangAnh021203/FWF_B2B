"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronUp, ArrowUpRight, ChevronDown, GamepadDirectional, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { branches } from "@/data/branches"
import "./styles/animation.css"

type CaseStudy = {
  eyebrow: string
  eyebrowClassName: string
  iconClassName: string
  dialogBorderClassName: string
  title: string
  description: string
  image: string
  tags: string[]
  detailPoints: string[]
}

export default function Home() {
  const headerLinks = [
    { label: "Dịch Vụ", href: "#fox-swat" },
    { label: "FAQ", href: "#faq" },
  ]

  const [isScrolled, setIsScrolled] = useState(false)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [selectedBranchId] = useState(branches[0]?.id ?? 1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState(-1)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
          nearestDistanceKm: null,
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

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div>
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 p-2 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md border-b border-orange-100" : "bg-transparent"
          }`}
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
            <Button
              onClick={handleScrollToBooking}
              className="nav-shimmer h-11 rounded-full border border-orange-300 bg-orange-500 px-4 text-sm font-semibold text-white shadow-[0_18px_40px_-28px_rgba(234,88,12,0.45)] hover:bg-orange-600 md:h-14 md:px-10 md:text-lg"
            >
              <span className="md:hidden">Liên Hệ</span>
              <span className="hidden md:inline">Liên Hệ Ngay</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white">

        <motion.div className="container relative z-10 mx-auto px-4 pb-16 pt-24 md:pt-32">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-orange-200 bg-white/90 px-4 py-3 text-[11px] font-bold text-orange-500 shadow-[0_20px_40px_-28px_rgba(234,88,12,0.45)] backdrop-blur-sm sm:px-6 sm:text-sm md:px-8 md:py-4 md:text-base"
            >
              <span className="hero-status-dot h-2.5 w-2.5 rounded-full bg-orange-500 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
              <span className="truncate">B2B Giải Pháp Doanh Nghiệp</span>
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-2xl font-bold text-orange-500 sm:text-3xl md:text-4xl lg:text-5xl"
            >
              FACE WASH FOX – ĐỒNG HÀNH CÙNG DOANH NGHIỆP:
              <br className="hidden sm:block" /> CHĂM SÓC NHÂN VIÊN, TRI ÂN ĐỐI TÁC
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 text-base leading-8 text-stone-700 sm:text-lg"
            >
              <span className="text-orange-400 font-semibold">Face Wash Fox</span> mang đến giải pháp chăm sóc da
              và chăm sóc sức khỏe tinh thần ngay tại nơi làm việc,
              <br className="hidden sm:block" />
              giúp doanh nghiệp nâng tầm phúc lợi dành cho nhân
              viên theo cách thiết thực, gần gũi và tạo dấu ấn riêng.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="min-h-12 rounded-[32px] bg-orange-500 px-6 text-white hover:bg-orange-600 font-bold sm:px-8">
                <Link href="#fox-swat">
                  Khám Phá Dịch Vụ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={handleScrollToBooking}
                className="min-h-12 rounded-[32px] border-2 border-stone-200 bg-white px-6 font-bold text-slate-800 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.22)] hover:border-orange-500 hover:bg-white hover:text-orange-500 sm:px-8"
              >
                Đặt Lịch Tư Vấn
              </Button>

            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mx-auto max-w-5xl"
          >
            <video
              src="/video/To_video_ngn_202512051030.mp4"
              className="w-full rounded-2xl shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
            />
          </motion.div>
        </motion.div>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-8 z-10">
          <ChevronDown className="w-6 h-6 text-orange-500 animate-bounce mx-auto" />
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

      <section id="fox-swat" className="py-20 bg-gradient-to-b from-orange-100 via-white to-orange-50">
        <div className="mx-auto w-full max-w-[1480px] px-4 md:px-8 xl:px-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-sm font-bold uppercase  text-orange-300 md:text-base">KHÁM PHÁ</h2>
            <p className="text-3xl md:text-4xl font-bold mb-4 text-black">3 GÓI DỊCH VỤ</p>
          </div>
          <div className="grid gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="relative overflow-visible border border-orange-200/70 bg-white/95 shadow-[0_20px_60px_-24px_rgba(234,88,12,0.35)] transition-all duration-500 group-hover:border-orange-300 group-hover:shadow-[0_28px_80px_-28px_rgba(234,88,12,0.45)]">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(254,215,170,0.28),transparent_30%)] opacity-80" />
                  <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-70" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0 rounded-[inherit] bg-orange-950/45 opacity-0 backdrop-blur-[4px] transition-all duration-500 ease-out group-hover:w-full group-hover:opacity-100" />
                  <CardContent className="relative grid gap-5 p-4 pt-8 text-orange-500 sm:p-5 md:p-6 md:pt-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-8">
                    <div
                      className={`absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border bg-white px-3 py-1 text-sm font-extrabold uppercase tracking-[0.2em] shadow-[0_12px_30px_-18px_rgba(15,23,42,0.28)] sm:px-4 sm:py-1.5 sm:text-base lg:text-xl ${study.eyebrowClassName}`}
                    >
                      {study.eyebrow}
                    </div>
                    <div className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white p-4 shadow-inner">
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.12),transparent_28%)]" />
                      <div className="pointer-events-none absolute right-4 top-4 h-14 w-14 rounded-full bg-orange-200/30 blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:bg-orange-300/40" />
                      <div className="relative h-52 overflow-hidden rounded-[24px] sm:h-56 lg:h-[300px]">
                        <Image
                          src={study.image || "/placeholder.svg"}
                          alt={study.title}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    <div className="px-2 py-1 md:px-3">
                      <h3 className="mb-3 text-xl font-semibold leading-tight text-orange-600 transition-colors duration-300 group-hover:text-orange-500 sm:text-2xl">
                        {study.title}
                      </h3>
                      <p
                        className="mb-4 max-w-2xl text-sm leading-6 text-stone-500 sm:text-base sm:leading-7 lg:line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: study.description }}
                      />
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-orange-300/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-orange-600 shadow-sm transition-all duration-300 group-hover:border-orange-400 group-hover:bg-orange-50 sm:text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <Button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="pointer-events-auto translate-y-4 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-orange-600 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.35)] transition-all duration-300 hover:bg-white group-hover:translate-y-0 sm:px-6 sm:py-3 sm:text-base"
                      >
                        Chi tiết
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <Dialog open={Boolean(selectedStudy)} onOpenChange={(open) => !open && setSelectedStudy(null)}>
          <DialogContent className={`bg-white text-orange-950 sm:max-w-2xl border-5 ${selectedStudy?.dialogBorderClassName ?? "border-orange-200"}`}>
            {selectedStudy ? (
              <div className="space-y-6">
                <DialogHeader className="space-y-3">
                  <DialogTitle className="text-2xl leading-tight">{selectedStudy.title}</DialogTitle>
                  <div
                    className="text-sm leading-6 text-stone-600"
                    dangerouslySetInnerHTML={{ __html: selectedStudy.description }}
                  />
                </DialogHeader>

                <ul className="space-y-3 text-base leading-7 text-stone-700">
                  {selectedStudy.detailPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <GamepadDirectional className={`mt-1 h-5 w-5 shrink-0 ${selectedStudy.iconClassName}`} />
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
      <section id="services" className="py-20 bg-gradient-to-b from-white via-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-orange-500">Điều khiến Face Wash Fox trở thành <br /> lựa chọn của nhiều doanh nghiệp</h2>

          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="relative h-full overflow-hidden rounded-[28px] bg-[#fff5eb] shadow-[0_18px_50px_-30px_rgba(234,88,12,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_-30px_rgba(234,88,12,0.42)]">
                  <Image
                    src="/FAQ_Images/Copy of Untitled279_20241128105813 (1).png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="pointer-events-none select-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="relative m-3 flex h-[calc(100%-24px)] min-h-[296px] flex-col rounded-[22px] bg-[#fff4ea]/86 p-6 backdrop-blur-[2x] md:m-4 md:min-h-[328px] md:rounded-[26px] md:p-8">
                    <div className="relative mb-6 flex justify-center">
                      <div className="flex h-18 w-18 items-center justify-center rounded-full border border-orange-200/80 bg-[linear-gradient(180deg,rgba(255,197,143,0.98),rgba(255,173,92,0.95))] shadow-[0_16px_30px_-18px_rgba(234,88,12,0.55)] transition-transform duration-300 group-hover:scale-110">
                        <div className="flex text-center justify-center items-center absolute inset-[-8px] rounded-full bg-orange-400/30 blur-xl transition-all duration-300 group-hover:bg-orange-300/40" />
                        <div className="justify-center items-center text-center relative z-10 text-white drop-shadow-[0_2px_6px_rgba(194,65,12,0.35)] [&_svg]:h-8 [&_svg]:w-8">
                          <industry.icon />
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-3 text-[18px] font-semibold text-orange-950 transition-colors duration-300 group-hover:text-orange-600">
                      {industry.name}
                    </h3>
                    <p
                      className="flex-1 text-sm leading-7 text-stone-600 transition-colors duration-300 group-hover:text-stone-800"
                      dangerouslySetInnerHTML={{ __html: industry.description }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>




      {/* CTA Section */}
      <section id="booking" className="py-20 bg-gradient-to-b from-white via-orange-50 to-white">

        <div className="container mx-auto px-4">

          <div className="mx-auto max-w-2xl text-center">
            <a
              href="tel:0889866666"
              className="flex h-14 w-full items-center justify-center rounded-[14px] bg-orange-500 px-6 text-center text-lg font-extrabold text-white transition-opacity hover:opacity-90 md:h-16 md:px-8 md:text-[1.65rem]"
            >
              Liên hệ để nhận báo giá
            </a>
            <h2 className="mb-4 pt-5 text-xl font-bold text-black md:text-3xl">Doanh Nghiệp Của Bạn Đã Sẵn Sàng Chưa?</h2>
            <p className="mb-8 text-sm leading-7 text-muted-foreground md:text-[16px]">
              Hãy cung cấp cho chúng tôi thông tin của bạn để chúng tôi biết rằng bạn đã sẵn sàng <br className="hidden sm:block" /> để hợp tác với FWF nhé!
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
                    className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
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
                    className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
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
                  className="h-14 w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
                />
              </div>

              <div>

                <textarea
                  id="booking-note"
                  rows={4}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Hãy cho chúng tôi biết bạn đang cần gì..."
                  className="w-full rounded-[14px] border border-orange-200 bg-orange-50 px-5 py-4 text-base text-[#111827] outline-none placeholder:text-[#8b96a5] focus:border-orange-400 md:text-[1.15rem]"
                />
              </div>

              {submitError ? (
                <p className="text-[0.95rem] text-[#dc2626]">{submitError}</p>
              ) : null}


              <button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-[14px] bg-orange-500 px-8 text-lg font-extrabold text-white transition-opacity hover:opacity-90 md:h-16 md:text-[1.65rem]"
              >
                {isSubmitting ? "Đang gửi thông tin..." : "Đặt lịch tư vấn miễn phí"}
              </button>






            </form>
          </div>
        </div>
        <Dialog open={Boolean(submitSuccess)} onOpenChange={(open) => !open && setSubmitSuccess("")}>
          <DialogContent className="border-orange-200 bg-white text-orange-950 sm:max-w-md">
            <DialogHeader className="space-y-3 text-center">
              <DialogTitle className="text-2xl">Đăng ký thành công</DialogTitle>
            </DialogHeader>
            <p className="text-center text-base leading-7 text-stone-600">{submitSuccess}</p>
            <Button
              type="button"
              className="w-full bg-orange-500 text-white hover:bg-orange-600"
              onClick={() => setSubmitSuccess("")}
            >
              Đóng
            </Button>
          </DialogContent>
        </Dialog>
      </section>


      {/* FAQ */}

      <section id="faq" className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/60 to-white py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_55%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase  text-orange-300 md:text-base">Câu Hỏi Thường Gặp</p>
            <h2 className="text-3xl font-bold text-orange-500 md:text-5xl">Dịch vụ Face Wash Fox</h2>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2 lg:gap-5">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className={`w-full rounded-[24px] border bg-white/95 p-5 text-left shadow-[0_18px_50px_-30px_rgba(234,88,12,0.35)] transition-all duration-300 md:rounded-[28px] md:p-6 ${isOpen ? "border-orange-300 shadow-[0_24px_60px_-30px_rgba(234,88,12,0.42)]" : "border-orange-100 hover:-translate-y-1 hover:border-orange-200"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors ${isOpen ? "border-orange-300 bg-orange-100 text-orange-600" : "border-orange-200 bg-orange-50 text-orange-500"}`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-semibold leading-tight text-stone-900 md:text-xl">
                            {item.question}
                          </h3>
                          <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                        </div>
                        <div className={`grid transition-all duration-300 ${isOpen ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          <div className="overflow-hidden">
                            <p className="pr-0 text-sm leading-7 text-stone-600 md:pr-8 md:text-base md:leading-8">{item.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-[#ff8c00] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,214,102,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,128,0,0.35),transparent_30%)]" />
        <div className="relative mx-auto w-full max-w-[1800px] px-4 py-14 sm:px-6 md:px-10 xl:px-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:gap-12">
            <div className="max-w-4xl">
              <h2 className="max-w-4xl text-2xl font-extrabold leading-tight md:text-4xl">
                Da đẹp bắt đầu từ việc rửa mặt
              </h2>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-orange-50/95 md:text-xl md:leading-8">
                Face Wash Fox - Chuỗi cửa hàng rửa mặt công nghệ tại <br className="hidden sm:block" /> Việt Nam.
              </p>
              <p className="mt-3 text-lg font-black tracking-[0.08em] text-white md:text-xl">
                Hotline: 0889 866 666
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end lg:gap-5">
              <Link
                href="#booking"
                className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-4 text-center text-base font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_22px_45px_-24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 sm:min-w-[280px] sm:w-auto sm:px-8 sm:py-5 sm:text-xl"
              >
                ĐẶT LỊCH NGAY
              </Link>
              <Link
                href="https://cuahang.facewashfox.com/"
                className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-4 text-center text-base font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_22px_45px_-24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 sm:min-w-[280px] sm:w-auto sm:px-8 sm:py-5 sm:text-xl"
              >
                HỆ THỐNG CHI NHÁNH
              </Link>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-8 xl:mt-14 xl:flex-row xl:items-end xl:justify-between xl:gap-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div >
                <Image
                  src="/logo_FWF/Logo trên nền màu (1).png"
                  alt="Face Wash Fox"
                  width={220}
                  height={120}
                  className="w-[180px] sm:w-[220px]"
                />
              </div>

              <div className="hidden flex-wrap items-center gap-5 xl:flex">
                <Image
                  src="/Footer/Graphic Element-70.png"
                  alt="Footer graphic"
                  width={100}
                  height={100}
                />

                <Image
                  src="/Footer/Graphic Element-55.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-67.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-40.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-34.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-25.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-79.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-14.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
                <Image
                  src="/Footer/Graphic Element-08.png"
                  alt="Footer graphic"
                  width={100}
                  height={10}
                />
              </div>
            </div>

            {/* <div className="grid gap-4 text-sm font-semibold text-orange-50 md:grid-cols-2 xl:max-w-xl">
              <div className="space-y-3">
                <Link href="https://facewashfox.com/ve-chung-toi/" className="block transition-opacity hover:opacity-80">
                  Ve chung toi
                </Link>
                <Link href="https://menu.facewashfox.com/" className="block transition-opacity hover:opacity-80">
                  Dich vu
                </Link>
                <Link href="https://facewashfox.com/tin-tuc/" className="block transition-opacity hover:opacity-80">
                  Tin tuc
                </Link>
                <Link href="https://cuahang.facewashfox.com/" className="block transition-opacity hover:opacity-80">
                  Cua hang
                </Link>
              </div>
              <div className="space-y-3">
                <p>Ho Chi Minh, Ha Noi</p>
                <Link href="tel:0889866666" className="block transition-opacity hover:opacity-80">
                  0889 866 666
                </Link>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <Link
                    href="https://www.facebook.com/facewashfox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all hover:-translate-y-1 hover:bg-white/25"
                  >
                    <Facebook className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/facewashfox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all hover:-translate-y-1 hover:bg-white/25"
                  >
                    <Instagram className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.youtube.com/@facewashfox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all hover:-translate-y-1 hover:bg-white/25"
                  >
                    <Youtube className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://zalo.me/352472932154112250"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-all hover:-translate-y-1 hover:bg-white/25"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div> */}
          </div>

          <div className="mt-12 border-t border-white/15 pt-6 text-sm font-medium text-orange-100/90">
            <p>&copy; {new Date().getFullYear()} Face Wash Fox. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-5 right-3 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-4 sm:gap-3 md:bottom-8 md:right-6">

        <Link
          href="tel:0889866666"
          aria-label="Gọi điện"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_16px_35px_-18px_rgba(234,88,12,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 sm:h-14 sm:w-14"
        >
          <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>
        <Link
          href="https://zalo.me/352472932154112250"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin"
          className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_16px_35px_-18px_rgba(234,88,12,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 sm:h-14 sm:w-14"
        >
          <Image
            src="https://i.pinimg.com/736x/1c/e6/41/1ce64129a8c06a58fb2bbc79e70d5e0d.jpg"
            alt="Nhắn tin"
            width={50}
            height={50}
            className="h-full w-full rounded-full object-cover"
          />
        </Link>
        <button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Lên đầu trang"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_16px_35px_-18px_rgba(234,88,12,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 sm:h-14 sm:w-14"
        >
          <ChevronUp />
        </button>
      </div>
    </div>
  )
}

const industries = [
  {
    name: "Ngân sách linh hoạt",
    description: "Gói dịch vụ tùy chỉnh theo quy mô <br /> và ngân sách doanh nghiệp, <br /> không phát sinh chi phí ngoài.",
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
    name: "Trải nghiệm chăm sóc khác biệt",
    description: "Mang đến trải nghiệm chăm sóc da thiết thực, giúp nhân viên cảm thấy được quan tâm và nâng cao hình ảnh doanh nghiệp.",
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
    name: "Dễ dàng sử dụng",
    description: "Nhân viên có thể dễ dàng sử dụng dịch vụ tại hơn 50 cửa hàng Facewashfox trên toàn quốc",
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
    name: "Quy trình chuyên nghiệp",
    description: "Đội ngũ chuyên viên được đào tạo bài bản, quy trình chuẩn hóa từ soi da AI đến liệu trình chăm sóc, đảm bảo chất lượng đồng bộ",
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
    eyebrow: "FOX CASH",
    eyebrowClassName: "border-lime-300 text-lime-500",
    iconClassName: "text-lime-500",
    dialogBorderClassName: "border-lime-300",
    title: "Gói linh hoạt, cá nhân hóa tối đa",
    description:
      "Cash Voucher là giải pháp quà tặng đơn giản và linh hoạt nhất dành cho doanh nghiệp muốn tri ân nhân viên",
    image:
      "/Fox Swat/fx3.png",
    tags: ["Cá nhân hóa 100%", "Không giới hạn loại dịch vụ", "Dễ dàng sử dụng"],
    detailPoints: [
      "Mệnh giá đa dạng: 50.000 VNĐ – 100.000 VNĐ – 200.000 VNĐ – 500.000 VNĐ (có thể tùy chỉnh theo nhu cầu doanh nghiệp).",
      "Cách sử dụng: Nhân viên nhận voucher như một khoản tiền mặt kỹ thuật số hoặc vật lý, mang đến bất kỳ cửa hàng Face Wash Fox nào trên toàn quốc để trừ trực tiếp vào chi phí dịch vụ chăm sóc da",
    ],
  },


  {
    eyebrow: "FOX GIFT CARD",
    eyebrowClassName: "border-sky-300 text-sky-500",
    iconClassName: "text-sky-500",
    dialogBorderClassName: "border-sky-300",
    title: "Gói liệu trình chuyên gia",
    description:
      'Card Voucher là gói quà tặng cao cấp với mệnh giá cố định, tương ứng trực tiếp một liệu trình chuyên sâu tại Face Wash Fox, mang đến trải nghiệm chuẩn spa ngay lập tức.',
    image:
      "/Fox Swat/1.png",
    tags: ["Trải nghiệm chăm sóc da chuẩn chuyên gia", "Tạo cảm giác được chăm sóc thực sự", "Dễ dàng sử dụng"],
    detailPoints: [
      "Doanh nghiệp chọn sẵn các liệu trình khuyên dùng từ nhà Cáo để làm quà tặng chăm sóc cho nhân viên",
      "Nhân viên mang card đến bất kỳ cửa hàng nào trong hệ thống để sử dụng đầy đủ quy trình: soi da, tư vấn và thực hiện liệu trình chuyên nghiệp.",
    ],
  },

  {
    eyebrow: "FOX SWAT",
    eyebrowClassName: "border-orange-300 text-orange-500",
    iconClassName: "text-orange-500",
    dialogBorderClassName: "border-orange-300",
    title: "Gói chăm sóc ngay tại văn phòng",
    description:
      'Fox SWAT mang toàn bộ spa công nghệ cao của Face Wash Fox đến ngay tại doanh nghiệp, setup booth chuyên nghiệp để nhân viên thư giãn và chăm sóc da mà không cần di chuyển',
    image:
      "/Fox Swat/fx3.JPG",
    tags: ["Tạo điểm nhấn cho văn hóa doanh nghiệp", "Trải nghiệm thư giãn ngay trong giờ làm việc"],
    detailPoints: [
      "Đội ngũ chuyên gia cùng thiết bị hiện đại (máy soi da AI, các đầu máy rửa mặt) đến tận văn phòng.",
      "Phù hợp cho Brand Day, sự kiện nội bộ, team building",
      "Linh hoạt chăm sóc ngắn hạn, biến một ngày làm việc thành ngày trải nghiệm đáng nhớ và gắn kết đội nhóm",
    ],
  },

]

const faqItems = [
  {
    question: "Doanh nghiệp có thể triển khai dịch vụ cho bao nhiêu nhân viên?",
    answer:
      "Face Wash Fox có thể linh hoạt triển khai từ nhóm nhỏ khoảng 10-50 nhân viên đến các chương trình lớn cho 300-500 nhân viên trong cùng một ngày, tùy theo gói dịch vụ và không gian tại doanh nghiệp.",
  },
  {
    question: "Dịch vụ chăm sóc da tại văn phòng có ảnh hưởng đến giờ làm việc không?",
    answer:
      "Các liệu trình được thiết kế gọn và tối ưu thời gian. Mỗi lượt trải nghiệm thường chỉ khoảng 10-15 phút, giúp nhân viên thư giãn và chăm sóc da mà vẫn không ảnh hưởng đến tiến độ công việc.",
  },
  {
    question: "Doanh nghiệp cần chuẩn bị gì khi triển khai Fox SWAT tại văn phòng?",
    answer:
      "Doanh nghiệp chỉ cần bố trí một khu vực phù hợp để setup booth trải nghiệm. Face Wash Fox sẽ chuẩn bị thiết bị, sản phẩm, quy trình vận hành và đội ngũ chuyên viên đi kèm.",
  },
  {
    question: "Voucher hoặc gift card có thể sử dụng linh hoạt theo thời gian của nhân viên không?",
    answer:
      "Có. Nhân viên có thể chủ động sắp xếp thời gian sử dụng voucher hoặc gift card tại hệ thống Face Wash Fox, giúp doanh nghiệp dễ triển khai mà không cần gom lịch cố định cho toàn bộ đội ngũ.",
  },
  {
    question: "Doanh nghiệp có thể tùy chỉnh gói dịch vụ theo ngân sách không?",
    answer:
      "Có. Face Wash Fox có thể thiết kế gói chăm sóc phù hợp với ngân sách, mục tiêu và quy mô từng doanh nghiệp, từ voucher linh hoạt, gift card cố định đến trải nghiệm chăm sóc ngay tại văn phòng.",
  },
]
