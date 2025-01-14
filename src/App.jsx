import { Route, Routes, useLocation } from 'react-router'

import DetailsPage from './pages/DetailsPage'
import { lazy } from 'react'
import { Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import { AnimatePresence } from 'motion/react'

// Lazy load halaman
const HomePage = lazy(() => import('./pages/HomePage'))

function App() {
	const location = useLocation()

	return (
		<Suspense fallback={<LoadingScreen /> /* Placeholder kosong */}>
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					{/* HomePage */}
					<Route index element={<HomePage />} />
					{/* DetailsPage */}
					<Route path="/movie/:id" element={<DetailsPage />} />
				</Routes>
			</AnimatePresence>
		</Suspense>
	)
}

export default App
