function RoadmapCard({ step, title, description, status, onClick }) {
  const normalizedStatus = status.toLowerCase()
  const styles =
    normalizedStatus === 'completed' || normalizedStatus === 'complete'
      ? 'border-emerald-400/25 bg-emerald-400/8 text-emerald-200'
      : normalizedStatus === 'review'
        ? 'border-amber-400/25 bg-amber-400/8 text-amber-200'
        : normalizedStatus === 'recommended'
          ? 'border-cyan-400/25 bg-cyan-400/8 text-cyan-200'
          : 'border-rose-400/25 bg-rose-400/8 text-rose-200'

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative cursor-pointer pl-10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2"
    >
      <span className={`absolute left-[7px] top-6 h-3.5 w-3.5 rounded-full border ${styles}`} />
      <div className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/8">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-cyan-400/12 px-3 py-1 text-xs font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
            Step {step}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${styles}`}>
            {status}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
      </div>
    </button>
  )
}

export default RoadmapCard
