import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { fetchMovieDetail } from '../utils/api'

import { motion } from 'motion/react'
import Rating from '../components/Rating'

const IMAGE_URL = import.meta.env.VITE_TMDB_IMAGE_URL

const DetailsPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [movie, setMovie] = useState(null)

	useEffect(() => {
		fetchMovieDetail(id).then(setMovie)
	}, [id])

	const closeDetail = () => {
		navigate('/')
	}

	if (!movie) return null // Loading state atau tidak ada movie.

	return (
		<motion.div
			className="hero min-h-screen w-screen"
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ type: 'spring', stiffness: 100, damping: 15 }} // Atur durasi dan efek animasi
		>
			<motion.div
				className="hero-content flex-col lg:flex-row"
				layoutId={`movie-card-${id}`}
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0 }}>
				<img
					src={`${IMAGE_URL}/${movie.poster_path}`}
					alt={movie.title}
					className="w-full max-w-sm rounded-lg shadow-2xl"
				/>
				<div>
					<h2 className="text-5xl font-bold mb-4">
						{movie.title}{' '}
						<span className="badge badge-md">{movie.adult ? '18+' : ''}</span>
					</h2>
					<div className="flex flex-wrap gap-2 mb-3">
						{movie.genres.map((genre, index) => (
							<span
								key={index}
								className="badge badge-outline text-xs px-3 py-1">
								{genre.name}
							</span>
						))}
					</div>
					<div className="flex gap-2 items-end mb-4">
						<Rating rating={movie.vote_average / 2} />
						<span className="text-sm">{movie.vote_average}</span>
					</div>
					<p className="mb-1">
						Status : <span className="font-semibold">{movie.status}</span>
					</p>
					<p className="text-base mb-4">Release Date : {movie.release_date}</p>
					<p className="mb-4">{movie.overview}</p>
					<button
						className="btn btn-primary text-white flex items-center"
						onClick={closeDetail}>
						{/* left arrow svg */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							className="fill-white">
							<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
						</svg>
						Kembali
					</button>
				</div>
			</motion.div>
		</motion.div>
	)
}

export default DetailsPage
