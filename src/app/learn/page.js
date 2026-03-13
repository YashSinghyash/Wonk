import Link from 'next/link';
import styles from './Learn.module.css';
const topics = [
  {
    id: 1,
    title: 'StopLoss',
    description: 'Learn how to protect your capital using Stop Loss orders in a simulated trading environment.',
    method: 'Self Lab',
    path: '/learn/stoploss',
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Delivery Orders',
    description: 'The foundation of long-term investing and wealth building. Understand cash and carry trades.',
    method: 'Both',
    path: '/learn/delivery',
    level: 'Beginner'
  },
  {
    id: 3,
    title: 'Intraday Trading',
    description: 'High-speed execution. Zero overnight risk. Master the art of day trading and short selling.',
    method: 'Boardroom',
    path: '/learn/intraday',
    level: 'Advanced'
  },
  {
    id: 5,
    title: 'Capital Budgeting',
    description: 'Take the hot seat as a CFO and decide which projects to fund based on NPV and IRR.',
    method: 'Boardroom',
    path: '#',
    level: 'Advanced'
  },
  {
    id: 6,
    title: 'Risk Management',
    description: 'Master the art of balancing risk and reward in complex financial scenarios.',
    method: 'Both',
    path: '#',
    level: 'Intermediate'
  }
];

export default function LearnPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Training Grounds</h1>
        <p>Choose your discipline. Master the simulation.</p>
      </header>

      <div className={styles.grid}>
        {topics.map((topic) => (
          <div key={topic.id} className="card">
            <div className={styles.tag}>{topic.method}</div>
            <div className={styles.level}>[ {topic.level.toUpperCase()} ]</div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <Link href={topic.path} className={styles.link}>
              {topic.title === 'StopLoss' ? 'Initialize Sim >' : 'Locked'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
