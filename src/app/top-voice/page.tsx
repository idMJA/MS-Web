"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface User {
	user_id: string;
	username: string;
	display_name: string;
	avatar: string | null;
	duration: number;
	formatted_duration: string;
}

interface DurationData {
	data: {
		total_users: number;
		total_duration: number;
		formatted_total_duration: string;
		users: User[];
	};
	success: boolean;
}

const fetchDurationData = async (): Promise<DurationData | null> => {
	try {
		const res = await fetch("/api/top-voice");
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
};

function formatDuration(seconds: number) {
	const d = Math.floor(seconds / 86400);
	const h = Math.floor((seconds % 86400) / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = seconds % 60;
	const parts = [];
	if (d > 0) parts.push(`${d}d`);
	if (h > 0) parts.push(`${h}h`);
	if (m > 0) parts.push(`${m}m`);
	if (s > 0) parts.push(`${s}s`);
	return parts.join(" ");
}

export default function TopVoice() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchDurationData().then((data) => {
			if (!data || !data.success) {
				setError("Failed to fetch data");
				setLoading(false);
				return;
			}
			setUsers(data.data.users);
			setLoading(false);
		});
	}, []);

	return (
		<main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white py-10 pt-30">
			<Navbar />
			<div className="container mx-auto px-4">
				<h1 className="text-4xl font-bold mb-8 text-center">
					Top Voice Leaderboard
				</h1>
				<p className="text-center mb-6">
					Total Users: {users.length} ・ Total Duration:{" "}
					{formatDuration(users.reduce((acc, user) => acc + user.duration, 0))}
				</p>
				{loading ? (
					<div className="overflow-x-auto">
						<table
							className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
							style={{ background: "transparent" }}
						>
							<thead
								className="bg-gray-100 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60"
								style={{ background: "rgba(30,41,59,0.6)" }}
							>
								<tr>
									<th className="py-2 px-4">Rank</th>
									<th className="py-2 px-4">User</th>
									<th className="py-2 px-4">Total Duration</th>
								</tr>
							</thead>
							<tbody>
								{[...Array(10)].map((_, idx) => (
									<tr key={`skeleton-row-${idx + 1}`}>
										<td className="py-2 px-4 text-center font-bold">
											<div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
										</td>
										<td className="py-2 px-4 flex items-center gap-2">
											<div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
											<div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
										</td>
										<td className="py-2 px-4 text-center">
											<div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto" />
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : error ? (
					<div className="text-center text-red-500">{error}</div>
				) : (
					<div className="overflow-x-auto">
						<table
							className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
							style={{ background: "transparent" }}
						>
							<thead
								className="bg-gray-100 dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-60"
								style={{ background: "rgba(30,41,59,0.6)" }}
							>
								<tr>
									<th className="py-2 px-4">Rank</th>
									<th className="py-2 px-4">User</th>
									<th className="py-2 px-4">Total Duration</th>
								</tr>
							</thead>
							<tbody>
								{users.map((user, idx) => {
									// Highlight for top 1-5: gradient, glass, or subtle border
									let rowClass = "";
									let style: React.CSSProperties = {
										background: "transparent",
									};
									if (idx < 5) {
										rowClass = "backdrop-blur-md border border-yellow-400/40";
										style = {
											background:
												"linear-gradient(90deg, rgba(255,215,0,0.18) 0%, rgba(255,255,255,0.08) 100%)",
											boxShadow: "0 2px 16px 0 rgba(255,215,0,0.08)",
										};
									} else if (idx % 2 === 0) {
										style = { background: "rgba(30,41,59,0.18)" };
									} else {
										style = { background: "rgba(30,41,59,0.10)" };
									}
									return (
										<tr key={user.user_id} className={rowClass} style={style}>
											<td className="py-2 px-4 text-center font-bold">
												{idx + 1}
											</td>
											<td className="py-2 px-4 flex items-center gap-2">
												<Image
													src={
														user.avatar
															? `https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar}.png`
															: "https://cdn.discordapp.com/embed/avatars/0.png"
													}
													alt={user.display_name || user.username}
													width={32}
													height={32}
													className="rounded-full"
												/>
												<span>{user.display_name || user.username}</span>
											</td>
											<td className="py-2 px-4 text-center">
												{user.duration > 0
													? formatDuration(user.duration)
													: null}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<br />
			<br />
			<Footer />
		</main>
	);
}
