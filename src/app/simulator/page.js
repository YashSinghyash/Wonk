'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './Simulator.module.css';

const COMPANIES = [
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services' },
  { symbol: 'INFY.NS', name: 'Infosys' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank' },
  { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever' },
  { symbol: 'ITC.NS', name: 'ITC Limited' },
  { symbol: 'SBIN.NS', name: 'State Bank of India' },
  { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel' },
  { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank' },
  { symbol: 'LT.NS', name: 'Larsen & Toubro' },
  { symbol: 'WIPRO.NS', name: 'Wipro' },
  { symbol: 'AXISBANK.NS', name: 'Axis Bank' },
  { symbol: 'TATAMOTORS.NS', name: 'Tata Motors' },
  { symbol: 'ADANIENT.NS', name: 'Adani Enterprises' },
];

export default function SimulatorPage() {
  // ── Setup state ──
  const [symbol, setSymbol] = useState(COMPANIES[0].symbol);
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-06-30');
  const [speed, setSpeed] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Simulation state ──
  const [fullData, setFullData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [tickIndex, setTickIndex] = useState(0);
  const [simState, setSimState] = useState('SETUP'); // SETUP, RUNNING, PAUSED, DONE
  const intervalRef = useRef(null);

  // ── Trading state ──
  const [balance, setBalance] = useState(100000);
  const [positions, setPositions] = useState([]); // { type, side, qty, entryPrice, stopLoss? }
  const [trades, setTrades] = useState([]);
  const [pnl, setPnl] = useState(0);

  // ── Order inputs ──
  const [deliveryQty, setDeliveryQty] = useState(1);
  const [intradayQty, setIntradayQty] = useState(1);
  const [slPrice, setSlPrice] = useState('');
  const [slQty, setSlQty] = useState(1);

  const currentPrice = visibleData.length > 0 ? visibleData[visibleData.length - 1].close : 0;
  const prevPrice = visibleData.length > 1 ? visibleData[visibleData.length - 2].close : currentPrice;
  const delta = currentPrice - prevPrice;

  // ── Fetch data ──
  const handleLoad = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/stock?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      if (!json.data || json.data.length === 0) throw new Error('No data returned for this range.');
      
      setFullData(json.data);
      setVisibleData([json.data[0]]);
      setTickIndex(1);
      setSimState('PAUSED');
      setBalance(100000);
      setPositions([]);
      setTrades([]);
      setPnl(0);
      setSlPrice(Math.floor(json.data[0].close * 0.95).toString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Simulation tick ──
  const tick = useCallback(() => {
    setTickIndex(prev => {
      const next = prev + 1;
      if (next >= fullData.length) {
        setSimState('DONE');
        return prev;
      }
      setVisibleData(fullData.slice(0, next + 1));
      return next;
    });
  }, [fullData]);

  // Check stop losses on every price update
  useEffect(() => {
    if (simState !== 'RUNNING' && simState !== 'PAUSED') return;
    if (!currentPrice || positions.length === 0) return;

    const triggered = [];
    const remaining = [];

    positions.forEach(pos => {
      if (pos.stopLoss && pos.side === 'BUY' && currentPrice <= pos.stopLoss) {
        // Stop loss triggered for a buy position
        const exitPnl = (currentPrice - pos.entryPrice) * pos.qty;
        setBalance(b => b + (currentPrice * pos.qty));
        setPnl(p => p + exitPnl);
        setTrades(t => [...t, { ...pos, exitPrice: currentPrice, pnl: exitPnl, reason: 'STOP LOSS' }]);
        triggered.push(pos);
      } else if (pos.stopLoss && pos.side === 'SELL' && currentPrice >= pos.stopLoss) {
        // Stop loss triggered for a sell position
        const exitPnl = (pos.entryPrice - currentPrice) * pos.qty;
        setBalance(b => b + exitPnl + (pos.entryPrice * pos.qty));
        setPnl(p => p + exitPnl);
        setTrades(t => [...t, { ...pos, exitPrice: currentPrice, pnl: exitPnl, reason: 'STOP LOSS' }]);
        triggered.push(pos);
      } else {
        remaining.push(pos);
      }
    });

    if (triggered.length > 0) {
      setPositions(remaining);
    }
  }, [currentPrice]);

  // ── Play/Pause ──
  useEffect(() => {
    if (simState === 'RUNNING') {
      const ms = Math.max(50, 1000 / speed);
      intervalRef.current = setInterval(tick, ms);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [simState, speed, tick]);

  const handlePlay = () => setSimState('RUNNING');
  const handlePause = () => setSimState('PAUSED');

  // ── Order execution ──
  const handleDeliveryBuy = () => {
    const cost = currentPrice * deliveryQty;
    if (balance < cost) return;
    setBalance(b => b - cost);
    setPositions(p => [...p, { type: 'DELIVERY', side: 'BUY', qty: deliveryQty, entryPrice: currentPrice, stopLoss: null }]);
  };

  const handleIntradayBuy = () => {
    const cost = currentPrice * intradayQty;
    if (balance < cost) return;
    setBalance(b => b - cost);
    setPositions(p => [...p, { type: 'INTRADAY', side: 'BUY', qty: intradayQty, entryPrice: currentPrice, stopLoss: null }]);
  };

  const handleIntradaySell = () => {
    // Short sell
    setPositions(p => [...p, { type: 'INTRADAY', side: 'SELL', qty: intradayQty, entryPrice: currentPrice, stopLoss: null }]);
  };

  const handleStopLossBuy = () => {
    const slNum = Number(slPrice);
    if (!slNum || slNum <= 0) return;
    const cost = currentPrice * slQty;
    if (balance < cost) return;
    setBalance(b => b - cost);
    setPositions(p => [...p, { type: 'STOP LOSS', side: 'BUY', qty: slQty, entryPrice: currentPrice, stopLoss: slNum }]);
  };

  // ── Close position ──
  const closePosition = (index) => {
    const pos = positions[index];
    let exitPnl = 0;
    if (pos.side === 'BUY') {
      exitPnl = (currentPrice - pos.entryPrice) * pos.qty;
      setBalance(b => b + (currentPrice * pos.qty));
    } else {
      exitPnl = (pos.entryPrice - currentPrice) * pos.qty;
      setBalance(b => b + exitPnl + (pos.entryPrice * pos.qty));
    }
    setPnl(p => p + exitPnl);
    setTrades(t => [...t, { ...pos, exitPrice: currentPrice, pnl: exitPnl, reason: 'MANUAL' }]);
    setPositions(p => p.filter((_, i) => i !== index));
  };

  const companyName = COMPANIES.find(c => c.symbol === symbol)?.name || symbol;
  const progress = fullData.length > 0 ? ((tickIndex / (fullData.length - 1)) * 100) : 0;

  // ── Unrealized P&L ──
  const unrealizedPnl = positions.reduce((sum, pos) => {
    if (pos.side === 'BUY') return sum + (currentPrice - pos.entryPrice) * pos.qty;
    return sum + (pos.entryPrice - currentPrice) * pos.qty;
  }, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background: '#000', border: '1px solid #333', padding: '8px 12px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
        <div>{d.date}</div>
        <div>O: ₹{d.open?.toFixed(2)}  H: ₹{d.high?.toFixed(2)}</div>
        <div>L: ₹{d.low?.toFixed(2)}  C: ₹{d.close?.toFixed(2)}</div>
      </div>
    );
  };

  // ── SETUP PHASE ──
  if (simState === 'SETUP') {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>SIMULATORS</h1>
          <p>Choose your trading experience.</p>
        </div>

        <div className={styles.simulatorsGrid}>
          {/* Market Simulator Card */}
          <div className={styles.setupPanel}>
            <div className={styles.panelHeader}>
              <h2>Market Simulator</h2>
              <p>Replay real market data. Trade like it's live.</p>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Company</label>
                <select value={symbol} onChange={e => setSymbol(e.target.value)}>
                  {COMPANIES.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol.replace('.NS', '')})</option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Speed</label>
                <div className={styles.speedRow}>
                  <input type="range" min="1" max="50" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
                  <span>{speed}x</span>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button className={`btn-primary ${styles.loadBtn}`} onClick={handleLoad} disabled={loading}>
                {loading ? 'LOADING DATA...' : 'LOAD SIMULATION'}
              </button>
              {error && <div className={styles.errorMsg}>{error}</div>}
            </div>
          </div>

          {/* Portfolio Allocator Card */}
          <div className={styles.setupPanel}>
            <div className={styles.panelHeader}>
              <h2>Portfolio Allocator</h2>
              <p>Allocate ₹50,000 across 5 asset classes.<br/>Simulate 5 years of real market data (2018–2022).</p>
            </div>

            <div className={styles.assetsVisual}>
              <div className={styles.assetsVisualRow}>
                <span>📈 STOCKS</span>
                <span>₿ CRYPTO</span>
                <span>🏛️ BONDS</span>
              </div>
              <div className={styles.assetsVisualRow}>
                <span>🥇 GOLD</span>
                <span>🏠 REAL ESTATE</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <Link href="/simulator/portfolio" className={`btn-primary ${styles.loadBtn}`} style={{ textAlign: 'center', display: 'block' }}>
                LAUNCH ALLOCATOR
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIMULATION PHASE ──
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{companyName}</h1>
        <p>{symbol} &middot; {visibleData[visibleData.length - 1]?.date || ''}</p>
      </div>

      <div className={styles.simLayout}>
        {/* ── Chart ── */}
        <div className={styles.chartPanel} style={drawingMode ? { cursor: 'crosshair', borderColor: 'var(--foreground)' } : {}}>
          <div className={styles.chartHeader}>
            <div>
              <span className={styles.price}>₹{currentPrice.toFixed(2)}</span>
              <span className={`${styles.priceDelta} ${delta >= 0 ? styles.up : styles.down}`}>
                {delta >= 0 ? '+' : ''}{delta.toFixed(2)}
              </span>
            </div>
            <div>BAL: ₹{balance.toFixed(0)}</div>
          </div>

          <div className={styles.chartBody}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={visibleData} 
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                <Tooltip content={<CustomTooltip />} />

                {positions.filter(p => p.stopLoss).map((p, i) => (
                  <ReferenceLine
                    key={`sl-${i}`}
                    y={p.stopLoss}
                    stroke="#fff"
                    strokeDasharray="4 4"
                    label={{ value: `SL: ₹${p.stopLoss}`, fill: '#fff', fontSize: 11, fontFamily: 'monospace', position: 'insideTopRight' }}
                  />
                ))}
                {positions.filter(p => !p.stopLoss).map((p, i) => (
                  <ReferenceLine
                    key={`entry-${i}`}
                    y={p.entryPrice}
                    stroke="#666"
                    strokeDasharray="2 2"
                    label={{ value: `${p.side}: ₹${p.entryPrice.toFixed(0)}`, fill: '#666', fontSize: 10, fontFamily: 'monospace', position: 'insideBottomRight' }}
                  />
                ))}
                <Line type="linear" dataKey="close" stroke="#fff" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.controlBar}>
            {simState === 'RUNNING' ? (
              <button onClick={handlePause}>⏸ PAUSE</button>
            ) : simState === 'DONE' ? (
              <button onClick={() => setSimState('SETUP')}>↩ NEW SIM</button>
            ) : (
              <button onClick={handlePlay}>▶ PLAY</button>
            )}
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span>{tickIndex}/{fullData.length - 1}</span>
          </div>
        </div>

        {/* ── Orders ── */}
        <div className={styles.orderPanel}>
          {/* DELIVERY */}
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>
              <h3>DELIVERY ORDER</h3>
              <Link href="/learn/delivery" className={styles.helpIcon} title="Learn about Delivery Orders">?</Link>
            </div>
            <div className={styles.orderRow}>
              <input type="number" min="1" value={deliveryQty} onChange={e => setDeliveryQty(Number(e.target.value))} placeholder="QTY" />
            </div>
            <button className={styles.buyBtn} onClick={handleDeliveryBuy} disabled={simState === 'DONE'}>
              BUY @ ₹{currentPrice.toFixed(2)}
            </button>
          </div>

          {/* INTRADAY */}
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>
              <h3>INTRADAY ORDER</h3>
              <Link href="/learn/intraday" className={styles.helpIcon} title="Learn about Intraday Orders">?</Link>
            </div>
            <div className={styles.orderRow}>
              <input type="number" min="1" value={intradayQty} onChange={e => setIntradayQty(Number(e.target.value))} placeholder="QTY" />
            </div>
            <div className={styles.orderRow}>
              <button className={styles.buyBtn} onClick={handleIntradayBuy} disabled={simState === 'DONE'}>BUY</button>
              <button className={styles.sellBtn} onClick={handleIntradaySell} disabled={simState === 'DONE'}>SELL</button>
            </div>
          </div>

          {/* STOP LOSS */}
          <div className={styles.orderBox}>
            <div className={styles.orderBoxHeader}>
              <h3>STOP LOSS</h3>
              <Link href="/learn/stoploss" className={styles.helpIcon} title="Learn about Stop Loss">?</Link>
            </div>
            <div className={styles.orderRow}>
              <input type="number" min="1" value={slQty} onChange={e => setSlQty(Number(e.target.value))} placeholder="QTY" />
              <input type="number" value={slPrice} onChange={e => setSlPrice(e.target.value)} placeholder="SL PRICE" />
            </div>
            <button className={styles.buyBtn} onClick={handleStopLossBuy} disabled={simState === 'DONE'}>
              BUY W/ SL @ ₹{slPrice || '—'}
            </button>
          </div>

          {/* PORTFOLIO */}
          <div className={styles.portfolio}>
            <h3>OPEN POSITIONS</h3>
            {positions.length === 0 && (
              <div className={styles.statRow}><span className={styles.statLabel}>No open positions</span></div>
            )}
            {positions.map((pos, i) => (
              <div key={i} className={styles.statRow}>
                <span className={styles.statLabel}>{pos.type} {pos.side} x{pos.qty} @ ₹{pos.entryPrice.toFixed(0)}{pos.stopLoss ? ` SL:₹${pos.stopLoss}` : ''}</span>
                <button className={styles.sellBtn} onClick={() => closePosition(i)} style={{ padding: '4px 8px', fontSize: '0.7rem', flex: 'none' }}>CLOSE</button>
              </div>
            ))}
          </div>

          {/* STATS */}
          <div className={styles.portfolio}>
            <h3>STATS</h3>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>REALIZED P&L</span>
              <span className={styles.statValue}>₹{pnl.toFixed(2)}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>UNREALIZED</span>
              <span className={styles.statValue}>₹{unrealizedPnl.toFixed(2)}</span>
            </div>
            <div className={styles.statRow}>
              <span className={styles.statLabel}>TRADES</span>
              <span className={styles.statValue}>{trades.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      {simState === 'DONE' && (
        <div className={styles.results}>
          <h2>SIMULATION COMPLETE</h2>
          <div className={styles.resultGrid}>
            <div className={styles.resultItem}>
              <span className={styles.val}>₹{(balance + unrealizedPnl).toFixed(0)}</span>
              <span className={styles.lbl}>Final Portfolio</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.val}>₹{(pnl + unrealizedPnl).toFixed(0)}</span>
              <span className={styles.lbl}>Total P&L</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.val}>{trades.length}</span>
              <span className={styles.lbl}>Trades Executed</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
