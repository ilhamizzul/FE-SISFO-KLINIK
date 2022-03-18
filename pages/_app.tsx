import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import GlobalStore from '../redux/globalStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={GlobalStore}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </>
  )
}

export default MyApp
