import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react';
import Nav from '../components/ui/Nav';
import Layout from '../layout/layout';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return( 
    <SessionProvider session={session} >
    <Layout>
    <Component {...pageProps} />
    </Layout>
    </SessionProvider>
    )
}

export default MyApp
