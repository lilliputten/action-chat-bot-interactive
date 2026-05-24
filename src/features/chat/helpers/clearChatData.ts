import { chatDB } from '../ChatDB';

export function clearChatData() {
  // Clear all possible previous data...
  chatDB.clear();
  localStorage.removeItem('scenarioId');
  localStorage.removeItem('chatStats');
}
