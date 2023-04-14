import "@/styles/globals.css"
import { AppContextProvider } from "@/web/components/AppContext"

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}
