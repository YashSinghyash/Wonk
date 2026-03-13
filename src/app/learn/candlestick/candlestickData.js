// Candlestick Pattern Data with visual candle representations

export const categories = [
  {
    name: 'Single Candle Patterns',
    patterns: ['doji', 'hammer', 'inverted_hammer', 'shooting_star'],
  },
  {
    name: 'Two Candle Patterns',
    patterns: ['bullish_engulfing', 'bearish_engulfing'],
  },
  {
    name: 'Three Candle Patterns',
    patterns: ['morning_star', 'evening_star', 'three_white_soldiers', 'three_black_crows'],
  },
];

export const patterns = {
  doji: {
    id: 'doji',
    name: 'Doji',
    category: 'single',
    signal: 'Reversal / Indecision',
    description: 'A Doji forms when the open and close are nearly equal. The candle has very little body with wicks on top and bottom. It signals market indecision — neither bulls nor bears are in control.',
    interpretation: 'After a strong uptrend, a Doji signals that buying pressure is weakening. After a downtrend, it signals selling pressure is fading. Confirmation from the next candle is crucial.',
    keyPoints: [
      'Open ≈ Close (almost no body)',
      'Upper and lower wicks present',
      'Appears at tops or bottoms of trends',
      'Needs confirmation from next candle',
    ],
    candles: [
      { open: 100, close: 100.5, high: 108, low: 92 },
    ],
  },
  hammer: {
    id: 'hammer',
    name: 'Hammer',
    category: 'single',
    signal: 'Bullish Reversal',
    description: 'A Hammer appears at the bottom of a downtrend. It has a small real body at the top and a long lower wick (at least 2x the body). Buyers stepped in and pushed the price back up from the lows.',
    interpretation: 'The long lower wick shows sellers pushed the price down but buyers fought back aggressively. This is a strong bullish reversal signal, especially when confirmed by a green candle next session.',
    keyPoints: [
      'Small body at the upper end',
      'Lower wick ≥ 2x the body size',
      'Little or no upper wick',
      'Must appear after a downtrend',
    ],
    candles: [
      { open: 100, close: 103, high: 104, low: 88 },
    ],
  },
  inverted_hammer: {
    id: 'inverted_hammer',
    name: 'Inverted Hammer',
    category: 'single',
    signal: 'Bullish Reversal',
    description: 'The Inverted Hammer appears at the bottom of a downtrend. It has a small body at the bottom and a long upper wick. Buyers tried to push up but couldn\'t sustain — however, selling pressure is clearly weakening.',
    interpretation: 'Although the upper wick shows rejection, the fact that buyers attempted a rally during a downtrend is significant. If confirmed by a follow-up bullish candle, it signals a reversal.',
    keyPoints: [
      'Small body at the lower end',
      'Upper wick ≥ 2x the body size',
      'Little or no lower wick',
      'Must appear after a downtrend',
    ],
    candles: [
      { open: 100, close: 102, high: 112, low: 99 },
    ],
  },
  shooting_star: {
    id: 'shooting_star',
    name: 'Shooting Star',
    category: 'single',
    signal: 'Bearish Reversal',
    description: 'A Shooting Star appears at the top of an uptrend. It has a small body at the bottom with a long upper wick. Buyers pushed the price high but sellers took control and drove it back down.',
    interpretation: 'This is a strong bearish signal. The long upper wick shows that buyers tried to continue the uptrend but failed. The sellers overpowered them. Confirmation with a red candle next session is ideal.',
    keyPoints: [
      'Small body at the lower end',
      'Upper wick ≥ 2x the body size',
      'Little or no lower wick',
      'Must appear after an uptrend',
    ],
    candles: [
      { open: 102, close: 100, high: 112, low: 99 },
    ],
  },
  bullish_engulfing: {
    id: 'bullish_engulfing',
    name: 'Bullish Engulfing',
    category: 'two',
    signal: 'Bullish Reversal',
    description: 'A two-candle pattern where a small bearish (red) candle is followed by a larger bullish (green) candle that completely engulfs the previous candle\'s body. This shows buyers have overwhelmed sellers.',
    interpretation: 'The shift from a small bearish candle to a large bullish candle shows a decisive change in momentum. The larger the engulfing candle, the stronger the signal. Best when it appears after a clear downtrend.',
    keyPoints: [
      'First candle: small bearish (red)',
      'Second candle: large bullish (green)',
      'Green body completely covers red body',
      'Stronger signal with high volume',
    ],
    candles: [
      { open: 104, close: 100, high: 105, low: 99 },
      { open: 99, close: 107, high: 108, low: 98 },
    ],
  },
  bearish_engulfing: {
    id: 'bearish_engulfing',
    name: 'Bearish Engulfing',
    category: 'two',
    signal: 'Bearish Reversal',
    description: 'A two-candle pattern where a small bullish (green) candle is followed by a larger bearish (red) candle that completely engulfs the previous body. Sellers have taken over from buyers.',
    interpretation: 'This pattern at the top of an uptrend is a strong sell signal. The larger bearish candle shows that sellers have overwhelmed the bulls. The bigger the engulfing candle relative to the first, the stronger the signal.',
    keyPoints: [
      'First candle: small bullish (green)',
      'Second candle: large bearish (red)',
      'Red body completely covers green body',
      'Best at the top of an uptrend',
    ],
    candles: [
      { open: 100, close: 104, high: 105, low: 99 },
      { open: 105, close: 97, high: 106, low: 96 },
    ],
  },
  morning_star: {
    id: 'morning_star',
    name: 'Morning Star',
    category: 'three',
    signal: 'Bullish Reversal',
    description: 'A three-candle bullish reversal pattern: (1) a long bearish candle, (2) a small-bodied candle (star) that gaps down, and (3) a long bullish candle that closes above the midpoint of the first candle.',
    interpretation: 'The first candle confirms the downtrend. The star shows indecision. The third candle shows buyers have taken control decisively. This is one of the most reliable reversal patterns.',
    keyPoints: [
      'First: long bearish (red) candle',
      'Second: small body (star), gaps down',
      'Third: long bullish (green) candle',
      'Third closes above midpoint of first',
    ],
    candles: [
      { open: 110, close: 100, high: 111, low: 99 },
      { open: 99, close: 100, high: 101, low: 97 },
      { open: 101, close: 112, high: 113, low: 100 },
    ],
  },
  evening_star: {
    id: 'evening_star',
    name: 'Evening Star',
    category: 'three',
    signal: 'Bearish Reversal',
    description: 'A three-candle bearish reversal: (1) a long bullish candle, (2) a small-bodied star that gaps up, and (3) a long bearish candle closing below the midpoint of the first candle.',
    interpretation: 'The opposite of Morning Star. After a strong bullish candle, the small star shows hesitation. The third bearish candle confirms the reversal. Very reliable at market tops.',
    keyPoints: [
      'First: long bullish (green) candle',
      'Second: small body (star), gaps up',
      'Third: long bearish (red) candle',
      'Third closes below midpoint of first',
    ],
    candles: [
      { open: 100, close: 110, high: 111, low: 99 },
      { open: 111, close: 110, high: 113, low: 109 },
      { open: 109, close: 98, high: 110, low: 97 },
    ],
  },
  three_white_soldiers: {
    id: 'three_white_soldiers',
    name: 'Three White Soldiers',
    category: 'three',
    signal: 'Strong Bullish',
    description: 'Three consecutive long bullish (green) candles that open within the previous candle\'s body and close at progressively higher levels. Each candle has a small upper wick. A powerful bullish continuation signal.',
    interpretation: 'This pattern shows sustained buying pressure over three sessions. Bulls are firmly in control. It\'s most significant when it appears after a downtrend or consolidation period, signaling a strong move up.',
    keyPoints: [
      'Three consecutive green candles',
      'Each opens within the previous body',
      'Each closes at progressively higher levels',
      'Small upper wicks show consistent buying',
    ],
    candles: [
      { open: 100, close: 106, high: 107, low: 99 },
      { open: 104, close: 112, high: 113, low: 103 },
      { open: 110, close: 118, high: 119, low: 109 },
    ],
  },
  three_black_crows: {
    id: 'three_black_crows',
    name: 'Three Black Crows',
    category: 'three',
    signal: 'Strong Bearish',
    description: 'Three consecutive long bearish (red) candles that open within the previous body and close at progressively lower levels. The bearish counterpart of Three White Soldiers.',
    interpretation: 'This pattern shows sustained selling pressure. Bears are in full control. Most significant when it appears after an uptrend, signaling a sharp reversal or the start of a major sell-off.',
    keyPoints: [
      'Three consecutive red candles',
      'Each opens within the previous body',
      'Each closes at progressively lower levels',
      'Small lower wicks show persistent selling',
    ],
    candles: [
      { open: 118, close: 112, high: 119, low: 111 },
      { open: 113, close: 106, high: 114, low: 105 },
      { open: 107, close: 100, high: 108, low: 99 },
    ],
  },
};
