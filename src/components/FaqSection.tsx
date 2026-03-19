"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { faqItems } from "@/components/home-data"

export function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState(-1)

  return (
    <section id="faq" className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/60 to-white py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_55%)]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase text-orange-300 md:text-base">Câu Hỏi Thường Gặp</p>
          <h2 className="text-3xl font-bold text-orange-500 md:text-5xl">Dịch vụ Face Wash Fox</h2>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2 lg:gap-5">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index

            return (
              <div key={item.question}>
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
