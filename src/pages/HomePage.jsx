import { useState, useEffect, useCallback, useRef } from 'react'

// Components
import MovieCard from '../components/MovieCard'
import FilterAndSortModal from '../components/FilterAndSortModal'

// Utilities
import { fetchMovies, getGenres } from '../utils/api'

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL

const HomePage = () => {
	// Background Image untuk hero section
	const [backgroundImage, setBackgroundImage] = useState('')

	// Infinite Scroll
	const [page, setPage] = useState(1)
	const observer = useRef() // Ref untuk Intersection Observer

	// total page dari movie
	const [totalPages, setTotalPages] = useState(2)

	// Status modal
	const [isModalOpen, setIsModalOpen] = useState(false)

	// Simpan movies
	const [movies, setMovies] = useState([])

	// Genre
	const [genres, setGenres] = useState([])

	// Sort option yang tersedia
	const [sortOptions] = useState([
		{ value: 'popularity.desc', label: 'Most Popular' },
		{ value: 'popularity.asc', label: 'Least Popular' },
		{ value: 'release_date.desc', label: 'Newest' },
		{ value: 'release_date.asc', label: 'Oldest' },
		{ value: 'vote_average.desc', label: 'Highest Rated' },
		{ value: 'vote_average.asc', label: 'Lowest Rated' },
	])

	// Sort dan Genre yang dipilih
	const [selectedSort, setSelectedSort] = useState('popularity.desc')
	const [pendingSort, setPendingSort] = useState(selectedSort)
	const [selectedGenre, setSelectedGenre] = useState('all')
	const [pendingGenre, setPendingGenre] = useState(selectedGenre)

	// Search Query
	const [searchQuery, setSearchQuery] = useState('')

	// Loading dan Error
	const [loading, setLoading] = useState(false)

	// Set background image untuk hero section
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const data = await fetchMovies({ page: 1 })
				if (data.results.length > 0) {
					setBackgroundImage(`${IMAGE_URL}/${data.results[0].backdrop_path}`)
				}
			} catch (error) {
				console.error('Failed to fetch initial data:', error)
			}
		}
		fetchInitialData()
	}, [])

	// Function to open modal
	const openModal = () => setIsModalOpen(true)

	// Function to close modal
	const closeModal = () => setIsModalOpen(false)

	// Ambil movies
	const fetchMoviesList = useCallback(async () => {
		setLoading(true)
		try {
			const data = await fetchMovies({
				query: searchQuery !== '' ? searchQuery : undefined,
				page,
				sort: selectedSort,
				genre: selectedGenre !== 'all' ? selectedGenre : '',
			})

			// Update totalPages dari respons API
			setTotalPages(data.total_pages)

			// Cegah duplikasi dengan filter berdasarkan `id`
			setMovies((prevMovies) => {
				if (page > 1) {
					const newMovies = data.results.filter(
						(newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
					)
					return [...prevMovies, ...newMovies]
				}
				return data.results
			})
		} catch (error) {
			console.error('Failed to fetch movies:', error)
		} finally {
			setLoading(false)
		}
	}, [page, searchQuery, selectedSort, selectedGenre])

	// Ambil genres
	const fetchGenres = async () => {
		try {
			const data = await getGenres()
			setGenres(data)
		} catch (error) {
			console.error('Failed to fetch genres:', error)
		}
	}

	useEffect(() => {
		fetchGenres()
	}, [])

	useEffect(() => {
		fetchMoviesList()
	}, [fetchMoviesList])

	useEffect(() => {
		// Reset daftar film dan halaman saat filter berubah
		setMovies([])
		setPage(1)
	}, [searchQuery, selectedGenre, selectedSort])

	const handleApplyFilters = () => {
		setSelectedGenre(pendingGenre)
		setSelectedSort(pendingSort)
		setIsModalOpen(false)
	}

	// Handle Observer
	useEffect(() => {
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !loading && page < totalPages) {
					console.log('footer')
					setPage((prevPage) => prevPage + 1)
				}
			},
			{ threshold: 0.5 }
		)

		const sentinel = document.getElementById('sentinel')
		if (sentinel) {
			observer.current.observe(sentinel)
		}

		return () => {
			if (sentinel) observer.current.unobserve(sentinel)
		}
	}, [loading, page, totalPages])

	// mengubah Popularity jadi base 100
	const max_popularity = 5000

	return (
		<>
			{/* Header */}
			<header
				className="hero min-h-screen text-base-100 relative after:absolute after:top-0 after:right-0 after:w-full after:h-full after:bg-black after:opacity-50 flex flex-col justify-center items-center"
				style={{ backgroundImage: `url(${backgroundImage})` }}>
				<h1 className="text-4xl font-semibold mb-6 relative z-10">
					Nonton Apa Ya?
				</h1>
				<p className="mb-14 relative z-10">
					Cari dan temukan film yang kamu mau!
				</p>
				<a className="btn btn-primary text-base-100 w-max z-10">Lihat yuk!</a>

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

			{/* Main */}
			<main className="pt-20">
				{/* Search and filter */}
				<div className="join flex w-full justify-center mb-10">
					{/* Search Input */}
					<label className="join-item input input-bordered flex items-center gap-2">
						<input
							type="text"
							className="grow"
							placeholder="Search"
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{/* Search SVG */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="h-4 w-4 opacity-70">
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</label>
					{/* Filter Button */}
					<button className="join-item btn btn-accent" onClick={openModal}>
						{/* Filter SVG */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#fff">
							<path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
						</svg>
					</button>
				</div>

				{/* Modal */}
				<FilterAndSortModal
					isModalOpen={isModalOpen}
					onApply={handleApplyFilters}
					onCancel={closeModal}
					sortOptions={sortOptions}
					selectedSort={pendingSort}
					selectedGenre={pendingGenre}
					onChangeSort={(e) => setPendingSort(e.target.value)}
					onChangeGenre={(e) => setPendingGenre(e.target.value)}
					genres={genres}
				/>

				{/* Cards */}
				<div className="px-4 flex flex-wrap gap-6 justify-center items-stretch">
					{/* Card */}
					{movies.map((movie) => {
						// Mapping genre_ids ke nama genre
						const movieGenres = movie.genre_ids
							.map((id) => genres.find((genre) => genre.id === id)?.name)
							.filter(Boolean) // Hapus undefined jika id tidak cocok

						return (
							<MovieCard
								title={movie.title}
								poster={`${IMAGE_URL}/${movie.poster_path}`}
								releaseDate={movie.release_date}
								popularity={((movie.popularity / max_popularity) * 100).toFixed(
									2
								)}
								genres={movieGenres}
								key={movie.id}
							/>
						)
					})}
				</div>
				{page >= totalPages && (
					<p className="my-6 font-montserrat text-lg text-center">
						You&#39;ve reached the end of the list.
					</p>
				)}
				{loading && (
					<p className="my-6 font-montserrat text-lg text-center">Loading...</p>
				)}
			</main>

			{/* Footer dan Sentinel */}
			<footer
				id="sentinel"
				className="w-full h-20 bg-primary text-white flex items-center justify-center">
				<p>&copy; 2025 MovieApp. All rights reserved.</p>
			</footer>
		</>
	)
}

export default HomePage
