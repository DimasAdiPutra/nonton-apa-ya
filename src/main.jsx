import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Import yang benar
import './index.css'
import App from './App.jsx'

// Membuat instansi QueryClient
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			{/* Membungkus aplikasi dengan QueryClientProvider */}
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
)
