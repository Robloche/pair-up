import ClientOnly from '@/components/ClientOnly';
import Game from '@/components/Game';
import Head from 'next/head';
import SettingsProvider from '@/providers/SettingsProvider';
import { clearSettings } from '@/helpers/settings';
import styles from '@/styles/Home.module.css';

if (typeof window !== 'undefined' && window.location.search.indexOf('?reset') > -1) {
  // Reset settings
  clearSettings();
}

const Home = () => {
  return (
    <>
      <Head>
        <title>Pair Up!</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <SettingsProvider>
          <ClientOnly className={styles.clientOnly}>
            <Game />
          </ClientOnly>
        </SettingsProvider>
      </main>
    </>
  );
};

export default Home;
