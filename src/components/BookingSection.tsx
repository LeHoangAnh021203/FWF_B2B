"use client"

import { useState } from "react"

import { branches } from "@/data/branches"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function BookingSection() {
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [note, setNote] = useState("")
  const [selectedBranchId] = useState(branches[0]?.id ?? 1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")

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

  return (
    <section id="booking" className="bg-gradient-to-b from-white via-orange-50 to-white py-20">
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

            {submitError ? <p className="text-[0.95rem] text-[#dc2626]">{submitError}</p> : null}

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
  )
}
