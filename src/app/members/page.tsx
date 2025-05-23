"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Member {
	discord_user: {
		id: string;
		username: string;
		global_name: string | null;
		display_name: string;
		avatar: string | null;
		bot: boolean;
	};
	discord_status: string;
	active_on_discord_desktop: boolean;
	active_on_discord_mobile: boolean;
	active_on_discord_web: boolean;
}

function MemberCard({ member }: { member: Member }) {
	const statusColor =
		{
			online: "bg-green-500",
			idle: "bg-yellow-500",
			dnd: "bg-red-500",
			offline: "bg-gray-500",
		}[member.discord_status] || "bg-gray-500";

	const getAvatarUrl = (userId: string, avatar: string | null) => {
		if (!avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
		return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
	};

	// Platform badges
	const platforms = [];
	if (member.active_on_discord_desktop) platforms.push("Desktop");
	if (member.active_on_discord_mobile) platforms.push("Mobile");
	if (member.active_on_discord_web) platforms.push("Web");

	// Activities
	const activity =
		Array.isArray(
			(
				member as Member & {
					activities?: Array<{
						name?: string;
						type?: number;
						state?: string;
						details?: string;
					}>;
				}
			).activities,
		) &&
		(
			(
				member as Member & {
					activities?: Array<{
						name?: string;
						type?: number;
						state?: string;
						details?: string;
					}>;
				}
			).activities || []
		).length > 0
			? (
					member as Member & {
						activities?: Array<{
							name?: string;
							type?: number;
							state?: string;
							details?: string;
						}>;
					}
				).activities?.[0]
			: null;
	// Spotify
	const spotify = (
		member as Member & { spotify?: { song: string; artist: string } }
	).spotify;

	return (
		<div
			className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 w-full bg-transparent border border-gray-400 dark:border-white rounded-3xl p-6 shadow-lg"
			style={{ minHeight: 140 }}
		>
			{/* Left: Avatar & Info */}
			<div className="flex items-center gap-4 w-full md:w-auto">
				<div className="relative">
					<Image
						src={getAvatarUrl(
							member.discord_user.id,
							member.discord_user.avatar,
						)}
						alt={member.discord_user.username}
						width={80}
						height={80}
						className="rounded-full object-cover border-2 border-white dark:border-gray-800"
					/>
					<span
						className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${statusColor}`}
					/>
				</div>
				<div>
					<div className="flex items-center gap-2">
						<span className="font-bold text-lg md:text-xl text-white dark:text-white">
							{member.discord_user.global_name ||
								member.discord_user.display_name}
						</span>
						{member.discord_user.bot && (
							<span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-blue-900 text-blue-200 font-semibold">
								Bot
							</span>
						)}
					</div>
					<div className="text-gray-300 text-sm mb-2">
						@{member.discord_user.username}
					</div>
					<div className="flex gap-2 mt-1">
						{platforms.map((p) => (
							<span
								key={p}
								className="bg-neutral-800 text-white text-xs px-3 py-1 rounded-lg font-semibold border border-neutral-700"
							>
								{p}
							</span>
						))}
					</div>
				</div>
			</div>
			{/* Right: Activities & Spotify */}
			<div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto">
				{/* Activity */}
				{activity && (
					<div className="text-white text-base font-medium">
						{activity.name && (activity.type === 0 || activity.type === 1) && (
							<span>Playing {activity.name}</span>
						)}
						{activity.type === 4 && activity.state && (
							<span>{activity.state}</span>
						)}
					</div>
				)}
				{activity?.details && (
					<div className="text-gray-400 text-sm">{activity.details}</div>
				)}
				{/* Spotify */}
				{spotify && (
					<div className="flex items-center mt-2">
						<FaSpotify className="text-green-500 mr-2" size={20} />
						<div>
							<div className="text-green-400 font-bold text-base leading-tight">
								{spotify.song}
							</div>
							<div className="text-green-200 text-xs">by {spotify.artist}</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function MembersPage() {
	const [members, setMembers] = useState<Member[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMembers = async () => {
			try {
				const response = await fetch("/api/members");
				const data = await response.json();
				if (data.success) {
					setMembers(data.data.members);
				} else {
					setError("Failed to fetch members");
				}
			} catch {
				setError("Error fetching members");
			} finally {
				setLoading(false);
			}
		};

		fetchMembers();
	}, []);

	return (
		<main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
			<Navbar />

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center py-20 px-4 text-center">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0 }}
					className="text-4xl md:text-5xl font-bold mb-6"
				>
					Our Members
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl"
				>
					Meet our amazing community members
				</motion.p>
			</section>

			{/* Members Grid */}
			<section className="py-10 px-4">
				<div className="container mx-auto max-w-4xl">
					{loading ? (
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto" />
							<p className="mt-4">Loading members...</p>
						</div>
					) : error ? (
						<div className="text-center text-red-500">
							<p>{error}</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{members.map((member) => (
								<MemberCard key={member.discord_user.id} member={member} />
							))}
						</div>
					)}
				</div>
			</section>

			<Footer />
		</main>
	);
}
