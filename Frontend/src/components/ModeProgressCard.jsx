import ProgressBar from './ProgressBar'

function ModeProgressCard({ title, value, details, icon, progress, accent = 'cyan' }) {
  const borderTone =
    accent === 'emerald'
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
      : accent === 'amber'
        ? 'border-amber-400/20 bg-amber-400/10 text-amber-100'
        : accent === 'rose'
          ? 'border-rose-400/20 bg-rose-400/10 text-rose-100'
          : 'border-cyan-400/20 bg-cyan-400/10 text-cyan-100'

  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          {details ? <p className="mt-2 text-sm text-cyan-300/90">{details}</p> : null}
        </div>
        {icon ? (
          <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${borderTone}`}>
            <span>{icon}</span>
          </div>
        ) : null}
      </div>
      {typeof progress === 'number' ? <ProgressBar value={progress} className="mt-5" /> : null}
    </div>
  )
}

export default ModeProgressCard
