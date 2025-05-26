"use client";

import { FaSpotify } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@/components/ui/icon";
import { useMemo } from "react";

interface Activity {
	name?: string;
	type?: number;
	state?: string;
}

interface SpotifyData {
	song: string;
	artist: string;
}

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
	activities?: Activity[];
	listening_to_spotify?: boolean;
	spotify?: SpotifyData;
}

// Platform icons configuration
const platformIcons = {
	desktop: (
		<Icon
			d="M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z"
			width={16}
			height={16}
			title="Desktop"
		/>
	),
	web: (
		<Icon
			d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"
			width={16}
			height={16}
			title="Web"
		/>
	),
	mobile: (
		<Icon
			d="M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z"
			viewBox="0 0 1000 1500"
			width={16}
			height={16}
			title="Mobile"
		/>
	),
};

export function MemberCard({ member }: { member: Member }) {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "online":
				return "bg-green-500";
			case "idle":
				return "bg-yellow-500";
			case "dnd":
				return "bg-red-500";
			default:
				return "bg-gray-500";
		}
	};

	const getAvatarUrl = (userId: string, avatar: string | null) => {
		if (!avatar) return "https://cdn.discordapp.com/embed/avatars/0.png";
		return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png`;
	};

	// Platform icons list
	const platforms = [];
	if (member.active_on_discord_desktop) platforms.push("desktop");
	if (member.active_on_discord_web) platforms.push("web");
	if (member.active_on_discord_mobile) platforms.push("mobile");

	// Function to truncate text
	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) return text;
		return `${text.slice(0, maxLength)}...`;
	};

	// Helper: get main activity (not custom status, not Spotify)
	const getMainActivity = (activities: Activity[] | undefined) => {
		if (!activities) return undefined;
		// Exclude type 4 (custom status) and type 2 (Spotify)
		return activities.find((act) => act.type !== 4 && act.type !== 2);
	};

	// Helper: get activity label
	const getActivityLabel = (type: number) => {
		switch (type) {
			case 0:
				return "Playing";
			case 1:
				return "Streaming";
			case 2:
				return "Listening to";
			case 3:
				return "Watching";
			case 5:
				return "Competing in";
			default:
				return "";
		}
	};

	const mainActivity = getMainActivity(member.activities);

	return (
		<Card
			className={`w-full bg-transparent border-gray-400/20 dark:border-white/20 hover:border-gray-400/40 dark:hover:border-white/40 transition-colors ${member.discord_status === "offline" ? "opacity-50" : ""}`}
		>
			<CardContent className="flex flex-col md:flex-row items-center md:items-stretch justify-between gap-2 p-1.5 relative">
				{/* Platform icons - Moved to top right of card */}
				<div className="absolute -top-3.5 right-2 flex gap-1.5 z-10">
					{platforms.map((platform) => (
						<span
							key={platform}
							className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
						>
							{platformIcons[platform as keyof typeof platformIcons]}
						</span>
					))}
				</div>
				{/* Left: Avatar & Info */}
				<div className="flex items-center gap-2 w-full md:w-auto">
					<div className="relative">
						<Avatar className="h-12 w-12 border-2 border-white dark:border-gray-800">
							<AvatarImage
								src={getAvatarUrl(
									member.discord_user.id,
									member.discord_user.avatar,
								)}
								alt={member.discord_user.username}
							/>
							<AvatarFallback>MC</AvatarFallback>
						</Avatar>
						<div
							className={`${getStatusColor(member.discord_status)} absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-800`}
						/>
					</div>
					<div className="relative w-full">
						<div className="flex items-center gap-1.5">
							<span className="font-bold text-sm text-black dark:text-white">
								{truncateText(
									member.discord_user.global_name ||
										member.discord_user.display_name,
									20,
								)}
							</span>
							{member.discord_user.bot && (
								<Badge
									variant="secondary"
									className="ml-1 text-[10px] py-0 h-3.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 shrink-0"
								>
									BOT
								</Badge>
							)}
						</div>
						<div className="text-gray-500 dark:text-gray-400 text-xs mb-0.5">
							@{member.discord_user.username}
						</div>
					</div>
				</div>
				{/* Right: Activities & Spotify */}
				<div className="flex flex-col items-start md:items-end justify-center w-full md:w-auto gap-1 md:pr-1">
					{/* Show main activity if present */}
					{mainActivity && (
						<div className="text-gray-600 dark:text-gray-300 text-xs font-medium">
							{mainActivity.name && (
								<span>
									{getActivityLabel(mainActivity.type ?? 0)}{" "}
									{truncateText(mainActivity.name, 20)}
								</span>
							)}
							{mainActivity.state && mainActivity.type === 3 && (
								<span>{truncateText(mainActivity.state, 20)}</span>
							)}
						</div>
					)}
					{/* Only show Spotify if no main activity is present, but listening_to_spotify is true */}
					{!mainActivity && member.listening_to_spotify && member.spotify && (
						<div className="flex items-center gap-1">
							<FaSpotify className="text-green-500" size={12} />
							<div className="text-green-500 text-xs">
								{truncateText(member.spotify.song, 20)}
							</div>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export function MemberStats({ members }: { members: Member[] }) {
	const stats = useMemo(() => {
		const online = members.filter((m) => m.discord_status === "online").length;
		const idle = members.filter((m) => m.discord_status === "idle").length;
		const dnd = members.filter((m) => m.discord_status === "dnd").length;
		const offline = members.filter(
			(m) => m.discord_status === "offline",
		).length;
		const total = members.length;
		return { online, idle, dnd, offline, total };
	}, [members]);

	return (
		<div className="flex flex-wrap justify-center items-center bg-transparent border border-gray-400/40 dark:border-white/20 rounded-lg px-4 py-3 mb-4 text-center gap-x-4 gap-y-2 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto w-full">
			<div className="min-w-[60px] flex-1">
				<div className="text-xs text-muted-foreground">Online</div>
				<div className="text-xl font-semibold text-green-500 dark:text-green-400">
					{stats.online}
				</div>
			</div>
			<div className="min-w-[60px] flex-1">
				<div className="text-xs text-muted-foreground">Idle</div>
				<div className="text-xl font-semibold text-yellow-500 dark:text-yellow-400">
					{stats.idle}
				</div>
			</div>
			<div className="min-w-[60px] flex-1">
				<div className="text-xs text-muted-foreground">DND</div>
				<div className="text-xl font-semibold text-red-500 dark:text-red-400">
					{stats.dnd}
				</div>
			</div>
			<div className="min-w-[60px] flex-1">
				<div className="text-xs text-muted-foreground">Offline</div>
				<div className="text-xl font-semibold text-muted-foreground">
					{stats.offline}
				</div>
			</div>
			<div className="min-w-[60px] flex-1">
				<div className="text-xs text-muted-foreground">Total</div>
				<div className="text-xl font-semibold text-foreground dark:text-white">
					{stats.total}
				</div>
			</div>
		</div>
	);
}
