import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react';
import Nav from '../components/ui/Nav';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return( 
    <SessionProvider session={session} >
    <Nav>
    <Component {...pageProps} />
    </Nav>
    </SessionProvider>
    )
}

export default MyApp
