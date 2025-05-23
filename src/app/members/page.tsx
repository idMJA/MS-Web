"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

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

function MemberCardSkeleton() {
	return (
		<Card className="w-full bg-transparent border-gray-400 dark:border-gray-900">
			<CardContent className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 p-3">
				<div className="flex items-center gap-2 w-full md:w-auto">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="space-y-1.5">
						<Skeleton className="h-4 w-28" />
						<Skeleton className="h-3 w-20" />
						<div className="flex gap-2">
							<Skeleton className="h-3 w-14" />
							<Skeleton className="h-3 w-14" />
						</div>
					</div>
				</div>
				<div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto gap-1.5">
					<Skeleton className="h-4 w-28" />
					<Skeleton className="h-3 w-20" />
				</div>
			</CardContent>
		</Card>
	);
}

function MemberCard({ member }: { member: Member }) {
	const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
		online: "default",
		idle: "secondary",
		dnd: "destructive",
		offline: "outline",
	};

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
						}>;
					}
				).activities?.[0]
			: null;

	// Spotify
	const spotify = (
		member as Member & { spotify?: { song: string; artist: string } }
	).spotify;

	// Function to truncate text
	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text;
		return `${text.slice(0, maxLength)}...`;
	};

	return (
		<Card className="w-full bg-transparent border-gray-400 dark:border-white">
			<CardContent className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 p-2">
				{/* Left: Avatar & Info */}
				<div className="flex items-center gap-2 w-full md:w-auto">
					<div className="relative">
						<Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
							<AvatarImage
								src={getAvatarUrl(
									member.discord_user.id,
									member.discord_user.avatar,
								)}
								alt={member.discord_user.username}
							/>
							<AvatarFallback>MC</AvatarFallback>
						</Avatar>
						<Badge variant={statusVariants[member.discord_status] || "outline"} className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full p-0 border-2 border-white dark:border-gray-800" />
					</div>
					<div>
						<div className="flex items-center gap-1.5">
							<span className="font-bold text-sm text-white dark:text-white">
									{truncateText(member.discord_user.global_name || member.discord_user.display_name, 20)}
							</span>
							{member.discord_user.bot && (
								<Badge variant="outline" className="ml-1 text-xs py-0 h-4">
									Bot
								</Badge>
							)}
						</div>
						<div className="text-gray-300 text-xs mb-0.5">
							@{member.discord_user.username}
						</div>
						<div className="flex gap-1">
							{platforms.map((p) => (
								<Badge
									key={p}
									variant="outline"
									className="text-xs py-0 h-4"
								>
									{p}
								</Badge>
							))}
						</div>
					</div>
				</div>
				{/* Right: Activities & Spotify */}
				<div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto gap-1">
					{/* Activity */}
					{activity && (
						<div className="text-white text-xs font-medium">
							{activity.name && (activity.type === 0) && (
								<span>Playing {truncateText(activity.name, 15)}</span>
							)}
							{activity.name && (activity.type === 1) && (
								<span>{truncateText(activity.name, 20)}</span>
							)}
							{activity.type === 4 && activity.state && (
								<span>{truncateText(activity.state, 20)}</span>
							)}
						</div>
					)}
					{/* Spotify */}
					{spotify && (
						<div className="flex items-center gap-1">
							<FaSpotify className="text-green-500" size={12} />
							<div className="text-green-400 font-bold text-xs">
								{truncateText(spotify.song, 20)}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
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
			<section className="flex flex-col items-center justify-center py-16 px-4 text-center">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0 }}
					className="text-4xl md:text-5xl font-bold mb-4"
				>
					Our Members
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
				>
					Meet our amazing community members
				</motion.p>
			</section>

			{/* Members Grid */}
			<section className="py-8 px-4">
				<div className="container mx-auto max-w-6xl">
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{Array.from({ length: 6 }).map(() => {
								const uniqueKey = crypto.randomUUID();
								return <MemberCardSkeleton key={uniqueKey} />;
							})}
						</div>
					) : error ? (
						<Alert variant="destructive" className="mb-6">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{error}</AlertDescription>
						</Alert>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
