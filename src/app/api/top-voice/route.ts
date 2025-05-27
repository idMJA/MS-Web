import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			return NextResponse.json(
				{ success: false, error: "API URL is not defined" },
				{ status: 500 },
			);
		}
    const res = await fetch(`${apiUrl}/duration`);
    if (!res.ok) {
      return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
