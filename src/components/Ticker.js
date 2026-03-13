export default function Ticker() {
  const prizes = [
    "🔥 NEW TOURNAMENT LIVE: WIN 10,000 $WONK",
    "🚀 TOP TRADER 'ALEX_M' JUST CLAIMED 1 ETH",
    "⚡ COMPLETE THE STOPLOSS LAB TO UNLOCK PRO MODE",
    "🏆 MONTHLY LEADERBOARD RESETS IN 2 DAYS",
    "🔥 NEW TOURNAMENT LIVE: WIN 10,000 $WONK",
    "🚀 TOP TRADER 'ALEX_M' JUST CLAIMED 1 ETH",
    "⚡ COMPLETE THE STOPLOSS LAB TO UNLOCK PRO MODE",
    "🏆 MONTHLY LEADERBOARD RESETS IN 2 DAYS",
  ];

  return (
    <div className="tickerWrap">
      <div className="tickerMove">
        {prizes.map((prize, idx) => (
           <span key={idx} className="tickerItem">{prize}</span>
        ))}
      </div>
    </div>
  );
}
