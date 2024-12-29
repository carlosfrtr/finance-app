import Link from "next/link";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="p-4 bg-gray-200">
        <Link href="/" className="mr-4">Dashboard</Link>
        <Link href="/register" className="mr-4">Cadastrar Membro</Link>
      </nav>
      <Component {...pageProps} />
    </div>
  );
}
