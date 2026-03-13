import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.main}>
      <header className={styles.hero}>
        <h1 className={styles.title}>
          Dominate Finance <br />
          <span className={styles.outlineText}>Through Play</span>
        </h1>
        <p className={styles.description}>
          The world's most aggressive financial simulator. 
          Learn complex concepts, outsmart peers, and climb the leaderboard.
        </p>
        <div className={styles.cta}>
          <Link href="/learn" className="btn-primary">
            Enter Arena
          </Link>
        </div>
      </header>

      <section className={styles.features}>
        <Link href="/learn" className={styles.featureLink}>
          <div className="card">
            <h3>LEARN</h3>
            <p>Strict, unyielding lessons on trading, corporate finance, and wealth destruction prevention.</p>
          </div>
        </Link>
        <Link href="/earn" className={styles.featureLink}>
          <div className="card">
            <h3>EARN</h3>
            <p>Execute flawlessly to earn WONK tokens. Second place is first loser.</p>
          </div>
        </Link>
        <Link href="/play" className={styles.featureLink}>
          <div className="card">
            <h3>PLAY</h3>
            <p>Compete in the Boardroom or Self Lab to claim your spot at the top.</p>
          </div>
        </Link>
      </section>
    </div>
  );
}
