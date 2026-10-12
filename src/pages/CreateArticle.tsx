import { type FormEvent, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { createArticle } from "../service/article"

function CreateArticle() {
  const { user } = useAuth()
  const [form, setForm] = useState({ title: "", content: "", tags: "" })
  const [image, setImage] = useState<File>()
  const [error, setError] = useState("")
  const [published, setPublished] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    if (image && !image.type.startsWith("image/")) return setError("Please choose an image file.")
    if (image && image.size > 5 * 1024 * 1024) return setError("Image must be 5 MB or smaller.")
    setSubmitting(true)
    try {
      await createArticle({ ...form, author: user?.email ?? "", image })
      setPublished(true)
    } catch (requestError: unknown) {
      if (axios.isAxiosError(requestError)) setError(requestError.response?.data?.message ?? `Request failed (${requestError.response?.status ?? "network error"}).`)
      else setError("Unable to publish the article. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (published) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-5 text-center"><div className="max-w-lg rounded-2xl bg-white p-10 shadow-xl"><span className="text-5xl text-[#df765d]">✦</span><p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-[#c65e49]">Published successfully</p><h1 className="mt-3 font-serif text-4xl">Your story is now part of inkline.</h1><div className="mt-8 flex justify-center gap-3"><Link to="/" className="rounded-lg bg-[#df765d] px-5 py-3 text-sm font-semibold text-white">Back to home</Link><button onClick={() => { setPublished(false); setForm({ title: "", content: "", tags: "" }); setImage(undefined) }} className="rounded-lg border border-[#ded9d2] px-5 py-3 text-sm font-semibold">Write another</button></div></div></main>
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] text-[#282730]">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8"><Link to="/" className="flex items-center gap-3 text-xl font-bold tracking-tight"><span className="flex h-10 w-10 -rotate-6 items-center justify-center rounded-full rounded-bl-sm bg-[#df765d] font-serif text-2xl text-white">i</span> inkline</Link><Link to="/" className="text-sm font-semibold text-[#77747d] hover:text-[#c65e49]">← Back to home</Link></header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-16">
        <div className="mb-10 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#c65e49]">Create an article</p><h1 className="mt-3 font-serif text-5xl leading-tight tracking-[-.06em] sm:text-6xl">Give your ideas<br /><em className="text-[#df765d]">a place to live.</em></h1><p className="mt-5 leading-7 text-[#77747d]">Write something thoughtful, add a cover image, and share your perspective with the community.</p></div>
        <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div className="rounded-2xl bg-white p-7 shadow-[0_20px_60px_rgba(55,40,30,.07)] sm:p-10">
            <label className="block text-sm font-semibold">Title<input required value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Give your article a clear title" className="mt-2 w-full border-b border-[#ded9d2] py-3 text-2xl outline-none placeholder:text-[#c3bec0] focus:border-[#df765d]" /></label>
            <label className="mt-9 block text-sm font-semibold">Your story<textarea required value={form.content} onChange={(event) => update("content", event.target.value)} placeholder="Start writing..." rows={12} className="mt-2 w-full resize-y rounded-lg border border-[#e4e0db] px-4 py-3 leading-7 outline-none focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl bg-[#282730] p-7 text-white"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#edaa91]">Publish details</p><p className="mt-5 text-sm text-[#c4c2c8]">Publishing as</p><p className="mt-1 truncate font-semibold">{user?.email}</p><label className="mt-6 block text-sm font-semibold">Tags<input value={form.tags} onChange={(event) => update("tags", event.target.value)} placeholder="design, life, ideas" className="mt-2 w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/40 focus:border-[#edaa91]" /></label></div>
            <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-[#d8d1ca] bg-white p-7 text-center transition hover:border-[#df765d]"><span className="text-3xl">↥</span><span className="mt-3 block text-sm font-semibold">{image?.name ?? "Add a cover image"}</span><span className="mt-1 block text-xs text-[#77747d]">JPG, PNG or WEBP · max 5 MB</span><input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0])} className="sr-only" /></label>
            {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <button disabled={submitting} className="w-full rounded-lg bg-[#df765d] px-5 py-4 font-semibold text-white shadow-lg shadow-[#df765d]/20 hover:bg-[#c85d49] disabled:opacity-60">{submitting ? "Publishing..." : "Publish article →"}</button>
          </aside>
        </form>
      </div>
    </main>
  )
}

export default CreateArticle
