import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>WONK</span>
        </Link>
        <div className={styles.links}>
          <Link href="/learn" className="nav-link">Learn</Link>
          <Link href="/earn" className="nav-link">Earn</Link>
          <Link href="/play" className="nav-link">Play</Link>
          <Link href="/simulator" className="nav-link">Simulator</Link>
        </div>
        <div className={styles.actions}>
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
}
