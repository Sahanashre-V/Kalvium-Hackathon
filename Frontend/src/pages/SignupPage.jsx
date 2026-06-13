import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handle = async (e) => {
    e.preventDefault()
    // basic client-side validation
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill all fields')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    try {
      setIsSubmitting(true)
      const res = await signup(name, email, password)
      setIsSubmitting(false)
      navigate('/')
    } catch (err) {
      setIsSubmitting(false)
      console.error('signup error', err)
      setError(err?.message || 'Signup failed')
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/80 p-8 shadow-lg border border-white/6">
        <h2 className="mb-4 text-2xl font-semibold text-white">Create account</h2>
        <p className="mb-6 text-sm text-slate-300">Start your personalized learning journey</p>
        <form onSubmit={handle} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-md bg-slate-800 border border-white/10 px-3 py-3 text-white placeholder:text-slate-400"
          />
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
            <div className="text-sm text-slate-400">Already have an account? <a href="/login" className="text-cyan-300">Log in</a></div>
            <div>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create account'}</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
