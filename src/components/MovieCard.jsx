import { useNavigate } from 'react-router'

import { motion } from 'motion/react'
import Rating from './Rating'

const MovieCard = ({ movie, genres }) => {
	const navigate = useNavigate()

	return (
		<motion.div
			className="card bg-neutral w-full shadow-xl max-w-sm h-full min-h-[650px] justify-end cursor-pointer"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			onClick={() => navigate(`/movie/${movie.id}`)}>
			<figure className="px-10 pt-10">
				<img src={movie.poster} alt={movie.title} className="rounded-xl" />
			</figure>
			<div className="card-body flex-grow-0">
				<h2 className="card-title">{movie.title}</h2>
				<p className="text-sm text-gray-700">{movie.releaseDate}</p>
				{/* <p className="text-sm text-gray-700">Popularity: {popularity}</p> */}
				<div className="flex gap-2 items-end mb-4">
					<Rating rating={movie.vote_average / 2} />
					<span className="text-sm">{movie.vote_average}</span>
				</div>
				<div className="flex flex-wrap gap-2 mb-3">
					{genres.map((genre, index) => (
						<span key={index} className="badge badge-outline text-xs px-3 py-1">
							{genre}
						</span>
					))}
				</div>
				<div className="card-actions">
					<button
						onClick={() => navigate(`/movie/${movie.id}`)}
						className="btn btn-accent text-base-100">
						Details
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default MovieCard
