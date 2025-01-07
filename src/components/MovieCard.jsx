const MovieCard = ({ poster, title }) => {
	return (
		<div className="card bg-neutral w-full shadow-xl max-w-sm min-h-[650px] justify-center">
			<figure className="px-10 pt-10">
				<img src={poster} alt={title} className="rounded-xl" />
			</figure>
			<div className="card-body items-center text-center flex-grow-0">
				<h2 className="card-title">{title}</h2>
				<div className="card-actions">
					<button className="btn btn-accent text-base-100">Details</button>
				</div>
			</div>
		</div>
	)
}

export default MovieCard
