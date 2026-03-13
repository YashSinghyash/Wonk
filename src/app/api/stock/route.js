import YahooFinance from 'yahoo-finance2';
import { NextResponse } from 'next/server';

const yahooFinance = new YahooFinance();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!symbol || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing params: symbol, startDate, endDate' }, { status: 400 });
  }

  try {
    const result = await yahooFinance.historical(symbol, {
      period1: startDate,
      period2: endDate,
      interval: '1d',
    });

    const data = result.map(item => ({
      date: item.date.toISOString().split('T')[0],
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
    }));

    return NextResponse.json({ data });
  } catch (err) {
    console.error('Yahoo Finance error:', err);
    return NextResponse.json({ error: 'Failed to fetch stock data. Check symbol and dates.' }, { status: 500 });
  }
}
