import '../../styles/globals.css'; // ←ここを相対パスに変更

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
