import episodes from '../../data/episodes.json'

export default function EpisodesPage() {
  const pageItems = episodes.slice(0, 20)
  return (
    <main>
      <h1>Episodes</h1>
      <ul>
        {pageItems.map(ep => (
          <li key={ep.slug}>
            <a href={`/episodes/${ep.slug}`}>{ep.title}</a>
            <div className="meta">{ep.publication_date} · {ep.duration}</div>
            <p>{ep.short_description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
