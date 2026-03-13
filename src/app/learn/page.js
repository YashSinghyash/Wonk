'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isCompleted } from '@/lib/activityTracker';
import styles from './Learn.module.css';

const topics = [
  {
    id: 'stoploss',
    title: 'StopLoss',
    description: 'Learn how to protect your capital using Stop Loss orders in a simulated trading environment.',
    method: 'Self Lab',
    path: '/learn/stoploss',
    level: 'Beginner',
    unlocked: true,
  },
  {
    id: 'delivery',
    title: 'Delivery Orders',
    description: 'The foundation of long-term investing and wealth building. Understand cash and carry trades.',
    method: 'Both',
    path: '/learn/delivery',
    level: 'Beginner',
    unlocked: true,
  },
  {
    id: 'intraday',
    title: 'Intraday Trading',
    description: 'High-speed execution. Zero overnight risk. Master the art of day trading and short selling.',
    method: 'Boardroom',
    path: '/learn/intraday',
    level: 'Advanced',
    unlocked: true,
  },
  {
    id: 'candlestick',
    title: 'Candlestick Patterns',
    description: 'Master 11 essential candlestick patterns — from Doji and Hammer to Morning Star and Three Black Crows.',
    method: 'Simulator',
    path: '/learn/candlestick',
    level: 'Intermediate',
    unlocked: true,
  },
  {
    id: 'capital-budgeting',
    title: 'Capital Budgeting',
    description: 'Take the hot seat as a CFO and decide which projects to fund based on NPV and IRR.',
    method: 'Boardroom',
    path: '#',
    level: 'Advanced',
    unlocked: false,
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    description: 'Master the art of balancing risk and reward in complex financial scenarios.',
    method: 'Both',
    path: '#',
    level: 'Intermediate',
    unlocked: false,
  },
];

export default function LearnPage() {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const map = {};
    topics.forEach(t => {
      map[t.id] = isCompleted(t.id);
    });
    setCompleted(map);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Training Grounds</h1>
        <p>Choose your discipline. Master the simulation.</p>
      </header>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <div key={topic.id} className={`card ${!topic.unlocked ? styles.lockedCard : ''}`}>
            <div className={styles.cardTop}>
              <div className={styles.tag}>{topic.method}</div>
              <div className={styles.cardTopRight}>
                {completed[topic.id] && <span className={styles.completedBadge}>✓ DONE</span>}
                <div className={styles.level}>[ {topic.level.toUpperCase()} ]</div>
              </div>
            </div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <Link href={topic.path} className={styles.link}>
              {completed[topic.id] ? 'Review >' : topic.unlocked ? 'Start >' : 'Locked'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
