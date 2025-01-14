// Star.js
const Star = ({ filled, half }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={filled ? 'currentColor' : 'none'}
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			className={`w-6 h-6 ${filled || half ? 'text-success' : 'text-default'}`}>
			{half ? (
				<path
					d="M11.998 4.665L10.49 9.103a1 1 0 01-.754.642l-4.603.669 3.333 3.248a1 1 0 01.288.885l-.788 4.59 4.125-2.167a1 1 0 01.931 0l4.125 2.167-.788-4.59a1 1 0 01.288-.885l3.333-3.248-4.603-.669a1 1 0 01-.754-.642L12.002 4.665z"
					fill="currentColor"
				/>
			) : (
				<path
					d="M11.998 4.665L10.49 9.103a1 1 0 01-.754.642l-4.603.669 3.333 3.248a1 1 0 01.288.885l-.788 4.59 4.125-2.167a1 1 0 01.931 0l4.125 2.167-.788-4.59a1 1 0 01.288-.885l3.333-3.248-4.603-.669a1 1 0 01-.754-.642L12.002 4.665z"
					fill={filled ? 'currentColor' : 'none'}
				/>
			)}
		</svg>
	)
}

export default Star
