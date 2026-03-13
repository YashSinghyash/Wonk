'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { companyProfile, stages, randomEvents, calculateScore, getCEORating } from './contestData';
import styles from './Orion.module.css';

function formatMoney(val) {
  const abs = Math.abs(val);
  if (abs >= 1_000_000_000) return `$${(val / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `$${(val / 1_000_000).toFixed(0)}M`;
  if (abs >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
  return `$${val}`;
}

function formatDelta(val) {
  if (val === 0) return '—';
  const prefix = val > 0 ? '+' : '';
  return prefix + formatMoney(val);
}

export default function OrionContestPage() {
  const [gamePhase, setGamePhase] = useState('intro'); // intro | email | decision | outcome | event | results
  const [currentStage, setCurrentStage] = useState(0);
  const [financials, setFinancials] = useState({ ...companyProfile.initialFinancials });
  const [decisions, setDecisions] = useState([]);
  const [firedEvents, setFiredEvents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [outcomeNarrative, setOutcomeNarrative] = useState('');
  const [outcomeEffects, setOutcomeEffects] = useState(null);
  const [exitData, setExitData] = useState(null);

  const stage = stages[currentStage];
  const progress = currentStage / stages.length;

  const runway = useMemo(() => {
    const pnl = financials.quarterlyRevenue - financials.quarterlyExpenses;
    if (pnl >= 0) return '∞';
    const quarters = Math.floor(financials.cash / Math.abs(pnl));
    return `${quarters}Q (~${quarters * 3}mo)`;
  }, [financials]);

  const quarterlyPL = financials.quarterlyRevenue - financials.quarterlyExpenses;
  const isBankrupt = financials.cash <= 0;

  useEffect(() => {
    if (isBankrupt && gamePhase !== 'results') {
      setExitData({ exitType: 'bankrupt', exitValue: 0 });
      setGamePhase('results');
    }
  }, [financials.cash, isBankrupt, gamePhase]);

  function applyEffects(effects) {
    setFinancials(prev => ({
      cash: prev.cash + (effects.cashDelta || 0),
      quarterlyRevenue: prev.quarterlyRevenue + (effects.quarterlyRevenueDelta || 0),
      quarterlyExpenses: prev.quarterlyExpenses + (effects.quarterlyExpensesDelta || 0),
      valuation: prev.valuation + (effects.valuationDelta || 0),
      dilution: prev.dilution + (effects.dilutionDelta || 0),
      employees: prev.employees + (effects.employeeDelta || 0),
    }));
  }

  function handleStartGame() {
    setGamePhase('email');
  }

  function handleConfirmDecision() {
    if (selectedOption === null) return;
    const option = stage.options[selectedOption];
    
    applyEffects(option.effects);
    setOutcomeNarrative(option.narrative);
    setOutcomeEffects(option.effects);
    setDecisions(prev => [...prev, { stageId: stage.id, stageTitle: stage.title, optionId: option.id, optionLabel: option.label }]);
    
    if (option.isExit) {
      setExitData({ exitType: option.exitType, exitValue: option.exitValue });
    }

    setGamePhase('outcome');
    setSelectedOption(null);
  }

  function handleNextStage() {
    if (exitData) {
      setGamePhase('results');
      return;
    }

    // Check for random event (30% chance, max 2 events per game)
    if (firedEvents.length < 2 && Math.random() < 0.35) {
      const available = randomEvents.filter(e => !firedEvents.includes(e.id));
      if (available.length > 0) {
        const event = available[Math.floor(Math.random() * available.length)];
        setCurrentEvent(event);
        setFiredEvents(prev => [...prev, event.id]);
        applyEffects(event.effects);
        setGamePhase('event');
        return;
      }
    }

    advanceToNextStage();
  }

  function advanceToNextStage() {
    if (currentStage + 1 >= stages.length) {
      setGamePhase('results');
      return;
    }
    // Deduct quarterly P&L between stages
    setFinancials(prev => ({
      ...prev,
      cash: prev.cash + (prev.quarterlyRevenue - prev.quarterlyExpenses),
    }));
    setCurrentStage(prev => prev + 1);
    setGamePhase('email');
  }

  function handleEventAck() {
    advanceToNextStage();
  }

  function handleRestart() {
    setGamePhase('intro');
    setCurrentStage(0);
    setFinancials({ ...companyProfile.initialFinancials });
    setDecisions([]);
    setFiredEvents([]);
    setSelectedOption(null);
    setCurrentEvent(null);
    setOutcomeNarrative('');
    setOutcomeEffects(null);
    setExitData(null);
  }

  const score = useMemo(() => {
    if (gamePhase !== 'results') return 0;
    if (isBankrupt) return 0;
    return calculateScore(financials, decisions, companyProfile.initialFinancials);
  }, [gamePhase, financials, decisions, isBankrupt]);

  const rating = useMemo(() => getCEORating(score), [score]);

  // ==================== RENDER ====================

  // INTRO SCREEN
  if (gamePhase === 'intro') {
    return (
      <div className={styles.container}>
        <div className={styles.introScreen}>
          <div className={styles.introHeader}>
            <span className={styles.contestBadge}>CEO FINANCE SIMULATION</span>
            <h1>48 Months to Save<br />Orion Technologies</h1>
            <p className={styles.introSubtitle}>You are the CEO. Every decision impacts cash, valuation, headcount, and equity. Navigate 6 brutal stages. Don't go bankrupt.</p>
          </div>

          <div className={styles.companyCard}>
            <h3>[ COMPANY PROFILE ]</h3>
            <div className={styles.profileGrid}>
              <div><span className={styles.profileLabel}>Company</span><span className={styles.profileValue}>{companyProfile.name}</span></div>
              <div><span className={styles.profileLabel}>Sector</span><span className={styles.profileValue}>{companyProfile.sector}</span></div>
              <div><span className={styles.profileLabel}>Founded</span><span className={styles.profileValue}>{companyProfile.founded}</span></div>
              <div><span className={styles.profileLabel}>Employees</span><span className={styles.profileValue}>{companyProfile.initialFinancials.employees}</span></div>
              <div><span className={styles.profileLabel}>Product</span><span className={styles.profileValue}>{companyProfile.products}</span></div>
            </div>
          </div>

          <div className={styles.financialBrief}>
            <h3>[ FINANCIAL SITUATION ]</h3>
            <div className={styles.briefGrid}>
              <div className={styles.briefItem}>
                <span className={styles.briefLabel}>Bank Balance</span>
                <span className={styles.briefValue}>{formatMoney(companyProfile.initialFinancials.cash)}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.briefLabel}>Quarterly Revenue</span>
                <span className={styles.briefValue}>{formatMoney(companyProfile.initialFinancials.quarterlyRevenue)}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.briefLabel}>Quarterly Expenses</span>
                <span className={`${styles.briefValue} ${styles.negative}`}>{formatMoney(companyProfile.initialFinancials.quarterlyExpenses)}</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.briefLabel}>Quarterly Loss</span>
                <span className={`${styles.briefValue} ${styles.negative}`}>-$4M</span>
              </div>
              <div className={styles.briefItem}>
                <span className={styles.briefLabel}>Runway</span>
                <span className={`${styles.briefValue} ${styles.warning}`}>~20 months</span>
              </div>
            </div>

            <h4 className={styles.expenseTitle}>Expense Breakdown</h4>
            <div className={styles.expenseTable}>
              {companyProfile.expenseBreakdown.map((item, i) => (
                <div key={i} className={styles.expenseRow}>
                  <span>{item.category}</span>
                  <span className={styles.expenseAmount}>{formatMoney(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.startGameBtn} onClick={handleStartGame}>
            BEGIN SIMULATION →
          </button>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (gamePhase === 'results') {
    return (
      <div className={styles.container}>
        <div className={styles.resultsScreen}>
          <div className={styles.ratingHeader}>
            <span className={styles.ratingEmoji}>{isBankrupt ? '💀' : rating.emoji}</span>
            <h1 style={{ color: isBankrupt ? '#f87171' : rating.color }}>{isBankrupt ? 'BANKRUPT' : rating.title}</h1>
            <p className={styles.ratingDesc}>{isBankrupt ? 'Orion Technologies filed for bankruptcy. All assets liquidated.' : rating.description}</p>
            {exitData && exitData.exitType !== 'bankrupt' && (
              <div className={styles.exitBadge}>
                EXIT: {exitData.exitType === 'acquired' ? `ACQUIRED FOR ${formatMoney(exitData.exitValue)}` : `IPO AT ${formatMoney(exitData.exitValue)} VALUATION`}
              </div>
            )}
          </div>

          <div className={styles.scoreCard}>
            <h3>[ FINAL SCORECARD ]</h3>
            <div className={styles.scoreValue}>{score}<span className={styles.scoreMax}>/100</span></div>
          </div>

          <div className={styles.finalFinancials}>
            <h3>[ FINAL FINANCIALS ]</h3>
            <div className={styles.finalGrid}>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Cash</span>
                <span className={styles.finalValue}>{formatMoney(financials.cash)}</span>
              </div>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Quarterly Revenue</span>
                <span className={styles.finalValue}>{formatMoney(financials.quarterlyRevenue)}</span>
              </div>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Quarterly Expenses</span>
                <span className={styles.finalValue}>{formatMoney(financials.quarterlyExpenses)}</span>
              </div>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Valuation</span>
                <span className={styles.finalValue}>{formatMoney(financials.valuation)}</span>
              </div>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Dilution</span>
                <span className={styles.finalValue}>{financials.dilution}%</span>
              </div>
              <div className={styles.finalItem}>
                <span className={styles.finalLabel}>Employees</span>
                <span className={styles.finalValue}>{financials.employees}</span>
              </div>
            </div>
          </div>

          <div className={styles.decisionsLog}>
            <h3>[ DECISION LOG ]</h3>
            {decisions.map((d, i) => (
              <div key={i} className={styles.decisionEntry}>
                <span className={styles.decisionStage}>Stage {d.stageId}: {d.stageTitle}</span>
                <span className={styles.decisionChoice}>→ {d.optionLabel}</span>
              </div>
            ))}
          </div>

          <div className={styles.resultsActions}>
            <button className={styles.startGameBtn} onClick={handleRestart}>PLAY AGAIN</button>
            <Link href="/earn" className={styles.backBtn}>← BACK TO CONTESTS</Link>
          </div>
        </div>
      </div>
    );
  }

  // GAME SCREEN (email / decision / outcome / event)
  return (
    <div className={styles.gameContainer}>
      {/* FINANCIAL DASHBOARD SIDEBAR */}
      <aside className={styles.dashboard}>
        <div className={styles.dashTitle}>
          <span className={styles.dashLogo}>ORION</span>
          <span className={styles.dashSub}>Financial Dashboard</span>
        </div>

        <div className={styles.dashProgress}>
          <div className={styles.progressLabel}>Stage {currentStage + 1} / {stages.length}</div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }} />
          </div>
        </div>

        <div className={styles.dashMetrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>BANK BALANCE</span>
            <span className={`${styles.metricValue} ${financials.cash < 50_000_000 ? styles.metricDanger : ''}`}>{formatMoney(financials.cash)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Q. REVENUE</span>
            <span className={styles.metricValue}>{formatMoney(financials.quarterlyRevenue)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Q. EXPENSES</span>
            <span className={`${styles.metricValue} ${styles.metricNeg}`}>{formatMoney(financials.quarterlyExpenses)}</span>
          </div>
          <div className={`${styles.metric} ${styles.metricHighlight}`}>
            <span className={styles.metricLabel}>Q. P&L</span>
            <span className={`${styles.metricValue} ${quarterlyPL >= 0 ? styles.metricPos : styles.metricNeg}`}>{formatDelta(quarterlyPL)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>RUNWAY</span>
            <span className={`${styles.metricValue} ${runway !== '∞' ? styles.metricWarn : ''}`}>{runway}</span>
          </div>

          <div className={styles.dashDivider} />

          <div className={styles.metric}>
            <span className={styles.metricLabel}>VALUATION</span>
            <span className={styles.metricValue}>{formatMoney(financials.valuation)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>DILUTION</span>
            <span className={`${styles.metricValue} ${financials.dilution > 20 ? styles.metricWarn : ''}`}>{financials.dilution}%</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>HEADCOUNT</span>
            <span className={styles.metricValue}>{financials.employees}</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={styles.gameMain}>
        <div className={styles.stageHeader}>
          <span className={styles.stageTag}>STAGE {stage.id}</span>
          <h2 className={styles.stageTitle}>{stage.title}</h2>
          <span className={styles.stageQuarter}>{stage.quarter}</span>
        </div>

        {/* EMAIL PHASE */}
        {gamePhase === 'email' && (
          <div className={styles.emailPhase}>
            <div className={styles.emailCard}>
              <div className={styles.emailHeader}>
                <div className={styles.emailMeta}>
                  <span className={styles.emailFrom}>FROM: {stage.email.from}</span>
                  <span className={styles.emailSubject}>SUBJECT: {stage.email.subject}</span>
                </div>
                <span className={styles.emailIcon}>📧</span>
              </div>
              <div className={styles.emailBody}>
                {stage.email.body.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className={styles.contextBox}>
              <h4>[ KEY CONSIDERATIONS ]</h4>
              <ul>
                {stage.context.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            <button className={styles.proceedBtn} onClick={() => setGamePhase('decision')}>
              REVIEW YOUR OPTIONS →
            </button>
          </div>
        )}

        {/* DECISION PHASE */}
        {gamePhase === 'decision' && (
          <div className={styles.decisionPhase}>
            <h3 className={styles.decisionPrompt}>[ MAKE YOUR DECISION ]</h3>

            <div className={styles.optionsGrid}>
              {stage.options.map((opt, i) => (
                <button
                  key={opt.id}
                  className={`${styles.optionCard} ${selectedOption === i ? styles.optionSelected : ''}`}
                  onClick={() => setSelectedOption(i)}
                >
                  <span className={styles.optionLabel}>{opt.label}</span>
                  <p className={styles.optionDesc}>{opt.description}</p>
                  <div className={styles.optionEffects}>
                    {opt.effects.cashDelta !== 0 && <span className={opt.effects.cashDelta > 0 ? styles.effectPos : styles.effectNeg}>Cash: {formatDelta(opt.effects.cashDelta)}</span>}
                    {opt.effects.quarterlyRevenueDelta !== 0 && <span className={opt.effects.quarterlyRevenueDelta > 0 ? styles.effectPos : styles.effectNeg}>Revenue: {formatDelta(opt.effects.quarterlyRevenueDelta)}/Q</span>}
                    {opt.effects.quarterlyExpensesDelta !== 0 && <span className={opt.effects.quarterlyExpensesDelta < 0 ? styles.effectPos : styles.effectNeg}>Expenses: {formatDelta(opt.effects.quarterlyExpensesDelta)}/Q</span>}
                    {opt.effects.dilutionDelta !== 0 && <span className={styles.effectNeg}>Dilution: +{opt.effects.dilutionDelta}%</span>}
                    {opt.effects.employeeDelta !== 0 && <span className={opt.effects.employeeDelta > 0 ? styles.effectPos : styles.effectNeg}>Headcount: {opt.effects.employeeDelta > 0 ? '+' : ''}{opt.effects.employeeDelta}</span>}
                  </div>
                </button>
              ))}
            </div>

            {selectedOption !== null && (
              <button className={styles.confirmBtn} onClick={handleConfirmDecision}>
                CONFIRM DECISION
              </button>
            )}
          </div>
        )}

        {/* OUTCOME PHASE */}
        {gamePhase === 'outcome' && (
          <div className={styles.outcomePhase}>
            <div className={styles.outcomeCard}>
              <h3>[ OUTCOME ]</h3>
              <p className={styles.outcomeText}>{outcomeNarrative}</p>

              {outcomeEffects && (
                <div className={styles.impactGrid}>
                  <h4>Financial Impact</h4>
                  <div className={styles.impactItems}>
                    {outcomeEffects.cashDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Cash</span>
                        <span className={outcomeEffects.cashDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(outcomeEffects.cashDelta)}</span>
                      </div>
                    )}
                    {outcomeEffects.quarterlyRevenueDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Q. Revenue</span>
                        <span className={outcomeEffects.quarterlyRevenueDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(outcomeEffects.quarterlyRevenueDelta)}/Q</span>
                      </div>
                    )}
                    {outcomeEffects.quarterlyExpensesDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Q. Expenses</span>
                        <span className={outcomeEffects.quarterlyExpensesDelta < 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(outcomeEffects.quarterlyExpensesDelta)}/Q</span>
                      </div>
                    )}
                    {outcomeEffects.valuationDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Valuation</span>
                        <span className={outcomeEffects.valuationDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(outcomeEffects.valuationDelta)}</span>
                      </div>
                    )}
                    {outcomeEffects.dilutionDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Dilution</span>
                        <span className={styles.impactNeg}>+{outcomeEffects.dilutionDelta}%</span>
                      </div>
                    )}
                    {outcomeEffects.employeeDelta !== 0 && (
                      <div className={styles.impactItem}>
                        <span>Headcount</span>
                        <span className={outcomeEffects.employeeDelta > 0 ? styles.impactPos : styles.impactNeg}>{outcomeEffects.employeeDelta > 0 ? '+' : ''}{outcomeEffects.employeeDelta}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button className={styles.proceedBtn} onClick={handleNextStage}>
              {exitData ? 'VIEW FINAL RESULTS' : currentStage + 1 >= stages.length ? 'VIEW FINAL RESULTS' : 'PROCEED TO NEXT STAGE →'}
            </button>
          </div>
        )}

        {/* RANDOM EVENT PHASE */}
        {gamePhase === 'event' && currentEvent && (
          <div className={styles.eventPhase}>
            <div className={styles.eventCard}>
              <div className={styles.eventBanner}>⚡ BREAKING EVENT</div>
              <div className={styles.eventIcon}>{currentEvent.icon}</div>
              <h3 className={styles.eventTitle}>{currentEvent.title}</h3>
              <p className={styles.eventDesc}>{currentEvent.description}</p>

              <div className={styles.eventImpact}>
                <h4>Automatic Financial Impact</h4>
                <div className={styles.impactItems}>
                  {currentEvent.effects.cashDelta !== 0 && (
                    <div className={styles.impactItem}>
                      <span>Cash</span>
                      <span className={currentEvent.effects.cashDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(currentEvent.effects.cashDelta)}</span>
                    </div>
                  )}
                  {currentEvent.effects.quarterlyRevenueDelta !== 0 && (
                    <div className={styles.impactItem}>
                      <span>Q. Revenue</span>
                      <span className={currentEvent.effects.quarterlyRevenueDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(currentEvent.effects.quarterlyRevenueDelta)}/Q</span>
                    </div>
                  )}
                  {currentEvent.effects.quarterlyExpensesDelta !== 0 && (
                    <div className={styles.impactItem}>
                      <span>Q. Expenses</span>
                      <span className={currentEvent.effects.quarterlyExpensesDelta < 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(currentEvent.effects.quarterlyExpensesDelta)}/Q</span>
                    </div>
                  )}
                  {currentEvent.effects.valuationDelta !== 0 && (
                    <div className={styles.impactItem}>
                      <span>Valuation</span>
                      <span className={currentEvent.effects.valuationDelta > 0 ? styles.impactPos : styles.impactNeg}>{formatDelta(currentEvent.effects.valuationDelta)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button className={styles.proceedBtn} onClick={handleEventAck}>
              ACKNOWLEDGED — CONTINUE →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
