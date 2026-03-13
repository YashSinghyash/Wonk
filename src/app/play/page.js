import Link from 'next/link';
import styles from './Play.module.css';
import { scenarios } from './scenarios';

export default function PlayPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Play</h1>
        <p>Put your knowledge to the test. Step into the boardroom.</p>
      </header>

      <section className={styles.scenarioSection}>
        <h2>[ The Boardroom Scenarios ]</h2>
        <table className={styles.scenarioTable}>
          <thead>
            <tr>
              <th className={styles.statusCell}>Status</th>
              <th className={styles.titleCell}>Title</th>
              <th className={styles.tagCell}>Tag</th>
              <th className={styles.diffCell}>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <Link href={`/play/scenario/${scenario.id}`} key={scenario.id} legacyBehavior>
                <tr className={styles.scenarioRow}>
                  <td className={styles.statusCell}>
                    <span className={`${styles.statusIcon} ${scenario.status === 'solved' ? styles.solved : ''}`}></span>
                  </td>
                  <td className={styles.titleCell}>
                    <span className={styles.scenarioTitle}>{scenario.id}. {scenario.title}</span>
                    <span className={styles.scenarioDesc}>{scenario.description}</span>
                  </td>
                  <td className={styles.tagCell}>
                    <span className={styles.tagLabel}>{scenario.tag}</span>
                  </td>
                  <td className={styles.diffCell}>
                    <span className={
                      scenario.difficulty === 'Easy' ? styles.diffEasy :
                      scenario.difficulty === 'Medium' ? styles.diffMedium : styles.diffHard
                    }>
                      {scenario.difficulty}
                    </span>
                  </td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
