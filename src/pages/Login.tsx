import { type FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMyDetails, login } from "../service/auth."
import { useAuth } from "../hooks/useAuth"

function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      const response = await login(email, password)
      localStorage.setItem("ACCESS_TOKEN", response.data.data.access_token)
      localStorage.setItem("REFRESH_TOKEN", response.data.data.refresh_token)
      const profile = await getMyDetails()
      setUser(profile.data.data)
      navigate("/")
    } catch {
      setError("We couldn't sign you in. Check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] px-5 py-8 text-[#25242b]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight"><span className="flex h-9 w-9 -rotate-6 items-center justify-center rounded-full rounded-bl-sm bg-[#df765d] font-serif text-xl text-white">i</span>inkline</Link>
        <Link to="/register" className="text-sm text-[#77747d] hover:text-[#df765d]">Create account →</Link>
      </div>
      <div className="mx-auto grid min-h-[78vh] max-w-5xl items-center gap-12 py-12 lg:grid-cols-2">
        <div className="hidden lg:block"><p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-[#c65e49]">Welcome back</p><h1 className="max-w-md font-serif text-6xl leading-[.98] tracking-[-.06em]">Your next good idea is waiting.</h1><p className="mt-6 max-w-sm leading-7 text-[#77747d]">Pick up where you left off and keep the ideas that matter close.</p></div>
        <form onSubmit={handleLogin} className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_24px_70px_rgba(55,40,30,.08)] sm:p-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#c65e49]">Sign in</p><h2 className="font-serif text-3xl tracking-[-.04em]">Good to see you.</h2><p className="mt-2 text-sm text-[#77747d]">Enter your details to continue reading.</p>
          <label className="mt-8 block text-sm font-semibold">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none transition focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          <label className="mt-5 block text-sm font-semibold">Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-[#e4e0db] px-4 py-3 outline-none transition focus:border-[#df765d] focus:ring-4 focus:ring-[#df765d]/10" /></label>
          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={submitting} className="mt-7 w-full rounded-lg bg-[#df765d] px-5 py-3.5 font-semibold text-white transition hover:bg-[#c85d49] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Signing in..." : "Sign in →"}</button>
          <p className="mt-6 text-center text-sm text-[#77747d]">New to inkline? <Link to="/register" className="font-semibold text-[#c65e49]">Create an account</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Login
