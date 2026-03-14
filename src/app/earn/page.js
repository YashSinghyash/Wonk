'use client';

import { useRouter } from 'next/navigation';
import Script from 'next/script';
import styles from './Earn.module.css';

const contests = [
  {
    id: 'orion',
    title: '48 Months to Save Orion Technologies',
    type: 'CEO Finance Simulation',
    difficulty: 'Hard',
    duration: '5–10 min',
    entryFee: '₹1',
    description: 'You are the CEO of Orion Technologies — a struggling AI infrastructure startup burning $4M per quarter. Navigate 6 brutal stages: VC negotiations, cloud partnerships, revenue crises, GPU pivots, activist investors, and a final acquisition offer. Every decision you make impacts cash, valuation, headcount, and equity. Will you IPO at $1.4B or go bankrupt in month 28?',
    stages: 6,
    players: '2,847',
    topScore: 'Legendary CEO',
  },
];

export default function EarnPage() {
  const router = useRouter();

  const handleStartContest = (contestId) => {
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummyKey123", // Use env variable or fallback
      amount: 100, // Amount is in currency subunits (100 paise = ₹1)
      currency: "INR",
      name: "WONK | Gamified Finance",
      description: "Contest Entry Fee",
      handler: function (response) {
        // Payment Success Handler
        console.log("Payment successful:", response);
        // Automatically route to contest after successful dummy payment
        router.push(`/earn/contest/${contestId}`);
      },
      prefill: {
        name: "WONK Trader",
        email: "trader@wonk.finance",
        contact: "9999999999"
      },
      theme: {
        color: "#000000" // B&W theme matching
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response){
      alert("Payment failed. Please try again.");
    });
    paymentObject.open();
  };

  return (
    <div className={styles.container}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              <button 
                disabled={true}
                className={styles.startBtn}
                style={{ border: 'none', cursor: 'not-allowed', width: '100%', backgroundColor: '#333', color: '#888' }}
              >
                PAY ₹1 TO ENTER (Razorpay API Approval Pending)
              </button>
              
              <button 
                onClick={() => router.push(`/earn/contest/${contest.id}`)} 
                className={styles.startBtn}
                style={{ 
                  background: 'transparent', 
                  color: 'var(--foreground)', 
                  border: '2px solid var(--foreground)', 
                  cursor: 'pointer', 
                  width: '100%' 
                }}
              >
                TEST RUN (FREE BYPASS)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
