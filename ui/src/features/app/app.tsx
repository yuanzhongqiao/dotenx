import { useEffect } from 'react'
import { ReactFlowProvider } from 'react-flow-renderer'
import ReactModal from 'react-modal'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/global.css'
import { Layout } from '../ui'
import { Routes } from './routes'

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
})

export function App() {
	useEffect(() => {
		ReactModal.setAppElement('#root')
	}, [])

	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ReactFlowProvider>
					<Layout>
						<Routes />
						<ToastContainer />
					</Layout>
				</ReactFlowProvider>
			</QueryClientProvider>
		</BrowserRouter>
	)
}