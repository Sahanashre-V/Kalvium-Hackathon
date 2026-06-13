function StatCard({ label, value, delta, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
          {delta ? <p className="mt-2 text-sm text-cyan-300/90">{delta}</p> : null}
        </div>
        {icon ? (
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-200 ring-1 ring-cyan-300/20">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default StatCard
