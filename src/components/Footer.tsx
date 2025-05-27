"use client";

export default function Footer() {
	return (
		<footer
			className="py-8 transition-all duration-300 ease-in-out
	  border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
		>
			<div className="container mx-auto px-4 text-center">
				<p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
					© 2021-{new Date().getFullYear()} MS. All rights reserved.
				</p>
				<p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
					Made by{" "}
					<a
						href="https://mjba.my"
						className="relative text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300
							after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
					>
						アーリャ
					</a>{" "}
					using{" "}
					<a
						href="https://nextjs.org"
						className="relative text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300
							after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
					>
						Next.js
					</a>{" "}
					and{" "}
					<a
						href="https://tailwindcss.com"
						className="relative text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300
							after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full"
					>
						Tailwind CSS
					</a>
				</p>
			</div>
		</footer>
	);
}
