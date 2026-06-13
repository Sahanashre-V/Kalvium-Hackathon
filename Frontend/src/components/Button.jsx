import { Link } from 'react-router-dom'

const styles = {
  primary:
    'bg-cyan-400 text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:bg-cyan-300',
  secondary:
    'border border-white/12 bg-white/8 text-white hover:border-cyan-300/40 hover:bg-white/12',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/6',
}

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-4 text-base',
}

function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  const classes = `${base} ${styles[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
