import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getArticle, type Article } from "../service/article"

const apiOrigin = "http://localhost:3000"

function ArticleDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article>()
  const [error, setError] = useState("")
  const invalidId = !id

  useEffect(() => {
    if (invalidId) return

    getArticle(id)
      .then((response) => setArticle(response.data.data))
      .catch(() => setError("This article could not be found."))
  }, [id, invalidId])

  if (error || invalidId) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-5 text-center">
        <div><p className="font-serif text-3xl">{error || "Article not found"}</p><button onClick={() => navigate("/")} className="mt-6 rounded-lg bg-[#df765d] px-5 py-3 text-sm font-semibold text-white">Back to stories</button></div>
      </main>
    )
  }

  if (!article) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] text-sm text-[#77747d]">Loading article...</main>
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#282730]">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 sm:px-8">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight"><span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-full rounded-bl-sm bg-[#df765d] font-serif text-2xl text-white">i</span> inkline</Link>
        <Link to="/" className="text-sm font-semibold text-[#77747d] hover:text-[#c65e49]">← Back to stories</Link>
      </header>
      <article className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        {article.imageURL && <img src={`${apiOrigin}${article.imageURL}`} alt={article.title} className="h-64 w-full object-cover sm:h-[420px]" />}
        <div className="mx-auto max-w-3xl py-12">
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[.18em] text-[#c65e49]"><span>{article.tags[0] ?? "STORY"}</span><span className="font-normal tracking-normal text-[#77747d]">{new Date(article.createdAt).toLocaleDateString()}</span></div>
          <h1 className="mt-5 font-serif text-5xl leading-tight tracking-[-.06em] sm:text-7xl">{article.title}</h1>
          <p className="mt-5 text-sm text-[#77747d]">By {article.author}</p>
          <div className="mt-10 whitespace-pre-wrap text-lg leading-9 text-[#57545b]">{article.content}</div>
          {article.tags.length > 0 && <div className="mt-10 flex flex-wrap gap-2">{article.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f2d3c5] px-3 py-1 text-xs text-[#9c4f3e]">{tag}</span>)}</div>}
        </div>
      </article>
    </main>
  )
}

export default ArticleDetails
