'use client';

import Link from 'next/link';
import styles from '../Article.module.css';

export default function DeliveryPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Delivery Orders</h1>
        <p>The foundation of long-term investing and wealth building.</p>
      </header>

      <article className={styles.content}>
        <h2>What is a Delivery Order?</h2>
        <p>A delivery order (or "cash and carry") is the most straightforward way to buy stocks. When you place a delivery order, you pay the full price for the shares upfront, and they are electronically deposited into your demat account.</p>
        
        <h2>Key Characteristics</h2>
        <ul>
          <li><strong>Ownership:</strong> You actually own the shares and intend to hold them for more than one day.</li>
          <li><strong>No Leverage:</strong> You must have 100% of the funds available to buy the stock. You cannot borrow money from your broker for delivery trades.</li>
          <li><strong>Time Horizon:</strong> Held for days, months, or years.</li>
          <li><strong>Corporate Actions:</strong> As a shareholder, you are entitled to dividends, bonuses, stock splits, and voting rights.</li>
        </ul>

        <h2>When to Use Delivery</h2>
        <p>Delivery is meant for investing rather than pure speculation. Use delivery orders when you have researched a company, believe in its long-term fundamentals, and expect its value to grow over time regardless of short-term market noise.</p>

        <div className={styles.cta}>
          <Link href="/simulator">PRACTICE IN SIMULATOR</Link>
        </div>
      </article>
    </div>
  );
}
