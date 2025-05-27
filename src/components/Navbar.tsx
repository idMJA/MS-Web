"use client";

import { FaDiscord } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav
			className="fixed top-0 w-full transition-all duration-300 ease-in-out
	  bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 
	  border-b border-black/20 dark:border-black/80"
		>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<FaDiscord className="text-2xl text-gray-700 dark:text-gray-300 transition-colors duration-300" />
					<Link href="/" className="text-xl font-bold transition-colors duration-300">
						MS
					</Link>
				</div>
				<div className="flex items-center space-x-6">
					<div className="hidden md:flex space-x-6">
						<Link href="/members" className="transition-all duration-300 ease-in-out hover:text-gray-600 dark:hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gray-600 dark:after:bg-gray-300">
							Members
						</Link>
						<Link href="/top-voice" className="transition-all duration-300 ease-in-out hover:text-gray-600 dark:hover:text-gray-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300 after:bg-gray-600 dark:after:bg-gray-300">
							Top Voice
						</Link>
					</div>
					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	);
}
