import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handle = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-lg border border-white/6">
        <h2 className="mb-4 text-2xl font-semibold text-white">Welcome back</h2>
        <p className="mb-6 text-sm text-slate-300">Log in to continue to LearnAnything AI</p>
        <form onSubmit={handle} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md bg-slate-800 border border-white/10 px-3 py-3 text-white placeholder:text-slate-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md bg-slate-800 border border-white/10 px-3 py-3 text-white placeholder:text-slate-400"
          />
          {error && <p className="text-sm text-rose-400">{error}</p>}
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">New here? <a href="/signup" className="text-cyan-300">Create account</a></div>
            <div>
              <Button type="submit">Login</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
