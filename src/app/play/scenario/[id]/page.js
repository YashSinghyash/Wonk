'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { scenarios } from '../../scenarios';
import styles from './Scenario.module.css';

export default function ScenarioPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = parseInt(params.id);
  const scenario = scenarios.find(s => s.id === scenarioId);
  const [showCase, setShowCase] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!scenario) {
    return (
      <div className={styles.container}>
        <div className={styles.errorBox}>
          <h2>[ SCENARIO NOT FOUND ]</h2>
          <button className={styles.btn} onClick={() => router.push('/play')}>Return to Play</button>
        </div>
      </div>
    );
  }

  const { content } = scenario;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.metadata}>
          <span className={styles.tag}>{scenario.tag}</span>
          <span className={`${styles.diff} ${styles['diff' + scenario.difficulty]}`}>{scenario.difficulty}</span>
          <span className={styles.scenarioNo}>Scenario #{scenario.id}</span>
        </div>
        <h1>{scenario.title}</h1>
      </header>

      <div className={styles.contentLayout}>
        <div className={styles.leftColumn}>
          <section className={styles.sectionCard}>
            <h3>[ ROLE ]</h3>
            <p className={styles.roleText}>{content.role}</p>
          </section>

          <section className={styles.sectionCard}>
            <h3>[ CONTEXT ]</h3>
            <ul className={styles.bulletList}>
              {content.context.map((point, i) => <li key={i}>{point}</li>)}
            </ul>
          </section>

          <section className={styles.sectionCard}>
            <h3>[ THE DILEMMA ]</h3>
            <ul className={styles.bulletList}>
              {content.problem.map((point, i) => <li key={i} className={styles.problemText}>{point}</li>)}
            </ul>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.sectionCard}>
            <h3>[ OPTIONS ]</h3>
            <p className={styles.promptText}>What do you do?</p>
            <div className={styles.optionsList}>
              {content.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                const showFeedback = hasSubmitted && isSelected;
                
                let optionClass = styles.optionItem;
                if (isSelected) optionClass += ` ${styles.selected}`;
                if (hasSubmitted) {
                  if (isSelected && opt.isCorrect) optionClass += ` ${styles.correctOption}`;
                  if (isSelected && !opt.isCorrect) optionClass += ` ${styles.incorrectOption}`;
                  if (!isSelected) optionClass += ` ${styles.disabledOption}`;
                }

                return (
                  <div key={i} className={styles.optionWrapper}>
                    <button 
                      className={optionClass} 
                      onClick={() => !hasSubmitted && setSelectedOption(i)}
                      disabled={hasSubmitted}
                    >
                      {opt.text}
                    </button>
                    {showFeedback && (
                      <div className={`${styles.feedbackBox} ${opt.isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}>
                        <strong>{opt.isCorrect ? '[ CORRECT ]' : '[ INCORRECT ]'}</strong> {opt.feedback}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedOption !== null && !hasSubmitted && (
              <button className={`${styles.btn} ${styles.submitBtn}`} onClick={() => setHasSubmitted(true)}>
                SUBMIT DECISION
              </button>
            )}
          </section>

          {!showCase && hasSubmitted ? (
            <button className={`${styles.btn} ${styles.revealBtn}`} onClick={() => setShowCase(true)}>
              REVEAL REAL CASE OUTCOME
            </button>
          ) : showCase ? (
            <section className={`${styles.sectionCard} ${styles.realCaseCard}`}>
              <h3>[ REAL WORLD CASE STUDY ]</h3>
              <div className={styles.caseDetails}>
                <p><strong>Inspired By:</strong> {content.realCase.inspiredBy} (CFO: {content.realCase.cfo})</p>
                
                <h4>What Happened:</h4>
                <ul className={styles.bulletList}>
                  {content.realCase.whatHappened.map((point, i) => <li key={i}>{point}</li>)}
                </ul>

                <h4>Outcome:</h4>
                <ul className={styles.bulletList}>
                  {content.realCase.outcome.map((point, i) => <li key={i}>{point}</li>)}
                </ul>

                  <div className={styles.lessonBox}>
                    <strong>VERDICT:</strong> {content.realCase.lesson}
                  </div>
                </div>
              </section>
            ) : null}

            <div className={styles.navActions}>
            <Link href="/play" className={`${styles.btn} ${styles.outlineBtn}`}>
              ← BACK TO SCENARIOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
