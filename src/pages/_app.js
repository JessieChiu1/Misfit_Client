import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import '@/styles/globals.css'
import { AuthProvider } from "../components/providers/AuthProvider"


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FluentProvider theme={teamsLightTheme}>
        <Component {...pageProps} />
      </FluentProvider>
    </AuthProvider>
  )
}
