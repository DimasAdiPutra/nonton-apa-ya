import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// Ambil Film berdasarkan query, sort dan genre
export const fetchMovies = async ({
	query = '',
	sort = '',
	page = 1,
	genre = '',
} = {}) => {
	try {
		const endpoint = query
			? `${BASE_URL}/search/movie`
			: `${BASE_URL}/discover/movie`

		const response = await axios.get(endpoint, {
			params: {
				api_key: API_KEY,
				language: 'id-ID',
				page,
				query: query || undefined, // Kata kunci pencarian
				sort_by: query ? undefined : sort || undefined, // Penyortiran
				with_genres: query ? undefined : genre || undefined, // Filter genre hanya untuk discover
			},
		})

		let tempResults = response.data.results

		// Filter hasil secara manual jika menggunakan query dan genre
		if (query && genre) {
			tempResults = tempResults.filter((movie) =>
				movie.genre_ids.includes(Number(genre))
			)
		}

		if (query && sort) {
			if (sort === 'popularity.desc') {
				tempResults = tempResults.sort((a, b) => b.popularity - a.popularity)
			} else if (sort === 'popularity.asc') {
				tempResults = tempResults.sort((a, b) => a.popularity - b.popularity)
			} else if (sort === 'release_date.desc') {
				tempResults = tempResults.sort(
					(a, b) => new Date(b.release_date) - new Date(a.release_date)
				)
			} else if (sort === 'release_date.asc') {
				tempResults = tempResults.sort(
					(a, b) => new Date(a.release_date) - new Date(b.release_date)
				)
			} else if (sort === 'vote_average.desc') {
				tempResults = tempResults.sort(
					(a, b) => b.vote_average - a.vote_average
				)
			} else if (sort === 'vote_average.asc') {
				tempResults = tempResults.sort(
					(a, b) => a.vote_average - b.vote_average
				)
			}
		}

		return { ...response.data, results: tempResults }
	} catch (error) {
		console.error('Error fetching movies:', error)
		throw error
	}
}

export const getGenres = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
			params: {
				api_key: API_KEY,
				language: 'id-ID', // Bisa diganti ke 'en-US' untuk bahasa Inggris
			},
		})
		return response.data.genres // Mengembalikan array genre
	} catch (error) {
		console.error('Error fetching genres:', error)
		return []
	}
}
