const FilterAndSortModal = ({
	isModalOpen,
	onApply,
	onCancel,
	sortOptions,
	selectedSort,
	selectedGenre,
	onChangeSort,
	onChangeGenre,
	genres,
}) => {
	return (
		<>
			{isModalOpen && (
				<div className="modal modal-open">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Filter & Sort</h3>

						{/* Filter Section */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Genre</span>
							</label>
							<select
								className="select select-bordered w-full"
								value={selectedGenre}
								onChange={onChangeGenre}>
								<option value="all" key="all">
									All
								</option>
								{genres.map((genre) => (
									<option value={genre.id} key={genre.id}>
										{genre.name}
									</option>
								))}
							</select>
						</div>

						{/* Sort Section */}
						<div className="form-control mt-4">
							<label className="label">
								<span className="label-text">Sort By</span>
							</label>
							<select
								className="select select-bordered w-full"
								value={selectedSort}
								onChange={onChangeSort}>
								{sortOptions.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>

						{/* Actions */}
						<div className="modal-action">
							<button className="btn" onClick={onCancel}>
								Cancel
							</button>
							<button
								className="btn btn-primary text-base-100"
								onClick={() => {
									onApply() // Close modal after applying filters
								}}>
								Apply
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default FilterAndSortModal
