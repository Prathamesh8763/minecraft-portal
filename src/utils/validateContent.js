/**
 * Automated Content & Semantic Validation Suite
 * 
 * Verifies encyclopedia integrity, duplicate detection, broken internal references,
 * and valid routing metadata across the entire Minecraft Portal dataset.
 */

import { ENCYCLOPEDIA_TOPICS, POPULAR_GUIDES, ENCYCLOPEDIA_CATEGORIES } from '../data/minecraftEncyclopediaData.js';
import { NAVIGATION_ITEMS, NAVIGATION_CATEGORIES } from '../data/navigationRoutes.js';

export function validateAllContent() {
  const errors = [];
  const warnings = [];

  // 1. Validate ENCYCLOPEDIA_TOPICS
  const topicIds = new Set();
  const topicSlugs = new Set();
  const validCategoryIds = new Set(ENCYCLOPEDIA_CATEGORIES.map(c => c.id));
  const validNavToolIds = new Set(NAVIGATION_ITEMS.map(n => n.id));

  ENCYCLOPEDIA_TOPICS.forEach((topic, idx) => {
    // Check ID uniqueness
    if (topicIds.has(topic.id)) {
      errors.push(`Topic #${idx}: Duplicate topic ID '${topic.id}' found.`);
    }
    topicIds.add(topic.id);

    // Check slug uniqueness
    if (topicSlugs.has(topic.slug)) {
      errors.push(`Topic #${topic.id}: Duplicate slug '${topic.slug}' found.`);
    }
    topicSlugs.add(topic.slug);

    // Check required fields
    const requiredFields = ['id', 'slug', 'title', 'categoryId', 'applicableVersions', 'lastVerified', 'summary', 'sections'];
    requiredFields.forEach(field => {
      if (!topic[field]) {
        errors.push(`Topic #${topic.id} (${topic.title || 'Untitled'}): Missing required field '${field}'.`);
      }
    });

    // Validate category association
    if (topic.categoryId && !validCategoryIds.has(topic.categoryId)) {
      errors.push(`Topic #${topic.id}: Invalid categoryId '${topic.categoryId}'.`);
    }

    // Validate interactive tool pointer
    if (topic.interactiveToolId && !validNavToolIds.has(topic.interactiveToolId)) {
      errors.push(`Topic #${topic.id}: interactiveToolId '${topic.interactiveToolId}' does not match any valid navigation route.`);
    }

    // Validate related topics
    if (Array.isArray(topic.relatedTopicIds)) {
      topic.relatedTopicIds.forEach(relId => {
        if (!ENCYCLOPEDIA_TOPICS.some(t => t.id === relId)) {
          warnings.push(`Topic #${topic.id}: relatedTopicId '${relId}' points to a non-existent topic.`);
        }
      });
    }
  });

  // 2. Validate POPULAR_GUIDES
  const guideIds = new Set();
  POPULAR_GUIDES.forEach(guide => {
    if (guideIds.has(guide.id)) {
      errors.push(`Popular Guide: Duplicate guide ID '${guide.id}'.`);
    }
    guideIds.add(guide.id);

    if (guide.topicId && !topicIds.has(guide.topicId)) {
      errors.push(`Popular Guide '${guide.title}': Points to invalid topicId '${guide.topicId}'.`);
    }

    if (guide.toolId && !validNavToolIds.has(guide.toolId)) {
      errors.push(`Popular Guide '${guide.title}': Points to invalid toolId '${guide.toolId}'.`);
    }
  });

  // 3. Validate NAVIGATION_ITEMS
  const navIds = new Set();
  const navCatIds = new Set(NAVIGATION_CATEGORIES.map(c => c.id));
  NAVIGATION_ITEMS.forEach(nav => {
    if (navIds.has(nav.id)) {
      errors.push(`Navigation Item: Duplicate ID '${nav.id}'.`);
    }
    navIds.add(nav.id);

    if (!navCatIds.has(nav.categoryId)) {
      errors.push(`Navigation Item '${nav.label}': Invalid categoryId '${nav.categoryId}'.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalTopics: ENCYCLOPEDIA_TOPICS.length,
      totalGuides: POPULAR_GUIDES.length,
      totalNavItems: NAVIGATION_ITEMS.length,
      totalCategories: ENCYCLOPEDIA_CATEGORIES.length
    }
  };
}

// Self-executing CLI validation check
if (typeof process !== 'undefined' && process.argv && process.argv[1]?.endsWith('validateContent.js')) {
  console.log('--- Minecraft Portal Semantic Content Validation ---');
  const result = validateAllContent();
  console.log(`Verified ${result.stats.totalTopics} Topics, ${result.stats.totalGuides} Guides, ${result.stats.totalNavItems} Navigation Items.`);
  
  if (result.warnings.length > 0) {
    console.warn(`[WARNINGS] (${result.warnings.length}):`);
    result.warnings.forEach(w => console.warn(`  - ${w}`));
  }

  if (result.errors.length > 0) {
    console.error(`[ERRORS] (${result.errors.length}):`);
    result.errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('[SUCCESS] All content, slugs, and navigation routes are 100% valid with 0 errors.');
    process.exit(0);
  }
}
