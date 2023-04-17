import Game from '@/components/Game';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>Pair Up!</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <main className={styles.main}>
        <Game/>
      </main>
    </>
  )
}
