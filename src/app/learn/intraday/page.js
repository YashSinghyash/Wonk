'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logActivity, markCompleted } from '@/lib/activityTracker';
import styles from '../Article.module.css';

export default function IntradayPage() {
  useEffect(() => {
    markCompleted('intraday');
    logActivity('learn', 'Read: Intraday Trading', 'Completed the Intraday Trading article');
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Intraday Trading</h1>
        <p>High-speed execution. Zero overnight risk.</p>
      </header>

      <article className={styles.content}>
        <h2>What is Intraday Trading?</h2>
        <p>Intraday trading, also known as day trading, involves buying and selling stocks within the same trading day. All positions must be squared off (closed) before the market closes. You do not actually take delivery of the stock.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Leverage / Margin:</strong> Brokers often provide margin, allowing you to buy more shares than your cash balance would normally permit (e.g., 5x margin).</li>
          <li><strong>Short Selling:</strong> Because you don't take delivery, you can sell shares you don't own first, aiming to buy them back later at a lower price (profiting from a falling market).</li>
          <li><strong>Squaring Off:</strong> If you do not close your position before the market closes, the broker's system will automatically auto-square it off.</li>
          <li><strong>No Overnight Risk:</strong> You are completely shielded from market gap-ups or gap-downs the following morning.</li>
        </ul>

        <h2>The Reality of Intraday</h2>
        <p>Intraday trading requires extreme discipline, emotional control, and a rigorous Stop Loss strategy. You are competing against high-frequency algorithms and institutional traders. It is purely speculative and high-risk.</p>

        <div className={styles.cta}>
          <Link href="/simulator">PRACTICE IN SIMULATOR</Link>
        </div>
      </article>
    </div>
  );
}
