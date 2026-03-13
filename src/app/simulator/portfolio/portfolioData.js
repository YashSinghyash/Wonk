// Historical monthly returns data (2018-2022)
// Sources: S&P 500 (stocks), Bitcoin (crypto), US 10Y Treasuries (bonds), Gold spot, REIT index (real estate)
// Returns are monthly percentages

export const BUDGET = 50000;

export const assetClasses = [
  { id: 'stocks', name: 'Stocks', icon: '📈', color: '#4ade80', description: 'S&P 500 Index — Large cap US equities' },
  { id: 'crypto', name: 'Crypto', icon: '₿', color: '#f59e0b', description: 'Bitcoin — High volatility digital asset' },
  { id: 'bonds', name: 'Bonds', icon: '🏛️', color: '#60a5fa', description: 'US Treasury Bonds — Fixed income, low risk' },
  { id: 'gold', name: 'Gold', icon: '🥇', color: '#fbbf24', description: 'Gold Spot Price — Safe haven commodity' },
  { id: 'realestate', name: 'Real Estate', icon: '🏠', color: '#a78bfa', description: 'REIT Index — Diversified property exposure' },
];

// Quarterly returns (%) for 2018-2022 = 20 quarters = 5 years
// Based on approximate real historical data
export const quarterlyReturns = {
  // 2018 — stocks flat, crypto crash, bonds weak, gold down, RE moderate
  stocks:     [ 1.5, 3.4, 7.7, -13.5,   12.2, 4.3, 1.7, 9.1,   -19.6, 20.5, 8.5, 12.0,   0.6, 8.6, -3.4, 7.6 ,   -5.8, -0.8, 7.6, 2.3],
  crypto:     [ -45.0, -8.0, 5.0, -42.0,  10.0, 160.0, -25.0, 50.0,  -10.0, 40.0, 50.0, 170.0,  60.0, -42.0, 25.0, -22.0,  -0.5, -58.0, -3.0, -15.0],
  bonds:      [ -0.8, -0.5, 0.2, 1.6,     0.8, 3.0, 2.4, 0.1,     8.5, 0.1, -0.6, 0.7,   -3.5, -1.8, -0.1, 0.1,    -5.6, -5.5, -1.0, 0.4],
  gold:       [ 1.8, -5.5, -4.8, 7.5,     0.8, 9.1, 4.5, 3.0,     4.5, -5.5, -0.5, 24.6,   -10.0, 3.0, -0.8, 4.0,   0.3, -6.5, -3.5, 9.8],
  realestate: [ -7.5, 8.5, 1.2, -6.5,     16.0, 1.5, 7.5, -0.5,   -27.0, 18.5, 6.5, 10.0,   10.0, 12.5, 8.5, 16.0,  -6.0, -15.0, -4.5, 3.5],
};

export const quarterLabels = [
  'Q1 2018','Q2 2018','Q3 2018','Q4 2018',
  'Q1 2019','Q2 2019','Q3 2019','Q4 2019',
  'Q1 2020','Q2 2020','Q3 2020','Q4 2020',
  'Q1 2021','Q2 2021','Q3 2021','Q4 2021',
  'Q1 2022','Q2 2022','Q3 2022','Q4 2022',
];

// Market events that fire during simulation
export const marketEvents = {
  0: null,
  1: null,
  2: { title: 'Trade War Escalation', description: 'US-China trade tensions rise. Tech stocks and crypto sell off sharply.', icon: '⚔️' },
  3: { title: 'Fed Rate Hike', description: 'Federal Reserve raises interest rates. Bond yields increase, stock market dips.', icon: '🏦' },
  4: null,
  5: { title: 'Bitcoin Halving Anticipation', description: 'Crypto markets rally as the 2020 halving approaches. Institutional interest grows.', icon: '₿' },
  6: null,
  7: null,
  8: { title: 'COVID-19 CRASH', description: 'Global pandemic causes the fastest 30% drop in stock market history. Flight to safety — gold and bonds surge.', icon: '🦠' },
  9: { title: 'Stimulus Rally', description: '$2.2 trillion CARES Act passes. Markets begin a historic V-shaped recovery.', icon: '💰' },
  10: null,
  11: { title: 'Bitcoin Bull Run', description: 'Bitcoin breaks $20,000 for the first time since 2017. Institutional adoption accelerates.', icon: '🚀' },
  12: null,
  13: { title: 'Meme Stock Mania', description: 'Retail investors drive GameStop, AMC, and crypto to extreme highs. Volatility spikes across all markets.', icon: '🎰' },
  14: null,
  15: { title: 'Crypto All-Time High', description: 'Bitcoin hits $69,000. NFT market explodes. Real estate and stocks also at record highs.', icon: '🏔️' },
  16: { title: 'Russia-Ukraine War', description: 'Military conflict in Europe. Energy prices spike, markets sell off, gold surges as safe haven.', icon: '⚡' },
  17: { title: 'Crypto Winter', description: 'Terra/Luna collapse and Three Arrows Capital bankruptcy. Crypto market loses 60%+.', icon: '❄️' },
  18: { title: 'Aggressive Rate Hikes', description: 'Federal Reserve raises rates at the fastest pace in 40 years to fight inflation. Bonds and stocks suffer together.', icon: '📉' },
  19: null,
};

