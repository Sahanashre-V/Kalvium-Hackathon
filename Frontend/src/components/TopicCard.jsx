function TopicCard({ title, description, status = 'neutral', meta, onClick }) {
  const normalizedStatus = status.toLowerCase()
  const tone =
    normalizedStatus === 'completed' || normalizedStatus === 'complete'
      ? 'border-emerald-400/20 bg-emerald-400/8 text-emerald-200'
      : normalizedStatus === 'review'
        ? 'border-amber-400/20 bg-amber-400/8 text-amber-200'
        : normalizedStatus === 'gap'
          ? 'border-rose-400/20 bg-rose-400/8 text-rose-200'
          : normalizedStatus === 'recommended'
            ? 'border-cyan-400/20 bg-cyan-400/8 text-cyan-200'
            : 'border-white/10 bg-white/6 text-slate-200'

  const symbol =
    normalizedStatus === 'completed' || normalizedStatus === 'complete'
      ? '✓'
      : normalizedStatus === 'review'
        ? '⚠'
        : normalizedStatus === 'gap'
          ? '✕'
          : normalizedStatus === 'recommended'
            ? '➜'
            : '•'

  const Tag = onClick ? 'button' : 'div'

  const sharedClassName = [
    'group rounded-3xl border border-white/10 bg-white/6 p-5 text-left backdrop-blur-xl transition duration-200',
    onClick
      ? 'cursor-pointer hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2'
      : 'cursor-default',
  ].join(' ')

  return (
    <Tag {...(onClick ? { type: 'button', onClick } : {})} className={sharedClassName}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>
            {symbol} {status}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          ) : null}
        </div>
      </div>
      {meta ? <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-400">{meta}</p> : null}
    </Tag>
  )
}

export default TopicCard
