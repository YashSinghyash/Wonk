'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span>WONK</span>
        </Link>
        <div className={styles.links}>
          <Link href="/learn" className={`nav-link ${pathname?.startsWith('/learn') ? styles.activeLink : ''}`}>Learn</Link>
          <Link href="/earn" className={`nav-link ${pathname?.startsWith('/earn') ? styles.activeLink : ''}`}>Earn</Link>
          <Link href="/play" className={`nav-link ${pathname?.startsWith('/play') ? styles.activeLink : ''}`}>Play</Link>
          <Link href="/simulator" className={`nav-link ${pathname?.startsWith('/simulator') ? styles.activeLink : ''}`}>Simulator</Link>
        </div>
        <div className={styles.actions}>
          <Link href="/profile" className={styles.profileBtn}>
            <span className={styles.profileIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            PROFILE
          </Link>
        </div>
      </div>
    </nav>
  );
}
