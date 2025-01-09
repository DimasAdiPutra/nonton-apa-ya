import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'
import FilterAndSortModal from '../components/FilterAndSortModal'
import { fetchMovies, getGenres } from '../utils/api'

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL

/**
 * HomePage component responsible for displaying a list of movies and a filter modal.
 * It fetches movie data from an API using TanStack Query and handles user filters like sorting and genre selection.
 */
const HomePage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false) // State for controlling the filter modal visibility
	const [genres, setGenres] = useState([]) // State for storing the genre list fetched from the API

	const [selectedSort, setSelectedSort] = useState('popularity.desc') // State for the selected sorting option
	const [pendingSort, setPendingSort] = useState(selectedSort) // State for temporarily storing the pending sort option

	const [selectedGenre, setSelectedGenre] = useState('all') // State for the selected genre
	const [pendingGenre, setPendingGenre] = useState(selectedGenre) // State for temporarily storing the pending genre

	const [searchQuery, setSearchQuery] = useState('') // State for the search query input by the user

	// eslint-disable-next-line no-unused-vars
	const [page, setPage] = useState(1)

	// Fetch genres from the API on component mount
	const fetchGenres = async () => {
		const data = await getGenres()
		setGenres(data)
	}

	useEffect(() => {
		fetchGenres() // Fetch genres when the component mounts
	}, [])

	/**
	 * Fetch movie data using TanStack Query based on selected filters and search query.
	 * - queryKey: A unique key for the query which includes the selected filters and search query.
	 * - queryFn: The function that fetches the movie data based on the provided filters.
	 * - onSuccess: Runs when the data is successfully fetched, updating the background image.
	 */
	const {
		data: movieData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['movies', selectedSort, selectedGenre, searchQuery],
		queryFn: async () =>
			await fetchMovies({
				query: searchQuery !== '' ? searchQuery : undefined,
				sort: selectedSort,
				genre: selectedGenre !== 'all' ? selectedGenre : undefined,
			}),
		enabled: true,
	})

	// Query terpisah untuk mengambil backdrop film pertama (jika ada)
	const { data: backgroundImage } = useQuery({
		queryKey: ['backgroundImage', page],
		queryFn: async () => {
			const backgroundImageTemp = await fetchMovies({
				page,
			})

			if (backgroundImageTemp.results.length > 0) {
				return `${IMAGE_URL}/${backgroundImageTemp.results[0].backdrop_path}`
			}
		},
	})

	/**
	 * Applies the selected filters (genre and sort) when the user clicks "Apply" in the filter modal.
	 */
	const handleApplyFilters = () => {
		setSelectedGenre(pendingGenre)
		setSelectedSort(pendingSort)
		setIsModalOpen(false) // Close the modal after applying the filters
	}

	// Sort options for the modal
	const sortOptions = [
		{ value: 'popularity.desc', label: 'Paling Popular' },
		{ value: 'popularity.asc', label: 'Kurang Popular' },
		{ value: 'release_date.desc', label: 'Yang Terbaru' },
		{ value: 'release_date.asc', label: 'Yang Terlama' },
	]

	return (
		<>
			{/* Header Section */}
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
			</header>

			{/* Main Content Section */}
			<main className="pt-20">
				<div className="join flex w-full justify-center mb-10">
					<label className="join-item input input-bordered flex items-center gap-2">
						<input
							type="text"
							className="grow"
							placeholder="Search"
							onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
						/>
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
					<button
						className="join-item btn btn-accent"
						onClick={() => setIsModalOpen(true)}>
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

				{/* Filter Modal */}
				<FilterAndSortModal
					isModalOpen={isModalOpen}
					onApply={handleApplyFilters}
					onCancel={() => setIsModalOpen(false)}
					sortOptions={sortOptions} // Passing sort options to the modal
					selectedSort={pendingSort}
					selectedGenre={pendingGenre}
					onChangeSort={(e) => setPendingSort(e.target.value)}
					onChangeGenre={(e) => setPendingGenre(e.target.value)}
					genres={genres}
				/>

				{/* Movie Cards */}
				<div className="px-4 flex flex-wrap gap-6 justify-center items-stretch">
					{error ? (
						<div className="w-full flex justify-center items-center py-10">
							<p>Error loading movies: {error.message}</p>
						</div>
					) : isLoading ? (
						<div className="w-full flex justify-center items-center py-10">
							<p>Loading movies...</p>
						</div>
					) : (
						movieData?.results?.map((movie) => {
							const movieGenres = movie.genre_ids
								.map((id) => genres.find((genre) => genre.id === id)?.name)
								.filter(Boolean)

							return (
								<MovieCard
									title={movie.title}
									poster={`${IMAGE_URL}/${movie.poster_path}`}
									releaseDate={movie.release_date}
									popularity={((movie.popularity / 5000) * 100).toFixed(2)}
									genres={movieGenres}
									key={movie.id}
								/>
							)
						})
					)}
				</div>
			</main>
		</>
	)
}

export default HomePage
