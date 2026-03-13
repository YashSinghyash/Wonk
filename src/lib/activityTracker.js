// Activity Tracker - localStorage-based activity log and completion tracking

const STORAGE_KEY = 'wonk_activity_log';
const COMPLETION_KEY = 'wonk_completed';

export function logActivity(type, title, detail = '') {
  if (typeof window === 'undefined') return;
  const log = getActivityLog();
  log.unshift({
    id: Date.now(),
    type, // 'learn' | 'play' | 'earn' | 'simulator'
    title,
    detail,
    timestamp: new Date().toISOString(),
  });
  // Keep last 100 activities
  if (log.length > 100) log.length = 100;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
}

export function getActivityLog() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function markCompleted(topicId) {
  if (typeof window === 'undefined') return;
  const completed = getCompleted();
  if (!completed.includes(topicId)) {
    completed.push(topicId);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(completed));
  }
}

export function getCompleted() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(COMPLETION_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isCompleted(topicId) {
  return getCompleted().includes(topicId);
}

export function clearAllData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COMPLETION_KEY);
}
