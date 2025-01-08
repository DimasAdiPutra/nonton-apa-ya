const MovieCard = ({ poster, title, releaseDate, popularity, genres }) => {
	return (
		<div className="card bg-neutral w-full shadow-xl max-w-sm h-full min-h-[650px] justify-center">
			<figure className="px-10 pt-10">
				<img src={poster} alt={title} className="rounded-xl" />
			</figure>
			<div className="card-body flex-grow-0">
				<h2 className="card-title">{title}</h2>
				<p className="text-sm text-gray-700">{releaseDate}</p>
				<p className="text-sm text-gray-700">Popularity: {popularity}</p>
				<div className="flex flex-wrap gap-2 mb-3">
					{genres.map((genre, index) => (
						<span key={index} className="badge badge-outline text-xs px-3 py-1">
							{genre}
						</span>
					))}
				</div>
				<div className="card-actions">
					<button className="btn btn-accent text-base-100">Details</button>
				</div>
			</div>
		</div>
	)
}

export default MovieCard
