"use client";

import { motion } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaBook, FaHistory } from "react-icons/fa";
import ScrollIndicator from "@/components/ScrollIndicator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import the new ProgressiveText component
import ProgressiveText from "@/components/ProgressiveText";

export default function Home() {
	return (
		<main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
			<Navbar />

			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0 }}
					className="text-6xl md:text-7xl font-bold mb-6"
				>
					Welcome to MS
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="text-xl text-black dark:text-white mb-12 max-w-2xl"
				>
					Join our vibrant community of gamers, tech enthusiasts, and creative
					minds. Experience a world of endless possibilities and make lasting
					connections.
				</motion.p>
				<div className="flex gap-4">
					<motion.a
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						href="#join"
						className="inline-block bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-colors"
					>
						Join Our Server
					</motion.a>
				</div>
			</section>

			{/* Our Journey Section */}
			<section id="our-journey" className="py-20 bg-white dark:bg-black/20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="max-w-4xl mx-auto"
					>
						<motion.div
							className="flex items-center justify-center mb-12"
							initial={{ opacity: 0, y: -10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							viewport={{ once: true, margin: "-100px" }}
						>
							<FaHistory className="text-4xl text-gray-700 dark:text-gray-300 mr-4" />
							<h2 className="text-3xl font-bold relative">
								Our Journey
								<motion.span
									className="absolute bottom-0 left-0 h-1 bg-gray-700 dark:bg-gray-300"
									initial={{ width: 0 }}
									whileInView={{ width: "100%" }}
									transition={{ duration: 1, delay: 0.5 }}
									viewport={{ once: true }}
								/>
							</h2>
						</motion.div>
						<ProgressiveText
							paragraphs={[
								"On 2 July 2021, consisting of Gemz, MJ, Nonem, ZedID, Reku, Top, Arkham, Azzam and Bread, we made the significant decision to switch from our old discussion group to a private server.",
								"This step was taken after approximately one year of interacting with and building the community within the group.",
								"The main reason for this change was the addition of bots such as Rythm, which significantly enhanced our experience with interactive features unavailable on the previous platform.",
								"These bots made the server feel more lively and enabled us to socialise in a more enjoyable and dynamic way.",
								"Since that initial move, ownership of our server has changed hands twice. Interestingly, both were built and initiated by MJ.",
								"We have currently settled on the newest server, which is managed by a Filipino individual widely known as Ariel.",
								"Meanwhile, other members who have served as managers and founders remain an integral part of our community on this server.",
								"These changes reflect our adaptation to the evolving needs of the community and our desire to create the most suitable digital space for all its members.",
							]}
							delay={0.3}
						/>

						{/* Add scroll indicator to guide users */}
						<ScrollIndicator />
					</motion.div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-background dark:bg-black">
				<div className="container mx-auto px-4">
					<div className="grid md:grid-cols-3 gap-8">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black border-gray-200 dark:border-gray-800"
						>
							<FaUsers className="text-3xl text-foreground mb-4 text-gray-600 dark:text-gray-300" />
							<h3 className="text-xl font-bold mb-2 text-foreground text-gray-600 dark:text-gray-300">
								Active Community
							</h3>
							<p className="text-muted-foreground text-gray-600 dark:text-gray-300">
								Join thousands of active members in daily discussions and
								activities.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black border-gray-200 dark:border-gray-800"
						>
							<FaCalendarAlt className="text-3xl text-foreground mb-4 text-gray-600 dark:text-gray-300" />
							<h3 className="text-xl font-bold mb-2 text-foreground text-gray-600 dark:text-gray-300">
								Regular Events
							</h3>
							<p className="text-muted-foreground text-gray-600 dark:text-gray-300">
								Participate in weekly gaming sessions, tournaments, and
								community events.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="p-6 rounded-lg bg-card shadow-lg border border-border dark:bg-black border-gray-200 dark:border-gray-800"
						>
							<FaBook className="text-3xl text-foreground mb-4 text-gray-600 dark:text-gray-300" />
							<h3 className="text-xl font-bold mb-2 text-foreground text-gray-600 dark:text-gray-300">
								Knowledge Sharing
							</h3>
							<p className="text-muted-foreground text-gray-600 dark:text-gray-300">
								Learn from experts and share your knowledge with the community.
							</p>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Rules Section */}
			<section id="rules" className="py-20">
				<div className="container mx-auto px-4">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-3xl font-bold text-center mb-12"
					>
						Server Rules
					</motion.h2>
					<div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
						{[
							"Be respectful to all members",
							"No spamming or excessive caps",
							"Keep discussions in appropriate channels",
							"No NSFW content",
							"No self-promotion without permission",
							"Follow Discord's Terms of Service",
						].map((rule) => (
							<motion.div
								key={rule}
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.1 }}
								className="p-4 rounded-lg bg-black-50 dark:bg-black-800 shadow-lg border border-gray-200 dark:border-gray-800"
							>
								<p className="text-gray-600 dark:text-gray-300">{rule}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Join Section */}
			<section id="join" className="py-20 bg-black-50 dark:bg-black-800">
				<div className="container mx-auto px-4 text-center">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						className="text-3xl font-bold mb-8"
					>
						Ready to Join?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
					>
						Click the button below to join our Discord server and become part of
						our amazing community!
					</motion.p>
					<motion.a
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						href="https://dc.gg/mss"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
					>
						Join Discord Server
					</motion.a>
				</div>
			</section>

			<Footer />
		</main>
	);
}
