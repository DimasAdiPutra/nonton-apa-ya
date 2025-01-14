const Header = ({ backgroundImage }) => {
	return (
		<header
			className="hero min-h-screen text-base-100 relative after:absolute after:top-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-50 flex flex-col justify-center items-center"
			style={{ backgroundImage: `url(${backgroundImage})` }}>
			<h1 className="text-4xl font-semibold mb-6 relative z-10">
				Nonton Apa Ya?
			</h1>
			<p className="mb-14 relative z-10">
				Cari dan temukan film yang kamu mau!
			</p>
			<a
				href="#main"
				className="btn btn-primary text-base-100 w-max z-20 cursor-pointer">
				Lihat yuk!
			</a>

			{/* Wave Svg */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				className="w-full absolute bottom-0 z-10">
				<path
					fill="#fff"
					fillOpacity="1"
					d="M0,128L18.5,138.7C36.9,149,74,171,111,181.3C147.7,192,185,192,222,170.7C258.5,149,295,107,332,122.7C369.2,139,406,213,443,256C480,299,517,309,554,293.3C590.8,277,628,235,665,208C701.5,181,738,171,775,176C812.3,181,849,203,886,218.7C923.1,235,960,245,997,218.7C1033.8,192,1071,128,1108,117.3C1144.6,107,1182,149,1218,176C1255.4,203,1292,213,1329,197.3C1366.2,181,1403,139,1422,117.3L1440,96L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path>
			</svg>
		</header>
	)
}

export default Header
