"use client";

import { FaDiscord } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
	return (
		<nav
			className="fixed top-0 w-full transition-all duration-300 ease-in-out
      bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50 
      border-b border-black/20 dark:border-black/80"
		>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-2">
					<FaDiscord className="text-2xl text-gray-700 dark:text-gray-300 transition-colors duration-300" />
					<span className="text-xl font-bold transition-colors duration-300">
						MS Discord
					</span>
				</div>
				<div className="flex items-center space-x-6">
					<div className="hidden md:flex space-x-6">
						{["About", "Our Journey", "Rules", "Events", "Join Us"].map(
							(item) => (
								<a
									key={item}
									href={`#${item.toLowerCase().replace(" ", "-")}`}
									className="transition-all duration-300 ease-in-out
                  hover:text-gray-600 dark:hover:text-gray-300
                  relative after:absolute after:bottom-0 after:left-0 after:h-0.5
                  after:w-0 hover:after:w-full after:transition-all after:duration-300
                  after:bg-gray-600 dark:after:bg-gray-300"
								>
									{item}
								</a>
							),
						)}
					</div>
					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	);
}