export function simulateQuarter(portfolio, quarterIndex) {
  const results = {};
  let totalValue = 0;

  assetClasses.forEach(asset => {
    const currentValue = portfolio[asset.id] || 0;
    const returnPct = quarterlyReturns[asset.id][quarterIndex] / 100;
    const newValue = currentValue * (1 + returnPct);
    results[asset.id] = newValue;
    totalValue += newValue;
  });

  return { values: results, totalValue };
}

export function calculateFinalScore(allocation, portfolioHistory) {
  const initial = BUDGET;
  const final = portfolioHistory[portfolioHistory.length - 1].totalValue;
  const totalReturn = ((final - initial) / initial) * 100;

  // Calculate volatility (standard deviation of quarterly returns)
  const quarterlyPortfolioReturns = [];
  for (let i = 1; i < portfolioHistory.length; i++) {
    const prev = portfolioHistory[i - 1].totalValue;
    const curr = portfolioHistory[i].totalValue;
    quarterlyPortfolioReturns.push(((curr - prev) / prev) * 100);
  }

  const meanReturn = quarterlyPortfolioReturns.reduce((s, r) => s + r, 0) / quarterlyPortfolioReturns.length;
  const variance = quarterlyPortfolioReturns.reduce((s, r) => s + Math.pow(r - meanReturn, 2), 0) / quarterlyPortfolioReturns.length;
  const volatility = Math.sqrt(variance);

  // Sharpe-like ratio (annualized)
  const annualizedReturn = totalReturn / 5;
  const riskFreeRate = 2; // ~2% risk-free rate
  const sharpeRatio = volatility > 0 ? (annualizedReturn - riskFreeRate) / volatility : 0;

  // Diversification score (Herfindahl index)
  const total = Object.values(allocation).reduce((s, v) => s + v, 0);
  if (total === 0) return { totalReturn, volatility, sharpeRatio, diversificationScore: 0, finalScore: 0, grade: 'F' };

  const weights = Object.values(allocation).map(v => v / total);
  const herfindahl = weights.reduce((s, w) => s + w * w, 0);
  const numAssets = weights.filter(w => w > 0).length;
  const diversificationScore = numAssets > 1 ? ((1 - herfindahl) / (1 - 1/5)) * 100 : 0;

  // Maximum drawdown
  let peak = portfolioHistory[0].totalValue;
  let maxDrawdown = 0;
  portfolioHistory.forEach(p => {
    if (p.totalValue > peak) peak = p.totalValue;
    const drawdown = ((peak - p.totalValue) / peak) * 100;
    if (drawdown > maxDrawdown) maxDrawdown = drawdown;
  });

  // Final composite score (0-100)
  const returnScore = Math.min(40, Math.max(0, (totalReturn / 2))); // Up to 40 pts
  const riskScore = Math.min(30, Math.max(0, 30 - volatility)); // Up to 30 pts (lower vol = higher score)
  const divScore = diversificationScore * 0.3; // Up to 30 pts
  const finalScore = Math.round(returnScore + riskScore + divScore);

  let grade;
  if (finalScore >= 85) grade = 'S';
  else if (finalScore >= 70) grade = 'A';
  else if (finalScore >= 55) grade = 'B';
  else if (finalScore >= 40) grade = 'C';
  else if (finalScore >= 25) grade = 'D';
  else grade = 'F';

  return {
    totalReturn: totalReturn.toFixed(1),
    annualizedReturn: annualizedReturn.toFixed(1),
    volatility: volatility.toFixed(1),
    sharpeRatio: sharpeRatio.toFixed(2),
    diversificationScore: diversificationScore.toFixed(0),
    maxDrawdown: maxDrawdown.toFixed(1),
    finalScore,
    grade,
    finalValue: final.toFixed(0),
  };
}
