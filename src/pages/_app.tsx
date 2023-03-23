import type { AppProps } from 'next/app';
import { trpc } from '@/utils/trpc';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default trpc.withTRPC(App);
