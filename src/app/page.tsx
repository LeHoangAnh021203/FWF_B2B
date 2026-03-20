import { ArrowRight, ChevronDown, ChevronUp, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { BookingSection } from "@/components/BookingSection"
import { FaqSection } from "@/components/FaqSection"
import { FoxSwatSection } from "@/components/FoxSwatSection"
import { HomeHeader } from "@/components/HomeHeader"
import { Button } from "@/components/ui/button"
import "./styles/animation.css"

export default function Home() {
  return (
    <div id="top">
      <HomeHeader />

      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white">
        <div className="container relative z-10 mx-auto px-4 pb-16 pt-24 md:pt-32">
          <div className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mx-auto mb-6 inline-flex max-w-full items-center gap-3 rounded-full border border-orange-200 bg-white/90 px-4 py-3 text-[11px] font-bold text-orange-500 shadow-[0_20px_40px_-28px_rgba(234,88,12,0.45)] backdrop-blur-sm sm:px-6 sm:text-sm md:px-8 md:py-4 md:text-base">
              <span className="hero-status-dot h-2.5 w-2.5 rounded-full bg-orange-500 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5" />
              <span className="truncate">B2B Giải Pháp Doanh Nghiệp</span>
            </p>
            <h1 className="mb-6 text-2xl font-bold text-[#0097b2] sm:text-3xl md:text-4xl lg:text-3xl">
              Để nhân viên cảm nhận được sự quan tâm <br />
              Để đối tác nhớ mãi dấu ấn của bạn.
            </h1>
            <p className="mb-8 text-base leading-8 text-stone-700 sm:text-[18px]">
              <span className="font-semibold text-orange-400">Face Wash Fox</span> là giải pháp phúc lợi & quà tặng doanh nghiệp thiết thực, tinh tế, tạo dấu ấn riêng.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="min-h-12 rounded-[32px] bg-orange-500 px-6 font-bold text-white hover:bg-orange-600 sm:px-8">
                <Link href="#fox-swat">
                  Khám Phá Dịch Vụ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild type="button" size="lg" variant="outline" className="min-h-12 rounded-[32px] border-2 border-stone-200 bg-white px-6 font-bold text-slate-800 shadow-[0_18px_35px_-24px_rgba(15,23,42,0.22)] hover:border-orange-500 hover:bg-white hover:text-orange-500 sm:px-8">
                <Link href="#booking">Đặt Lịch Tư Vấn</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <video
              src="/video/To_video_ngn_202512051030.mp4"
              className="w-full rounded-2xl shadow-2xl"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 text-center">
          <ChevronDown className="mx-auto h-6 w-6 animate-bounce text-orange-500" />
        </div>
      </section>

      <FoxSwatSection />

      <section id="services" className="bg-gradient-to-b from-white via-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-orange-500 md:text-4xl">
              Điều khiến Face Wash Fox trở thành <br /> lựa chọn của nhiều doanh nghiệp
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {industries.map((industry) => (
              <div key={industry.name} className="group relative h-full">
                <div className="relative h-full overflow-hidden rounded-[28px] bg-[#fff5eb] shadow-[0_18px_50px_-30px_rgba(234,88,12,0.35)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_60px_-30px_rgba(234,88,12,0.42)]">
                  <Image
                    src="/FAQ_Images/Copy of Untitled279_20241128105813 (1).png"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="pointer-events-none select-none object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="relative m-3 flex h-[calc(100%-24px)] min-h-[296px] flex-col rounded-[22px] bg-[#fff4ea]/96 p-6 backdrop-blur-[2px] md:m-4 md:min-h-[328px] md:rounded-[26px] md:p-8">
                    <div className="relative mb-6 flex justify-center">
                      <div className="flex h-18 w-18 items-center justify-center rounded-full border border-orange-200/80 bg-[linear-gradient(180deg,rgba(255,197,143,0.98),rgba(255,173,92,0.95))] shadow-[0_16px_30px_-18px_rgba(234,88,12,0.55)] transition-transform duration-300 group-hover:scale-110">
                        <div className="absolute inset-[-8px] rounded-full bg-orange-400/30 blur-xl transition-all duration-300 group-hover:bg-orange-300/40" />
                        <div className="relative z-10 text-white drop-shadow-[0_2px_6px_rgba(194,65,12,0.35)] [&_svg]:h-8 [&_svg]:w-8">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
      <FaqSection />

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
              <div>
                <Image
                  src="/logo_FWF/Logo trên nền màu (1).png"
                  alt="Face Wash Fox"
                  width={220}
                  height={120}
                  className="w-[180px] sm:w-[220px]"
                />
              </div>

              <div className="hidden flex-wrap items-center gap-5 xl:flex">
                <Image src="/Footer/Graphic Element-70.png" alt="Footer graphic" width={100} height={100} />
                <Image src="/Footer/Graphic Element-55.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-67.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-40.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-34.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-25.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-79.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-14.png" alt="Footer graphic" width={100} height={10} />
                <Image src="/Footer/Graphic Element-08.png" alt="Footer graphic" width={100} height={10} />
              </div>
            </div>
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
        <Link
          href="#top"
          aria-label="Lên đầu trang"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_16px_35px_-18px_rgba(234,88,12,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 sm:h-14 sm:w-14"
        >
          <ChevronUp />
        </Link>
      </div>
    </div>
  )
}

const industries = [
  {
    name: "Ngân sách linh hoạt",
    description: "Gói dịch vụ tùy chỉnh theo quy mô và ngân sách doanh nghiệp, <br /> không phát sinh chi phí ngoài.",
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
