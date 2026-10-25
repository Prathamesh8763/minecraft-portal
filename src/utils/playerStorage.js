/**
 * Safe Local Player Storage & Bookmark Service
 * 
 * Enables visitors to save article bookmarks and resume recently viewed guides
 * 100% locally in browser memory without requiring user accounts or third-party tracking.
 */

const BOOKMARKS_STORAGE_KEY = 'mc_player_bookmarks';
const RECENT_STORAGE_KEY = 'mc_player_recent_history';
const ACTIVE_TOPIC_KEY = 'mc_active_topic_id';

/**
 * Stores the user's active topic ID preference
 * @param {string|number} id
 */
export function setActiveTopicIdPref(id) {
  try {
    localStorage.setItem(ACTIVE_TOPIC_KEY, String(id));
  } catch (err) {
    // Fail silently
  }
}

/**
 * Retrieves the user's active topic ID preference
 * @returns {number|null}
 */
export function getActiveTopicIdPref() {
  try {
    const val = localStorage.getItem(ACTIVE_TOPIC_KEY);
    return val ? Number(val) : null;
  } catch {
    return null;
  }
}

/**
 * Safely reads bookmarks from localStorage
 * @returns {string[]} Array of saved IDs
 */
export function getSavedBookmarks() {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('LocalStorage unavailable for bookmarks:', err);
    return [];
  }
}

/**
 * Toggles a bookmark ID in localStorage
 * @param {string|number} id - Unique item or topic ID
 * @returns {boolean} Whether the item is now bookmarked
 */
export function toggleSavedBookmark(id) {
  try {
    const strId = String(id);
    const existing = getSavedBookmarks();
    const set = new Set(existing);
    let isNowSaved = false;

    if (set.has(strId)) {
      set.delete(strId);
      isNowSaved = false;
    } else {
      set.add(strId);
      isNowSaved = true;
    }

    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(Array.from(set)));
    return isNowSaved;
  } catch (err) {
    console.warn('Failed to update bookmarks:', err);
    return false;
  }
}

/**
 * Checks if an item is bookmarked
 * @param {string|number} id
 * @returns {boolean}
 */
export function isItemBookmarked(id) {
  const existing = getSavedBookmarks();
  return existing.includes(String(id));
}

/**
 * Retrieves recently viewed articles/tools (up to maxCount)
 * @param {number} maxCount
 * @returns {Array<{id: string, title: string, category: string, route: string, timestamp: number}>}
 */
export function getRecentlyViewed(maxCount = 6) {
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return list.slice(0, maxCount);
  } catch (err) {
    return [];
  }
}

/**
 * Records an article/tool view into recent history
 */
export function recordRecentlyViewed(entry) {
  if (!entry || !entry.id || !entry.title) return;

  try {
    const current = getRecentlyViewed(10);
    const filtered = current.filter(item => String(item.id) !== String(entry.id));
    const updated = [
      {
        id: String(entry.id),
        title: entry.title,
        category: entry.category || 'Guide',
        route: entry.route || 'encyclopedia',
        timestamp: Date.now()
      },
      ...filtered
    ].slice(0, 8);

    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    // Fail silently if localStorage is restricted
  }
}

/**
 * Clears all local player data (bookmarks and recent history)
 */
export function clearAllPlayerData() {
  try {
    localStorage.removeItem(BOOKMARKS_STORAGE_KEY);
    localStorage.removeItem(RECENT_STORAGE_KEY);
    localStorage.removeItem(ACTIVE_TOPIC_KEY);
    return true;
  } catch (err) {
    return false;
  }
}
