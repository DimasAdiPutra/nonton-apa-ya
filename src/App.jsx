import { AnimatePresence } from 'motion/react'
import DefaultLayouts from './layouts/DefaultLayouts'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import { Route, Routes } from 'react-router'

function App() {
	return (
		<AnimatePresence mode="wait">
			<Routes>
				{/* DefaultLayout sebagai parent route */}
				<Route path="/" element={<DefaultLayouts />}>
					<Route index element={<HomePage />} /> {/* HomePage di "/" */}
					<Route path="movie/:id" element={<DetailsPage />} />
				</Route>
			</Routes>
		</AnimatePresence>
	)
}

export default App
