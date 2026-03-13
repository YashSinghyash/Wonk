'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { logActivity, markCompleted } from '@/lib/activityTracker';
import styles from './StopLoss.module.css';

export default function StopLossPage() {
  const [price, setPrice] = useState(100);
  const [history, setHistory] = useState([100]);
  const [position, setPosition] = useState(null); // { entryPrice, amount, stopLossPrice }
  const [stopLoss, setStopLoss] = useState(95);
  const [balance, setBalance] = useState(1000);
  const [message, setMessage] = useState("INITIATE SEQUENCE. LESSON: STOP LOSS.");
  const [gameState, setGameState] = useState('IDLE'); // IDLE, ACTIVE, ENDED

  // Simulate price movement
  useEffect(() => {
    if (gameState === 'IDLE' || gameState === 'ENDED') return;

    const interval = setInterval(() => {
      setPrice(prev => {
        const volatility = 2;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = Math.max(50, prev + change);
        
        setHistory(h => [...h.slice(-49), newPrice]);

        // Check Stop Loss
        if (position && newPrice <= position.stopLossPrice) {
          handleStopLossTrigger(newPrice);
        }

        return newPrice;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [gameState, position]);

  const handleBuy = () => {
    if (balance < price) return;
    setPosition({
      entryPrice: price,
      stopLossPrice: stopLoss
    });
    setBalance(b => b - price);
    setGameState('ACTIVE');
    setMessage(`TRADE OPEN AT $${price.toFixed(2)}. STOP LOSS: $${stopLoss}.`);
  };

  const handleStopLossTrigger = (triggerPrice) => {
    setBalance(b => b + triggerPrice);
    setPosition(null);
    setGameState('ENDED');
    const loss = triggerPrice - position.entryPrice;
    setMessage(`STOP LOSS TRIGGERED AT $${triggerPrice.toFixed(2)}. CAPITAL PROTECTED. LOSS: $${Math.abs(loss).toFixed(2)}.`);
    markCompleted('stoploss');
    logActivity('learn', 'StopLoss Simulation', `Stop loss triggered. Loss: $${Math.abs(loss).toFixed(2)}`);
  };

  const handleRestart = () => {
    setPrice(100);
    setHistory([100]);
    setPosition(null);
    setGameState('IDLE');
    setBalance(1000);
    setMessage("RESET COMPLETE. POSITION YOURSELF.");
  };

  const chartData = history.map((p, i) => ({ time: i, price: p }));

  return (
    <div className={styles.container}>
      <div className={styles.lessonInfo}>
        <h2>Stop Loss Protocol</h2>
        <div className={styles.messageBox}>{message}</div>
      </div>

      <div className={styles.mainGrid}>
        <div className={`${styles.chartArea} card`}>
          <div className={styles.stats}>
            <div>PRICE <span className={styles.priceHighlight}>${price.toFixed(2)}</span></div>
            <div>BALANCE ${balance.toFixed(2)}</div>
          </div>
          <div className={styles.visualizer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
                <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                {position && (
                  <ReferenceLine 
                    y={position.stopLossPrice} 
                    stroke="#ffffff" 
                    strokeDasharray="4 4" 
                    label={{ position: 'insideTopLeft', value: `[ SL: $${position.stopLossPrice} ]`, fill: '#ffffff', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                )}
                <Line 
                  type="linear" 
                  dataKey="price" 
                  stroke="#ffffff" 
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.controls}>
          <div className="card">
            <h3>Trade Terminal</h3>
            <div className={styles.inputGroup}>
              <label>STOP LOSS TRIGGER: ${stopLoss}</label>
              <input 
                type="range" 
                min="50" 
                max="150" 
                value={stopLoss} 
                onChange={(e) => setStopLoss(Number(e.target.value))}
                disabled={gameState === 'ACTIVE'}
                className={styles.slider}
              />
            </div>
            {gameState === 'IDLE' && (
              <button className="btn-primary" onClick={handleBuy} style={{ width: '100%' }}>
                EXECUTE BUY @ ${price.toFixed(2)}
              </button>
            )}
            {gameState === 'ENDED' && (
              <button className="btn-primary" onClick={handleRestart} style={{ width: '100%' }}>
                RESTART LAB
              </button>
            )}
            {gameState === 'ACTIVE' && (
              <div className={styles.activePulse}>[ POSITION ACTIVE ]</div>
            )}
          </div>

          <div className="card">
            <h3>Briefing</h3>
            <p>A <strong>Stop Loss</strong> is a strict defensive protocol. It automatically liquidates your position when a specific price threshold is breached, preventing catastrophic capital destruction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
