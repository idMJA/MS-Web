"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { MemberCard, MemberStats } from "@/components/MemberCard";
import { Card, CardContent } from "@/components/ui/card";

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
					// Utility function to sort members by name
					const sortByName = (a: Member, b: Member) => {
						const nameA = (
							a.discord_user.global_name || a.discord_user.display_name
						).toLowerCase();
						const nameB = (
							b.discord_user.global_name || b.discord_user.display_name
						).toLowerCase();
						return nameA.localeCompare(nameB);
					};

					// Separate members into online and offline groups
					const onlineMembers = data.data.members.filter(
						(m: Member) => m.discord_status !== "offline",
					);
					const offlineMembers = data.data.members.filter(
						(m: Member) => m.discord_status === "offline",
					);

					// Sort each group by name
					const sortedOnline = onlineMembers.sort(sortByName);
					const sortedOffline = offlineMembers.sort(sortByName);

					// Combine sorted groups: online first, then offline
					setMembers([...sortedOnline, ...sortedOffline]);
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

			{/* Member Stats */}
			{!loading && !error && members.length > 0 && (
				<MemberStats members={members} />
			)}

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
