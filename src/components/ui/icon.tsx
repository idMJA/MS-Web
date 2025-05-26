interface IconProps extends React.SVGProps<SVGSVGElement> {
	d: string;
	viewBox?: string;
	title?: string;
}

export function Icon({
	d,
	viewBox = "0 0 24 24",
	title = "icon",
	...props
}: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox}
			fill="currentColor"
			aria-label={title}
			role="img"
			{...props}
		>
			<title>{title}</title>
			<path d={d} />
		</svg>
	);
}
