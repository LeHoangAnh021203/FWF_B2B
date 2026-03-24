"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight, GamepadDirectional } from "lucide-react"
import Image from "next/image"

import { caseStudies, type CaseStudy } from "@/components/home-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function FoxSwatSection() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const [previewStates, setPreviewStates] = useState<Record<string, { current: number; previous: number }>>({})

  useEffect(() => {
    const rotatingStudies = caseStudies.filter((study) => study.previewImages?.length)

    if (!rotatingStudies.length) return

    const interval = window.setInterval(() => {
      setPreviewStates((current) => {
        const next = { ...current }
        for (const study of rotatingStudies) {
          const total = study.previewImages?.length ?? 0
          if (!total) continue
          const currentIndex = current[study.title]?.current ?? 0
          next[study.title] = {
            previous: currentIndex,
            current: (currentIndex + 1) % total,
          }
        }
        return next
      })
    }, 2200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="fox-swat" className="relative z-20 bg-gradient-to-b from-orange-100 via-white to-orange-50 py-20">
      <div className="mx-auto w-full max-w-[1480px] px-4 md:px-8 xl:px-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-sm font-bold uppercase text-orange-300 md:text-base">KHÁM PHÁ</h2>
          <p className="mb-4 text-3xl font-bold text-black md:text-4xl">3 GÓI DỊCH VỤ</p>
        </div>
        <div className="grid gap-8 pt-6">
          {caseStudies.map((study, index) => (
            <div
              key={study.title}
              className="group cursor-pointer"
              style={{ contentVisibility: "auto", containIntrinsicSize: "420px" }}
            >
              <Card className="relative mt-0 overflow-visible border border-orange-200/70 bg-white/95 shadow-[0_18px_40px_-26px_rgba(234,88,12,0.26)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-orange-300 group-hover:shadow-[0_22px_48px_-28px_rgba(234,88,12,0.34)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(254,215,170,0.28),transparent_30%)] opacity-80" />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[rgba(130,99,88,0.42)] opacity-0 backdrop-blur-[8px] transition-opacity duration-300 group-hover:opacity-100" />
                <CardContent className="relative grid gap-5 p-4 pt-16 text-orange-500 sm:p-5 sm:pt-16 md:p-6 md:pt-18 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-8">
                  <div
                    className={`absolute left-1/2 top-5 z-30 -translate-x-1/2 rounded-full border bg-white px-3 py-1 text-sm font-extrabold uppercase tracking-[0.2em] shadow-[0_12px_30px_-18px_rgba(15,23,42,0.28)] sm:px-4 sm:py-1.5 sm:text-base lg:text-xl ${study.eyebrowClassName}`}
                  >
                    {study.eyebrow}
                  </div>
                  <div className="relative overflow-hidden rounded-[28px] border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-white p-4 shadow-inner">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.12),transparent_28%)]" />
                    <div className="pointer-events-none absolute right-4 top-4 h-12 w-12 rounded-full bg-orange-200/25 blur-xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-orange-300/35" />
                    <div className="relative h-52 overflow-hidden rounded-[24px] sm:h-56 lg:h-[300px]">
                      {study.previewImages?.length ? (
                        <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-orange-100 bg-white">
                          {study.previewImages.map((previewImage, previewIndex) => (
                            <Image
                              key={previewImage}
                              src={previewImage}
                              alt={`${study.title} voucher ${previewIndex + 1}`}
                              fill
                              priority={index < 3 && previewIndex === 0}
                              sizes="(max-width: 1024px) 100vw, 44vw"
                              className={`object-cover object-center transition-transform duration-700 ${
                                previewIndex === (previewStates[study.title]?.current ?? 0)
                                  ? "translate-x-0 z-20"
                                  : previewIndex === (previewStates[study.title]?.previous ?? -1)
                                    ? "-translate-x-full z-10"
                                    : "translate-x-full z-0"
                              }`}
                            />
                          ))}
                        </div>
                      ) : (
                        <Image
                          src={study.image}
                          alt={study.title}
                          fill
                          priority={index < 3}
                          sizes="(max-width: 1024px) 100vw, 44vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
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
                    <div className="mt-5 lg:hidden">
                      <Button
                        type="button"
                        onClick={() => setSelectedStudy(study)}
                        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_38px_-20px_rgba(234,88,12,0.45)] transition-all duration-300 hover:bg-orange-600"
                      >
                        Chi tiết
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 z-20 hidden items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 lg:flex">
                    <Button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="pointer-events-auto translate-y-4 rounded-full bg-white/98 px-8 py-3 text-base font-bold text-orange-600 shadow-[0_18px_38px_-20px_rgba(15,23,42,0.35)] transition-all duration-300 hover:bg-white group-hover:translate-y-0"
                    >
                      Chi tiết
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={Boolean(selectedStudy)} onOpenChange={(open) => !open && setSelectedStudy(null)}>
        <DialogContent className={`border-5 bg-white text-orange-950 sm:max-w-2xl ${selectedStudy?.dialogBorderClassName ?? "border-orange-200"}`}>
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

              {selectedStudy.voucherImages?.length ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">Voucher mẫu</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selectedStudy.voucherImages.map((voucherImage, index) => (
                      <div
                        key={voucherImage}
                        className="overflow-hidden rounded-[20px] border border-orange-100 bg-orange-50/60 p-2 shadow-[0_14px_30px_-24px_rgba(234,88,12,0.35)]"
                      >
                        <Image
                          src={voucherImage}
                          alt={`Voucher ${selectedStudy.eyebrow} ${index + 1}`}
                          width={800}
                          height={800}
                          className="h-auto w-full rounded-[14px] object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
