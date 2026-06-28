// app/api/stats/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const dashboardUrl = process.env.DASHBOARD_URL

  if (!dashboardUrl) {
    return NextResponse.json({ cases: null, improvements: null })
  }

  try {
    const [totalRes, dispatchedRes] = await Promise.all([
      fetch(`${dashboardUrl}/api/v1/issues`, { next: { revalidate: 60 } }),
      fetch(`${dashboardUrl}/api/v1/issues?status=dispatched`, { next: { revalidate: 60 } }),
    ])

    const [totalData, dispatchedData] = await Promise.all([
      totalRes.json() as Promise<{ total?: number }>,
      dispatchedRes.json() as Promise<{ total?: number }>,
    ])

    return NextResponse.json({
      cases: totalData.total ?? 0,
      improvements: dispatchedData.total ?? 0,
    })
  } catch {
    return NextResponse.json({ cases: null, improvements: null })
  }
}
