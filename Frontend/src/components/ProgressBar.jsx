function ProgressBar({ value = 0, label, className = '' }) {
  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
