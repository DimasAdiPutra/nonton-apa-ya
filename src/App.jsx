import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import LoadingScreen from './components/LoadingScreen'

// Lazy load untuk halaman
const HomePage = lazy(() => import('./pages/HomePage'))
const DetailsPage = lazy(() => import('./pages/DetailsPage'))

function App() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Routes>
				<Route index element={<HomePage />} /> {/* HomePage di "/" */}
				<Route path="movie/:id" element={<DetailsPage />} />
				{/* </Route> */}
			</Routes>
		</Suspense>
	)
}

export default App
