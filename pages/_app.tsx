import '../src/styles/globals.scss'
import '../src/styles/styles.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import UserDatas from '../src/context/UserDatas'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserDatas>
        <Component {...pageProps} />
      </UserDatas>
    </Provider>
  )
}
