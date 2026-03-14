'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BUDGET, assetClasses, quarterlyReturns, quarterLabels, marketEvents, simulateQuarter, calculateFinalScore } from './portfolioData';
import { logActivity } from '@/lib/activityTracker';
import styles from './Portfolio.module.css';

function AllocationSlider({ asset, value, onChange, remaining, total }) {
  const pct = total > 0 ? ((value / total) * 100).toFixed(0) : 0;
  return (
    <div className={styles.sliderRow}>
      <div className={styles.sliderLeft}>
        <span className={styles.assetIcon}>{asset.icon}</span>
        <div>
          <span className={styles.assetName}>{asset.name}</span>
          <span className={styles.assetDesc}>{asset.description}</span>
        </div>
      </div>
      <div className={styles.sliderRight}>
        <span className={styles.assetAmount} style={{ color: asset.color }}>
          ₹{value.toLocaleString()}
        </span>
        <span className={styles.assetPct}>{pct}%</span>
        <input
          type="range"
          min={0}
          max={BUDGET}
          step={1000}
          value={value}
          onChange={e => onChange(asset.id, Number(e.target.value))}
          className={styles.slider}
          style={{ accentColor: asset.color }}
        />
      </div>
    </div>
  );
}

function MiniChart({ history, colors }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.length < 2) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, 200);

    const w = rect.width;
    const h = 200;
    const pad = 30;

    // Find min/max across all asset values
    let allMax = 0;
    history.forEach(point => {
      assetClasses.forEach(a => {
        if ((point.values[a.id] || 0) > allMax) allMax = point.values[a.id];
      });
    });
    allMax = Math.max(allMax, BUDGET * 0.5);

    const xStep = (w - pad * 2) / (history.length - 1);

    // Grid
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad + ((h - pad * 2) / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();
    }

    // Draw each asset line
    assetClasses.forEach(asset => {
      const vals = history.map(p => p.values[asset.id] || 0);
      if (vals.every(v => v === 0)) return;

      ctx.beginPath();
      ctx.strokeStyle = colors[asset.id] || '#fff';
      ctx.lineWidth = 2;
      vals.forEach((val, i) => {
        const x = pad + i * xStep;
        const y = pad + (1 - val / allMax) * (h - pad * 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Y-axis labels
    ctx.fillStyle = '#555';
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = pad + ((h - pad * 2) / 4) * i;
      const val = allMax - (allMax / 4) * i;
      ctx.fillText(`₹${(val / 1000).toFixed(0)}K`, pad - 5, y + 3);
    }
  }, [history, colors]);

  return <canvas ref={canvasRef} className={styles.chartCanvas} style={{ height: '200px' }} />;
}

export default function PortfolioAllocator() {
  const [phase, setPhase] = useState('allocate'); // allocate, simulating, results
  const [allocation, setAllocation] = useState({ stocks: 10000, crypto: 10000, bonds: 10000, gold: 10000, realestate: 10000 });
  const [portfolio, setPortfolio] = useState(null);
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [currentQuarter, setCurrentQuarter] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [score, setScore] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const timerRef = useRef(null);

  const totalAllocated = Object.values(allocation).reduce((s, v) => s + v, 0);
  const remaining = BUDGET - totalAllocated;

  function handleAllocationChange(assetId, newValue) {
    setAllocation(prev => {
      const oldValue = prev[assetId];
      const diff = newValue - oldValue;
      const currentRemaining = BUDGET - totalAllocated;
      // Don't allow exceeding budget
      if (diff > currentRemaining) {
        newValue = oldValue + currentRemaining;
      }
      return { ...prev, [assetId]: newValue };
    });
  }

  function startSimulation() {
    if (remaining < 0) return;
    const initial = { values: { ...allocation }, totalValue: BUDGET };
    setPortfolio({ ...allocation });
    setPortfolioHistory([initial]);
    setCurrentQuarter(0);
    setPhase('simulating');
    setIsSimulating(true);
  }

  // Auto-advance simulation
  useEffect(() => {
    if (phase !== 'simulating' || !isSimulating) return;

    timerRef.current = setTimeout(() => {
      if (currentQuarter >= 20) {
        // Done
        setIsSimulating(false);
        setPhase('results');
        return;
      }

      // Check for event
      const event = marketEvents[currentQuarter];
      if (event) {
        setCurrentEvent(event);
        // Pause briefly for event display
        setTimeout(() => {
          advanceQuarter();
          setCurrentEvent(null);
        }, 2500);
      } else {
        advanceQuarter();
      }
    }, 1200);

    return () => clearTimeout(timerRef.current);
  }, [phase, isSimulating, currentQuarter, portfolio]);

  function advanceQuarter() {
    setCurrentQuarter(prev => {
      const qi = prev;
      if (qi >= 20) return prev;

      setPortfolioHistory(history => {
        const latest = history[history.length - 1];
        const result = simulateQuarter(latest.values, qi);
        const newHistory = [...history, result];

        // Update portfolio
        setPortfolio(result.values);

        // Check if done
        if (qi >= 19) {
          setTimeout(() => {
            setIsSimulating(false);
            setPhase('results');
          }, 500);
        }

        return newHistory;
      });

      return prev + 1;
    });
  }

  // Calculate score when reaching results
  useEffect(() => {
    if (phase === 'results' && portfolioHistory.length > 1) {
      const s = calculateFinalScore(allocation, portfolioHistory);
      setScore(s);
      logActivity('simulator', 'Portfolio Allocator', `Grade: ${s.grade} | Return: ${s.totalReturn}% | Score: ${s.finalScore}/100`);
    }
  }, [phase, portfolioHistory]);

  const assetColors = {};
  assetClasses.forEach(a => { assetColors[a.id] = a.color; });

  const gradeColors = { 'S': '#fbbf24', 'A': '#4ade80', 'B': '#60a5fa', 'C': '#a78bfa', 'D': '#f97316', 'F': '#f87171' };

  // ── ALLOCATION PHASE ──
  if (phase === 'allocate') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/simulator" className={styles.backLink}>← SIMULATOR</Link>
          <h1>PORTFOLIO ALLOCATOR</h1>
          <p>Allocate ₹50,000 across 5 asset classes. Simulate 5 years of real market movement (2018–2022).</p>
        </div>

        <div className={styles.budgetBar}>
          <div className={styles.budgetLabel}>
            <span>BUDGET</span>
            <span>₹{BUDGET.toLocaleString()}</span>
          </div>
          <div className={styles.budgetTrack}>
            <div className={styles.budgetFill} style={{ width: `${(totalAllocated / BUDGET) * 100}%` }} />
          </div>
          <div className={styles.budgetRemaining}>
            <span>ALLOCATED: ₹{totalAllocated.toLocaleString()}</span>
            <span style={{ color: remaining < 0 ? '#f87171' : remaining === 0 ? '#4ade80' : '#fbbf24' }}>
              REMAINING: ₹{remaining.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.sliders}>
          {assetClasses.map(asset => (
            <AllocationSlider
              key={asset.id}
              asset={asset}
              value={allocation[asset.id]}
              onChange={handleAllocationChange}
              remaining={remaining}
              total={totalAllocated}
            />
          ))}
        </div>

        {/* Allocation Pie Summary */}
        <div className={styles.pieSummary}>
          {assetClasses.map(asset => {
            const pct = totalAllocated > 0 ? ((allocation[asset.id] / totalAllocated) * 100).toFixed(0) : 0;
            return (
              <div key={asset.id} className={styles.pieSegment} style={{ flex: allocation[asset.id] || 0.1 }}>
                <div className={styles.pieBar} style={{ background: asset.color, height: `${Math.max(4, pct * 0.8)}px` }} />
                <span className={styles.piePct}>{pct}%</span>
                <span className={styles.pieName}>{asset.name}</span>
              </div>
            );
          })}
        </div>

        <button
          className={styles.startBtn}
          onClick={startSimulation}
          disabled={remaining < 0 || totalAllocated === 0}
        >
          SIMULATE 5 YEARS →
        </button>
      </div>
    );
  }

  // ── SIMULATION PHASE ──
  if (phase === 'simulating') {
    const year = Math.floor(currentQuarter / 4) + 2018;
    const q = (currentQuarter % 4) + 1;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>SIMULATING...</h1>
          <p className={styles.simYear}>
            {currentQuarter < 20 ? `Q${q} ${year}` : 'COMPLETE'} — Quarter {Math.min(currentQuarter + 1, 20)} of 20
          </p>
        </div>

        {/* Progress */}
        <div className={styles.simProgress}>
          <div className={styles.simProgressFill} style={{ width: `${(currentQuarter / 20) * 100}%` }} />
        </div>

        {/* Event Alert */}
        {currentEvent && (
          <div className={styles.eventAlert}>
            <span className={styles.eventIcon}>{currentEvent.icon}</span>
            <div>
              <h3>{currentEvent.title}</h3>
              <p>{currentEvent.description}</p>
            </div>
          </div>
        )}

        {/* Live Chart */}
        {portfolioHistory.length > 1 && (
          <div className={styles.chartCard}>
            <h3>[ PORTFOLIO GROWTH ]</h3>
            <MiniChart history={portfolioHistory} colors={assetColors} />
            <div className={styles.chartLegend}>
              {assetClasses.map(a => (
                <span key={a.id} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: a.color }} />
                  {a.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Current Values */}
        <div className={styles.liveValues}>
          {assetClasses.map(asset => {
            const current = portfolio?.[asset.id] || allocation[asset.id];
            const initial = allocation[asset.id];
            const change = initial > 0 ? (((current - initial) / initial) * 100).toFixed(1) : '0.0';
            return (
              <div key={asset.id} className={styles.liveCard}>
                <span className={styles.liveIcon}>{asset.icon}</span>
                <span className={styles.liveName}>{asset.name}</span>
                <span className={styles.liveAmount} style={{ color: asset.color }}>₹{Math.round(current).toLocaleString()}</span>
                <span className={`${styles.liveChange} ${Number(change) >= 0 ? styles.positive : styles.negative}`}>
                  {Number(change) >= 0 ? '+' : ''}{change}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className={styles.simTotal}>
          <span>TOTAL PORTFOLIO</span>
          <span>₹{portfolioHistory.length > 0 ? Math.round(portfolioHistory[portfolioHistory.length - 1].totalValue).toLocaleString() : BUDGET.toLocaleString()}</span>
        </div>
      </div>
    );
  }

  // ── RESULTS PHASE ──
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>SIMULATION COMPLETE</h1>
        <p>5-Year Performance (2018–2022)</p>
      </div>

      {score && (
        <>
          {/* Grade */}
          <div className={styles.gradeDisplay}>
            <div className={styles.gradeCircle} style={{ borderColor: gradeColors[score.grade] || '#fff' }}>
              <span className={styles.gradeText} style={{ color: gradeColors[score.grade] || '#fff' }}>{score.grade}</span>
            </div>
            <div className={styles.gradeInfo}>
              <span className={styles.gradeScore}>{score.finalScore}/100</span>
              <span className={styles.gradeLabel}>PORTFOLIO SCORE</span>
            </div>
          </div>

          {/* Chart */}
          <div className={styles.chartCard}>
            <h3>[ 5-YEAR GROWTH ]</h3>
            <MiniChart history={portfolioHistory} colors={assetColors} />
            <div className={styles.chartLegend}>
              {assetClasses.map(a => (
                <span key={a.id} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: a.color }} />
                  {a.name}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricVal}>₹{Number(score.finalValue).toLocaleString()}</span>
              <span className={styles.metricLabel}>FINAL VALUE</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal} style={{ color: Number(score.totalReturn) >= 0 ? '#4ade80' : '#f87171' }}>
                {Number(score.totalReturn) >= 0 ? '+' : ''}{score.totalReturn}%
              </span>
              <span className={styles.metricLabel}>TOTAL RETURN</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal}>{score.annualizedReturn}%</span>
              <span className={styles.metricLabel}>ANNUALIZED</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal}>{score.volatility}%</span>
              <span className={styles.metricLabel}>VOLATILITY</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal}>{score.sharpeRatio}</span>
              <span className={styles.metricLabel}>SHARPE RATIO</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal} style={{ color: '#f87171' }}>-{score.maxDrawdown}%</span>
              <span className={styles.metricLabel}>MAX DRAWDOWN</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricVal}>{score.diversificationScore}%</span>
              <span className={styles.metricLabel}>DIVERSIFICATION</span>
            </div>
          </div>

          {/* Per-Asset Breakdown */}
          <div className={styles.breakdownCard}>
            <h3>[ ASSET BREAKDOWN ]</h3>
            {assetClasses.map(asset => {
              const initial = allocation[asset.id];
              const final = portfolio?.[asset.id] || 0;
              const change = initial > 0 ? (((final - initial) / initial) * 100).toFixed(1) : '0.0';
              return (
                <div key={asset.id} className={styles.breakdownRow}>
                  <span className={styles.breakdownIcon}>{asset.icon}</span>
                  <span className={styles.breakdownName}>{asset.name}</span>
                  <span className={styles.breakdownInitial}>₹{initial.toLocaleString()}</span>
                  <span className={styles.breakdownArrow}>→</span>
                  <span className={styles.breakdownFinal} style={{ color: asset.color }}>₹{Math.round(final).toLocaleString()}</span>
                  <span className={`${styles.breakdownChange} ${Number(change) >= 0 ? styles.positive : styles.negative}`}>
                    {Number(change) >= 0 ? '+' : ''}{change}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className={styles.resultActions}>
            <button className={styles.retryBtn} onClick={() => { setPhase('allocate'); setPortfolioHistory([]); setScore(null); setCurrentQuarter(0); setPortfolio(null); }}>
              TRY AGAIN →
            </button>
            <Link href="/simulator" className={styles.backBtn}>BACK TO SIMULATOR</Link>
          </div>
        </>
      )}
    </div>
  );
}
