import { NavLink, Link } from 'react-router-dom'
import Button from './Button'
import { useTopic } from '../context/TopicContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/assessment', label: 'Assessment' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/dashboard', label: 'Dashboard' },
]

function Navbar() {
  const { selectedTopic } = useTopic()

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07111f]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/20 transition duration-200 group-hover:scale-105">
            <span className="text-lg font-bold text-cyan-200">LA</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">LearnAnything AI</p>
            <p className="text-xs text-slate-400">Personalized learning MVP</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/5 p-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 sm:inline-flex">
            {selectedTopic}
          </span>
          <span className="hidden rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200 sm:inline-flex">
            Demo Ready
          </span>
          <Button to="/assessment" size="sm">
            Start Learning
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
