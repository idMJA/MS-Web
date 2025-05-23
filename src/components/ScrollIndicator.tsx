"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function ScrollIndicator() {
	const [scrollProgress, setScrollProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			// Get the current scroll position
			const scrollY = window.scrollY;
			// Calculate how far down the page the user has scrolled
			const journeySection = document.getElementById("our-journey");

			if (journeySection) {
				const sectionTop = journeySection.offsetTop;
				const sectionHeight = journeySection.offsetHeight;
				const scrollPosition = scrollY - sectionTop;

				// Calculate scroll progress as a percentage
				if (scrollPosition > 0 && scrollPosition < sectionHeight) {
					const progress = Math.min(scrollPosition / (sectionHeight * 0.7), 1);
					setScrollProgress(progress);
				}
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="flex flex-col items-center mt-8 mb-4">
			<motion.div
				animate={{
					y: [0, 10, 0],
					opacity: [0.6, 1, 0.6],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "loop",
				}}
				className="text-center"
			>
				<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
					{scrollProgress < 0.9
						? "Continue scrolling to reveal our story"
						: "Explore the rest of our site"}
				</p>
				<FaChevronDown className="mx-auto text-gray-500 dark:text-gray-400" />
			</motion.div>

			{/* Progress indicator */}
			<div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-4">
				<motion.div
					className="h-full bg-gray-500 dark:bg-gray-400 rounded-full"
					initial={{ width: 0 }}
					animate={{ width: `${scrollProgress * 100}%` }}
					transition={{ type: "spring", stiffness: 50 }}
				/>
			</div>
		</div>
	);
}
