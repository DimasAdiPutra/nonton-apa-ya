// Rating.js
import Star from './Star'

const Rating = ({ rating, maxRating = 5 }) => {
	const stars = []

	for (let i = 1; i <= maxRating; i++) {
		if (i <= Math.floor(rating)) {
			stars.push(<Star key={i} filled />)
		} else if (i === Math.round(rating) && rating % 1 !== 0) {
			stars.push(<Star key={i} half />)
		} else {
			stars.push(<Star key={i} />)
		}
	}

	return <div className="flex space-x-1">{stars}</div>
}

export default Rating
