import { useState, useEffect, useCallback, useRef } from 'react'

// Components
import MovieCard from '../components/MovieCard'
import FilterAndSortModal from '../components/FilterAndSortModal'

// Utilities
import { fetchMovies, getGenres } from '../utils/api'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

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

	return (
		<>
			{/* Header */}
			<Header backgroundImage={backgroundImage} />

			{/* Main */}
			<main id="main" className="pt-20 scroll-smooth">
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
						// set max popularity ambil dari movie paling populer

						// Mapping genre_ids ke nama genre
						const movieGenres = movie.genre_ids
							.map((id) => genres.find((genre) => genre.id === id)?.name)
							.filter(Boolean) // Hapus undefined jika id tidak cocok

						movie.poster = `${IMAGE_URL}/${movie.poster_path}`

						return (
							<MovieCard movie={movie} genres={movieGenres} key={movie.id} />
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
			<Footer />
		</>
	)
}

export default HomePage
