import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { getArticles, type Article } from "../service/article"

const apiOrigin = "http://localhost:3000"

function Home() {
  const { user, logout } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    getArticles()
      .then((response) => setArticles(response.data.data))
      .catch(() => setLoadError("We couldn't load the latest stories. Please refresh and try again."))
      .finally(() => setLoadingArticles(false))
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#282730]">
      <header className="border-b border-[#e8e3dc] bg-[#f8f6f1]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight"><span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-full rounded-bl-sm bg-[#df765d] font-serif text-2xl text-white">i</span> inkline</Link>
          <nav className="hidden items-center gap-8 text-sm text-[#77747d] md:flex"><a href="#discover" className="hover:text-[#c65e49]">Discover</a><a href="#latest" className="hover:text-[#c65e49]">Stories</a><a href="#about" className="hover:text-[#c65e49]">About</a><Link to="/create-article" className="font-semibold text-[#c65e49]">Write an article</Link></nav>
          <div className="flex items-center gap-3"><span className="hidden max-w-40 truncate text-sm text-[#77747d] sm:block">{user?.email}</span><button onClick={logout} className="rounded-lg border border-[#ded9d2] px-3 py-2 text-sm font-semibold hover:border-[#df765d] hover:text-[#c65e49]">Sign out</button></div>
        </div>
      </header>

      <section id="discover" className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:py-24">
        <div><p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#c65e49]">A better way to read</p><h1 className="max-w-xl font-serif text-6xl leading-[.94] tracking-[-.07em] sm:text-8xl">Ideas worth<br /><em className="text-[#df765d]">your time.</em></h1><p className="mt-7 max-w-md text-base leading-7 text-[#77747d]">Thoughtful stories, practical perspectives, and fresh voices — curated for curious people.</p><div className="mt-9 flex flex-wrap gap-3"><Link to="/create-article" className="rounded-lg bg-[#df765d] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#df765d]/20 hover:bg-[#c85d49]">Share your story <span aria-hidden="true">→</span></Link><a href="#latest" className="rounded-lg border border-[#ded9d2] px-5 py-3 text-sm font-semibold hover:border-[#df765d]">Explore stories</a></div></div>
        <div className="relative h-[330px] overflow-hidden rounded-[48%_52%_45%_55%] bg-[#f0ded3] sm:h-[430px]"><div className="absolute right-10 top-9 h-64 w-64 rounded-full bg-[#efb397]" /><div className="absolute left-14 top-16 h-24 w-24 rounded-full bg-[#d4816c]" /><div className="absolute bottom-8 left-28 h-36 w-36 rounded-full bg-[#b2b6d0]" /><div className="absolute left-[22%] top-20 w-60 -rotate-6 bg-[#fffdf9] p-7 shadow-2xl"><span className="text-[9px] font-bold tracking-[.16em] text-[#c65e49]">FEATURED ESSAY</span><h2 className="mt-6 font-serif text-2xl leading-tight">The quiet power<br />of paying attention</h2><div className="mt-7 h-0.5 w-11 bg-[#df765d]" /><p className="mt-4 text-xs text-[#77747d]">By Maya Chen</p></div></div>
      </section>

      <section id="latest" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-[#e2ded8] pb-5"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#c65e49]">Fresh from the community</p><h2 className="font-serif text-4xl tracking-[-.05em]">Latest stories</h2></div><span className="text-xs text-[#77747d]">{articles.length} published</span></div>
        {loadingArticles && <p className="py-12 text-center text-sm text-[#77747d]">Loading stories...</p>}
        {loadError && <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{loadError}</p>}
        {!loadingArticles && !loadError && articles.length === 0 && <div className="rounded-2xl border border-dashed border-[#d8d1ca] p-12 text-center"><p className="font-serif text-2xl">No stories yet.</p><p className="mt-2 text-sm text-[#77747d]">Be the first person to share an idea.</p><Link to="/create-article" className="mt-5 inline-block rounded-lg bg-[#df765d] px-5 py-3 text-sm font-semibold text-white">Write an article →</Link></div>}
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => <article key={article._id} className="overflow-hidden bg-white shadow-sm transition hover:-translate-y-1">{article.imageURL && <img src={`${apiOrigin}${article.imageURL}`} alt="" className="h-48 w-full object-cover" />}<div className="p-7"><div className="flex justify-between"><span className="font-serif text-xl">0{index + 1}</span><span className="mt-1 text-[9px] font-bold tracking-[.16em] text-[#c65e49]">{article.tags[0] ?? "STORY"}</span></div><h3 className="mt-10 font-serif text-2xl leading-tight">{article.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#68656b]">{article.content}</p><div className="mt-6 flex items-center justify-between text-xs text-[#77747d]"><span>By {article.author}</span><Link to={`/articles/${article._id}`} className="font-semibold text-[#c65e49] hover:text-[#9c4f3e]">See more →</Link></div></div></article>)}
        </div>
      </section>

      <section id="about" className="mx-auto mb-20 grid max-w-7xl gap-8 bg-[#282730] px-7 py-12 text-white sm:px-12 lg:grid-cols-[.8fr_1fr_1fr] lg:items-center"><span className="font-serif text-6xl text-[#edaa91]">✦</span><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#edaa91]">Made for curious minds</p><h2 className="mt-3 font-serif text-4xl leading-tight">Read deeply.<br /><em className="text-[#edaa91]">Live widely.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[#c4c2c8]">Inkline is a simple home for ideas that stay with you. Discover a new perspective or share one of your own.</p></section>
      <footer className="mx-auto flex max-w-7xl justify-between border-t border-[#e2ded8] px-5 py-6 text-xs text-[#77747d] sm:px-8"><span>© 2026 inkline</span><span>Made for the curious</span></footer>
    </main>
  )
}

export default Home
