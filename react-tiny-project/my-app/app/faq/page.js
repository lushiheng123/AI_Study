export default function FaqPage() {
  const faqs = [
    { q: 'How can I listen?', a: 'Play episodes on the site or download the audio.' },
    { q: 'Can I sponsor the show?', a: 'Yes — contact us via the About page links.' },
    { q: 'How often do you publish?', a: 'We publish roughly weekly during a season.' }
  ]
  return (
    <main>
      <h1>FAQ</h1>
      <ul>
        {faqs.map((f, i) => (
          <li key={i}>
            <strong>{f.q}</strong>
            <p>{f.a}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
