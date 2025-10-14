import './globals.css'
import { getAllEpisodes } from '../lib/episodes'

function FeaturedEpisode({ episode }) {
  if (!episode) return null
  return (
    <section className="hero">
      <img src={episode.artwork} alt="Artwork" className="hero-artwork" />
      <div className="hero-content">
        <h1>{episode.title}</h1>
        <p>{episode.short_description}</p>
        <a href={`/episodes/${episode.slug}`} className="btn">Listen</a>
      </div>
    </section>
  )
}

export default function Home() {
  const featured = getAllEpisodes()[0]
  return (
    <main>
      <FeaturedEpisode episode={featured} />
      <section className="preview-list">
        <h2>Latest Episodes</h2>
        <ul>
          {getAllEpisodes().slice(0,4).map(ep => (
            <li key={ep.slug}>
              <a href={`/episodes/${ep.slug}`}>{ep.title} — {ep.duration}</a>
            </li>
          ))}
        </ul>
        <a href="/episodes" className="btn">View all episodes</a>
      </section>
    </main>
  )
}
