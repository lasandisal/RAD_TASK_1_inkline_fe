import { type FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../service/auth."

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault()
    if (form.password !== form.confirm) return setError("Passwords do not match.")
    if (form.password.length < 8) return setError("Password must be at least 8 characters.")
    setError("")
    setSubmitting(true)
    try {
      await register(form.name, form.email, form.password)
      navigate("/login")
    } catch {
      setError("We couldn't create your account. Please check your details.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-5 py-8 text-[#25242b]">
      <div className="mx-auto flex max-w-6xl items-center justify-between"><Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight"><span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-full rounded-bl-sm bg-[#df765d] font-serif text-xl text-white">i</span>inkline</Link><Link to="/login" className="text-sm text-[#77747d] hover:text-[#df765d]">Sign in →</Link></div>
      <div className="mx-auto flex min-h-[78vh] max-w-md items-center py-12">
        <form onSubmit={handleRegister} className="w-full rounded-2xl bg-white p-8 shadow-[0_24px_70px_rgba(55,40,30,.08)] sm:p-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#c65e49]">Join the community</p><h1 className="font-serif text-3xl tracking-[-.04em]">Create your space.</h1><p className="mt-2 text-sm text-[#77747d]">A thoughtful place for thoughtful people.</p>
          <label className="mt-8 block text-sm font-semibold">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          <label className="mt-5 block text-sm font-semibold">Email<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          <label className="mt-5 block text-sm font-semibold">Password<input required type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          <label className="mt-5 block text-sm font-semibold">Confirm password<input required type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={submitting} className="mt-7 w-full rounded-lg bg-[#df765d] px-5 py-3.5 font-semibold text-white transition hover:bg-[#c85d49] disabled:opacity-60">{submitting ? "Creating account..." : "Create account →"}</button>
        </form>
      </div>
    </main>
  )
}

export default Register
