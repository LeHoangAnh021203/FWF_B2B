import { NextResponse } from "next/server"

type BookingPayload = {
  fullName?: string
  phone?: string
  email?: string
  note?: string
  branchId?: number
  branchName?: string
  branchAddress?: string
  branchCity?: string
  branchMapsUrl?: string
  nearestDistanceKm?: number | null
}

export async function POST(request: Request) {
  const bookingScriptUrl = process.env.BOOKING_APPS_SCRIPT_URL

  if (!bookingScriptUrl) {
    return NextResponse.json({ error: "BOOKING_APPS_SCRIPT_URL is not configured." }, { status: 500 })
  }

  let payload: BookingPayload

  try {
    payload = (await request.json()) as BookingPayload
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
  }

  if (!payload.fullName?.trim() || !payload.phone?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 })
  }

  try {
    const appsScriptResponse = await fetch(bookingScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: payload.fullName.trim(),
        phone: payload.phone.trim(),
        email: payload.email?.trim() ?? "",
        note: payload.note?.trim() ?? "",
        branchId: payload.branchId ?? "",
        branchName: payload.branchName ?? "",
        branchAddress: payload.branchAddress ?? "",
        branchCity: payload.branchCity ?? "",
        branchMapsUrl: payload.branchMapsUrl ?? "",
        nearestDistanceKm:
          typeof payload.nearestDistanceKm === "number" ? Number(payload.nearestDistanceKm.toFixed(1)) : "",
      }),
      cache: "no-store",
    })

    const responseText = await appsScriptResponse.text()

    if (!appsScriptResponse.ok) {
      return NextResponse.json(
        {
          error: "Apps Script rejected the request.",
          details: responseText,
        },
        { status: 502 },
      )
    }

    return new NextResponse(responseText, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to reach Apps Script." }, { status: 502 })
  }
}
