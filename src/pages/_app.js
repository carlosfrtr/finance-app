// pages/_app.js
import '../styles/globals.css'; // Estilos globais
import Header from '../components/header';
import Footer from '../components/footer';

import { MemberProvider } from '../contexts/member-provider';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
        <MemberProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </MemberProvider>
    </>
  );
}
