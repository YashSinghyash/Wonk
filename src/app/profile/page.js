'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getActivityLog, clearAllData, getCompleted } from '@/lib/activityTracker';
import styles from './Profile.module.css';

const typeIcons = {
  learn: '📖',
  play: '🎮',
  earn: '💰',
  simulator: '📊',
};

const typeColors = {
  learn: '#4ade80',
  play: '#fbbf24',
  earn: '#60a5fa',
  simulator: '#a78bfa',
};

export default function ProfilePage() {
  const [activities, setActivities] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setActivities(getActivityLog());
    setCompleted(getCompleted());
  }, []);

  const filtered = filter === 'all' ? activities : activities.filter(a => a.type === filter);

  const stats = {
    total: activities.length,
    learn: activities.filter(a => a.type === 'learn').length,
    play: activities.filter(a => a.type === 'play').length,
    earn: activities.filter(a => a.type === 'earn').length,
    simulator: activities.filter(a => a.type === 'simulator').length,
    completed: completed.length,
  };

  function formatTime(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.avatar}>W</div>
        <div>
          <h1>PLAYER PROFILE</h1>
          <p className={styles.subtitle}>Your activity across the WONK platform</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.total}</span>
          <span className={styles.statLabel}>TOTAL ACTIVITIES</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.completed}</span>
          <span className={styles.statLabel}>TOPICS COMPLETED</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.learn}</span>
          <span className={styles.statLabel}>LEARN</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.play}</span>
          <span className={styles.statLabel}>PLAY</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.earn}</span>
          <span className={styles.statLabel}>EARN</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNum}>{stats.simulator}</span>
          <span className={styles.statLabel}>SIMULATOR</span>
        </div>
      </div>

      <div className={styles.logSection}>
        <div className={styles.logHeader}>
          <h2>ACTIVITY LOG</h2>
          <div className={styles.filters}>
            {['all', 'learn', 'play', 'earn', 'simulator'].map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No activities yet. Start exploring!</p>
            <Link href="/learn" className={styles.exploreBtn}>GO TO LEARN →</Link>
          </div>
        ) : (
          <div className={styles.logList}>
            {filtered.map((act) => (
              <div key={act.id} className={styles.logItem}>
                <span className={styles.logIcon}>{typeIcons[act.type] || '📌'}</span>
                <div className={styles.logContent}>
                  <div className={styles.logTitle}>
                    <span className={styles.logTypeBadge} style={{ borderColor: typeColors[act.type] || '#666', color: typeColors[act.type] || '#666' }}>{act.type}</span>
                    {act.title}
                  </div>
                  {act.detail && <p className={styles.logDetail}>{act.detail}</p>}
                </div>
                <span className={styles.logTime}>{formatTime(act.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className={styles.clearBtn} onClick={() => { clearAllData(); setActivities([]); setCompleted([]); }}>
        CLEAR ALL DATA
      </button>
    </div>
  );
}
