import episodes from '../../../data/episodes.json'

function getEpisodeBySlug(slug) {
  return episodes.find(e => e.slug === slug)
}

export default function EpisodeDetail({ params }) {
  const { slug } = params
  const episode = getEpisodeBySlug(slug)
  if (!episode) {
    return (<main><h1>Episode not found</h1></main>)
  }
  return (
    <main>
      <h1>{episode.title}</h1>
      <div className="meta">{episode.publication_date} · {episode.duration}</div>
      <img src={episode.artwork} alt="Artwork" />
      <p>{episode.full_notes}</p>
      <section className="player">
        <p>Mock player: {episode.audio_url}</p>
        <button aria-label="Play">Play</button>
        <button aria-label="Pause">Pause</button>
      </section>
      <section className="transcript">
        <h2>Transcript</h2>
        <pre>{episode.transcript}</pre>
      </section>
    </main>
  )
}
