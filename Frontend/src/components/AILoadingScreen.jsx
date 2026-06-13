import { motion } from 'framer-motion'

function AILoadingScreen({ title, subtitle, steps = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25 }}
      className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            AI Processing
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-2 text-sm leading-6 text-slate-300">{subtitle}</p> : null}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/12 text-cyan-200 ring-1 ring-cyan-300/20">
          AI
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="h-2 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400"
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-slate-950/25 p-4">
              <div className="h-3 w-24 rounded-full bg-white/10" />
              <div className="mt-3 h-2 w-full rounded-full bg-white/8" />
              <div className="mt-2 h-2 w-2/3 rounded-full bg-white/6" />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default AILoadingScreen
