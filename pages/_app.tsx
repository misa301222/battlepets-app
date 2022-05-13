import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from 'next-auth/react';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Layout from '../components/NavigationBar/Layout';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>)
}

export default MyApp
