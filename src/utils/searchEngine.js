/**
 * High-Performance Search & Indexing Engine
 * 
 * Implements high-value computer science concepts for optimal time & space complexity:
 * 1. Precomputed Search Indexes: One-time O(N) normalization instead of O(N*M) on every keystroke.
 * 2. Hash Maps (Map / Set): Instant O(1) lookups by ID, slug, or category instead of O(N) Array.find/filter.
 * 3. Debouncing: Defers expensive search operations until typing pauses (prevents render thrashing).
 * 4. Memoization & Windowing: Bound results to prevent unneeded Virtual DOM reconciliation.
 */

import { useState, useEffect, useMemo } from 'react';

/**
 * Custom React hook for debouncing input values.
 * Reduces search frequency from every single keystroke down to one execution per pause.
 * 
 * @param {any} value - The input value to debounce
 * @param {number} delayMs - Delay in milliseconds (default: 150ms)
 * @returns {any} The debounced value
 */
export function useDebounce(value, delayMs = 150) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}

/**
 * Builds an O(1) Hash Map index for instant lookup by primary key.
 * 
 * @template T
 * @param {T[]} items - Array of records
 * @param {string} keyField - Field name to index by (default: 'id')
 * @returns {Map<any, T>} Map from key to item
 */
export function buildIdMap(items, keyField = 'id') {
  const map = new Map();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item && item[keyField] !== undefined) {
      map.set(item[keyField], item);
    }
  }
  return map;
}

/**
 * Builds an O(1) Multi-Map index grouping items by category.
 * 
 * @template T
 * @param {T[]} items - Array of records
 * @param {string} categoryField - Field name representing the category
 * @returns {Map<string, T[]>} Map from category to items array
 */
export function buildCategoryMultiMap(items, categoryField = 'categoryId') {
  const map = new Map();
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const cat = item[categoryField];
    if (cat !== undefined) {
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat).push(item);
    }
  }
  return map;
}

/**
 * Precomputes normalized search text for an array of items once.
 * Eliminates repeated lowercase operations and string concatenation during typing.
 * 
 * @template T
 * @param {T[]} items - Array of items to index
 * @param {(item: T) => string[]} extractFields - Function extracting searchable string fragments
 * @returns {(T & { _searchTokens: string[], _searchHaystack: string })[]} Pre-indexed items
 */
export function precomputeSearchIndex(items, extractFields) {
  return items.map(item => {
    const fields = extractFields(item);
    const haystack = fields
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/\s+/g, ' ');

    return {
      ...item,
      _searchHaystack: haystack,
      _searchTokens: haystack.split(' ').filter(t => t.length > 1)
    };
  });
}

/**
 * Executes a tokenized search against precomputed indexed items.
 * Uses early exit to bound output size for responsive UI rendering.
 * 
 * @template T
 * @param {T[]} indexedItems - Items pre-processed by precomputeSearchIndex
 * @param {string} rawQuery - The search query
 * @param {number} maxResults - Max items to return (default: 40)
 * @returns {T[]} Filtered search results
 */
export function querySearchIndex(indexedItems, rawQuery, maxResults = 40) {
  if (!rawQuery || typeof rawQuery !== 'string') return indexedItems;

  const normalizedQuery = rawQuery.toLowerCase().trim();
  if (!normalizedQuery) return indexedItems;

  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  if (!queryTokens.length) return indexedItems;

  const results = [];
  for (let i = 0; i < indexedItems.length; i++) {
    const item = indexedItems[i];
    const haystack = item._searchHaystack || '';
    
    // Check if every query token exists in the precomputed haystack
    let matches = true;
    for (let t = 0; t < queryTokens.length; t++) {
      if (!haystack.includes(queryTokens[t])) {
        matches = false;
        break;
      }
    }

    if (matches) {
      results.push(item);
      if (results.length >= maxResults) break;
    }
  }

  return results;
}

/**
 * Natural Player Query Resolvers
 * Connects conversational player inquiries (e.g. "how to get mending", "too expensive")
 * with exact mechanics, aliases, and canonical guides.
 */
export const NATURAL_QUERY_ALIASES = [
  {
    patterns: ['how to get mending', 'where to find mending', 'mending book', 'mending trade', 'mending'],
    targetTokens: ['mending', 'enchantment'],
    intentBadge: 'Librarian Trading & Fishing',
    targetRoute: 'enchanting',
    title: 'How to Obtain Mending & God Books'
  },
  {
    patterns: ['villager trade reset', 'reset trades', 'change villager job', 'cure villager', 'trade reset'],
    targetTokens: ['trading', 'villager', 'workstation'],
    intentBadge: 'Workstation Mechanics',
    targetRoute: 'trading',
    title: 'Villager Workstation Linking & Trade Resetting'
  },
  {
    patterns: ['best mace enchantments', 'mace build', 'smash damage', 'wind burst', 'mace enchants'],
    targetTokens: ['mace', 'density', 'breach', 'wind burst'],
    intentBadge: 'Mace Kinetic Mechanics',
    targetRoute: 'enchanting',
    title: 'Optimal 1.21 Heavy Mace Enchantment Build'
  },
  {
    patterns: ['god armor', 'best armor', 'maximum protection', 'unbreakable armor', 'armor build'],
    targetTokens: ['god armor', 'netherite', 'protection'],
    intentBadge: 'Definitive Armor Meta',
    targetRoute: 'enchanting',
    title: 'Full 4-Piece God Armor Set Blueprint'
  },
  {
    patterns: ['too expensive', 'anvil limit', 'anvil penalty', 'work penalty', 'anvil too expensive'],
    targetTokens: ['anvil', 'too expensive', 'binary tree'],
    intentBadge: 'Prior Work Optimization',
    targetRoute: 'enchanting',
    title: 'Anvil Binary Merge Tree (Avoid "Too Expensive!")'
  },
  {
    patterns: ['iron farm', 'iron golem spawn', 'poppy farm', 'infinite iron'],
    targetTokens: ['iron farm', 'golem', 'crafting'],
    intentBadge: 'Automation Blueprint',
    targetRoute: 'crafting',
    title: 'Iron Golem Spawning & Mass Iron Farm'
  },
  {
    patterns: ['straw bed', 'sleep without spawn', 'skip night', 'nomad bed'],
    targetTokens: ['straw bed', 'camping', 'wilderness'],
    intentBadge: 'Java 26.3 Wilderness Bound',
    targetRoute: 'drops',
    title: 'Straw Bed Camping (Skip Night Without Resetting Spawn)'
  }
];

export function resolveNaturalPlayerQuery(rawQuery) {
  if (!rawQuery || typeof rawQuery !== 'string') return null;
  const q = rawQuery.toLowerCase().trim();
  if (q.length < 3) return null;

  for (let i = 0; i < NATURAL_QUERY_ALIASES.length; i++) {
    const alias = NATURAL_QUERY_ALIASES[i];
    if (alias.patterns.some(p => q.includes(p) || p.includes(q))) {
      return alias;
    }
  }
  return null;
}
