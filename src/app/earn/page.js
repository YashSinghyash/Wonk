'use client';

import Link from 'next/link';
import styles from './Earn.module.css';

const contests = [
  {
    id: 'orion',
    title: '48 Months to Save Orion Technologies',
    type: 'CEO Finance Simulation',
    difficulty: 'Hard',
    duration: '5–10 min',
    entryFee: '₹0 FREE',
    description: 'You are the CEO of Orion Technologies — a struggling AI infrastructure startup burning $4M per quarter. Navigate 6 brutal stages: VC negotiations, cloud partnerships, revenue crises, GPU pivots, activist investors, and a final acquisition offer. Every decision you make impacts cash, valuation, headcount, and equity. Will you IPO at $1.4B or go bankrupt in month 28?',
    stages: 6,
    players: '2,847',
    topScore: 'Legendary CEO',
  },
];

export default function EarnPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>CONTESTS</h1>
        <p className={styles.subtitle}>Enter competitive finance simulations. Prove your worth.</p>
      </header>

      <div className={styles.contestList}>
        {contests.map((contest) => (
          <div key={contest.id} className={styles.contestCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardMeta}>
                <span className={styles.typeBadge}>{contest.type}</span>
                <span className={styles.diffBadge}>{contest.difficulty}</span>
                <span className={styles.durationBadge}>⏱ {contest.duration}</span>
              </div>
              <span className={styles.entryFee}>{contest.entryFee}</span>
            </div>

            <h2 className={styles.contestTitle}>{contest.title}</h2>
            <p className={styles.contestDesc}>{contest.description}</p>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>STAGES</span>
                <span className={styles.statValue}>{contest.stages}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>PLAYERS</span>
                <span className={styles.statValue}>{contest.players}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>TOP SCORE</span>
                <span className={styles.statValue}>{contest.topScore}</span>
              </div>
            </div>

            <Link href={`/earn/contest/${contest.id}`} className={styles.startBtn}>
              START CONTEST →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
