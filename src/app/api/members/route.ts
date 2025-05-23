import { NextResponse } from "next/server";

export async function GET() {
	try {
		const apiUrl = process.env.API_URL;
		if (!apiUrl) {
			return NextResponse.json(
				{ success: false, error: "API URL is not defined" },
				{ status: 500 },
			);
		}
		const response = await fetch(`${apiUrl}/members`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		if (!data || !data.success) {
			return NextResponse.json(
				{ success: false, error: "Invalid response format from API" },
				{ status: 502 },
			);
		}

		return NextResponse.json(
			{
				success: true,
				data: data.data,
				timestamp: new Date().toISOString(),
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error fetching members:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch members",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 },
		);
	}
}
