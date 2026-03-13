'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { categories, patterns } from './candlestickData';
import { logActivity, markCompleted } from '@/lib/activityTracker';
import styles from './Candlestick.module.css';

function CandlestickChart({ candles, height = 260 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, height);

    // Find price range
    let allHigh = -Infinity, allLow = Infinity;
    candles.forEach(c => {
      allHigh = Math.max(allHigh, c.high);
      allLow = Math.min(allLow, c.low);
    });
    const range = allHigh - allLow || 1;
    const paddingY = 30;
    const chartH = height - paddingY * 2;

    function yPos(price) {
      return paddingY + (1 - (price - allLow) / range) * chartH;
    }

    const totalW = rect.width;
    const candleCount = candles.length;
    const candleSpacing = Math.min(80, totalW / (candleCount + 1));
    const candleWidth = Math.min(40, candleSpacing * 0.6);

    // Draw grid lines
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = paddingY + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(totalW, y);
      ctx.stroke();
      const price = allHigh - (range / 4) * i;
      ctx.fillStyle = '#444';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText(price.toFixed(1), totalW - 5, y - 4);
    }

    candles.forEach((c, i) => {
      const x = (totalW / (candleCount + 1)) * (i + 1);
      const isBullish = c.close >= c.open;
      const bodyTop = yPos(Math.max(c.open, c.close));
      const bodyBot = yPos(Math.min(c.open, c.close));
      const bodyHeight = Math.max(bodyBot - bodyTop, 2);

      // Wick
      ctx.beginPath();
      ctx.strokeStyle = isBullish ? '#4ade80' : '#f87171';
      ctx.lineWidth = 2;
      ctx.moveTo(x, yPos(c.high));
      ctx.lineTo(x, yPos(c.low));
      ctx.stroke();

      // Body
      ctx.fillStyle = isBullish ? '#4ade80' : '#f87171';
      if (Math.abs(c.close - c.open) < 1) {
        // Doji — draw horizontal line
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, 2);
      } else {
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
      }

      // Labels
      ctx.fillStyle = '#666';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`O:${c.open}`, x, height - 5);
    });
  }, [candles, height]);

  return <canvas ref={canvasRef} className={styles.canvas} style={{ height: `${height}px` }} />;
}

export default function CandlestickPage() {
  const [selectedPattern, setSelectedPattern] = useState('doji');
  const [viewedPatterns, setViewedPatterns] = useState([]);

  const pattern = patterns[selectedPattern];

  useEffect(() => {
    if (selectedPattern && !viewedPatterns.includes(selectedPattern)) {
      setViewedPatterns(prev => [...prev, selectedPattern]);
    }
  }, [selectedPattern, viewedPatterns]);

  const allViewed = Object.keys(patterns).every(p => viewedPatterns.includes(p));

  useEffect(() => {
    if (allViewed) {
      markCompleted('candlestick');
      logActivity('learn', 'Completed Candlestick Patterns', 'Studied all 11 candlestick patterns');
    }
  }, [allViewed]);

  const signalColor = pattern?.signal?.includes('Bullish') || pattern?.signal?.includes('Strong Bullish')
    ? '#4ade80'
    : pattern?.signal?.includes('Bearish') || pattern?.signal?.includes('Strong Bearish')
    ? '#f87171'
    : '#fbbf24';

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* SIDEBAR — Pattern List */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href="/learn" className={styles.backLink}>← LEARN</Link>
            <h3>CANDLESTICK PATTERNS</h3>
            <span className={styles.progress}>{viewedPatterns.length}/{Object.keys(patterns).length} studied</span>
          </div>

          {categories.map(cat => (
            <div key={cat.name} className={styles.catGroup}>
              <h4 className={styles.catName}>{cat.name}</h4>
              {cat.patterns.map(pid => (
                <button
                  key={pid}
                  className={`${styles.patternBtn} ${selectedPattern === pid ? styles.patternActive : ''} ${viewedPatterns.includes(pid) ? styles.patternViewed : ''}`}
                  onClick={() => setSelectedPattern(pid)}
                >
                  {viewedPatterns.includes(pid) && <span className={styles.checkmark}>✓</span>}
                  {patterns[pid].name}
                </button>
              ))}
            </div>
          ))}

          {allViewed && (
            <div className={styles.completionBadge}>
              🏆 ALL PATTERNS STUDIED
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className={styles.main}>
          {pattern && (
            <>
              <div className={styles.patternHeader}>
                <h1>{pattern.name}</h1>
                <span className={styles.signalBadge} style={{ borderColor: signalColor, color: signalColor }}>
                  {pattern.signal}
                </span>
              </div>

              {/* CANDLESTICK CHART */}
              <div className={styles.chartCard}>
                <h3>[ VISUAL PATTERN ]</h3>
                <CandlestickChart candles={pattern.candles} height={260} />
              </div>

              {/* DESCRIPTION */}
              <div className={styles.infoCard}>
                <h3>[ WHAT IT IS ]</h3>
                <p>{pattern.description}</p>
              </div>

              {/* INTERPRETATION */}
              <div className={styles.infoCard}>
                <h3>[ HOW TO READ IT ]</h3>
                <p>{pattern.interpretation}</p>
              </div>

              {/* KEY POINTS */}
              <div className={styles.infoCard}>
                <h3>[ KEY POINTS ]</h3>
                <ul className={styles.keyPoints}>
                  {pattern.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
