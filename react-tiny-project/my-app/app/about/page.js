export default function AboutPage() {
  return (
    <main>
      <h1>About the Show</h1>
      <p>This show explores modern creative practice, design, and the business of making things.</p>
      <section>
        <h2>Hosts</h2>
        <div className="host">
          <img src="/images/host-1.jpg" alt="Host 1" />
          <h3>Host One</h3>
          <p>Short bio for host one.</p>
        </div>
        <div className="host">
          <img src="/images/host-2.jpg" alt="Host 2" />
          <h3>Host Two</h3>
          <p>Short bio for host two.</p>
        </div>
      </section>
    </main>
  )
}
