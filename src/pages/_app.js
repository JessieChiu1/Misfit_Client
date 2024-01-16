import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import '@/styles/globals.css'
import { AuthProvider } from "../components/providers/AuthProvider"
import { MessageProvider } from '@/components/providers/MessageProvider'


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FluentProvider theme={teamsLightTheme}>
        <MessageProvider>
          <Component {...pageProps} />
        </MessageProvider>
      </FluentProvider>
    </AuthProvider>
  );
}
