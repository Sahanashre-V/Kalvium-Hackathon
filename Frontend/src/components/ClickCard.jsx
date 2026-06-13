import { Link } from 'react-router-dom'

function ClickCard({ to, children, className = '', ariaLabel }) {
  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      className={`block cursor-pointer rounded-3xl transition duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 ${className}`}
    >
      {children}
    </Link>
  )
}

export default ClickCard
