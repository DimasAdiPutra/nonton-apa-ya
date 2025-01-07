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
				sort_by: sort || undefined, // Penyortiran
				with_genres: genre || undefined, // Filter genre
			},
		})

		return response.data
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
