// Simple helper to load mock episodes data (ES Module)
import episodes from '../data/episodes.json'

export function getAllEpisodes() {
  return Array.isArray(episodes) ? episodes.slice() : []
}

export function getEpisodeBySlug(slug) {
  return getAllEpisodes().find(e => e.slug === slug)
}
