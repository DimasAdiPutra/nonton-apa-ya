import { Outlet } from 'react-router'
import PageWrapper from '../components/PageWrapper'

const DefaultLayouts = () => {
	return (
		<PageWrapper>
			<Outlet /> {/* Render halaman di dalam layout */}
		</PageWrapper>
	)
}

export default DefaultLayouts
