import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { SessionProvider } from 'next-auth/react';
import { motion } from 'framer-motion';
import Layout from '../components/NavigationBar/Layout';
import Footer from '../components/Footer/Footer';
config.autoAddCss = false;

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <motion.div key={router.route} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <Component {...pageProps} />
          <Footer />
        </motion.div>
      </Layout>
    </SessionProvider>)
}

export default MyApp
