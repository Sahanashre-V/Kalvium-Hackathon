import { LEARNING_MODES, MODE_META } from '../data/adaptiveLearning'

function LearningModeSwitcher({ value, onChange, recommendedMode }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Learning mode
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Switch between read, watch, practice, revision, and mixed learning instantly.
          </p>
        </div>
        {recommendedMode ? (
          <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            Recommended: {MODE_META[recommendedMode]?.label || recommendedMode}
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {LEARNING_MODES.map((mode) => {
          const active = value === mode
          const meta = MODE_META[mode]
          return (
            <button
              key={mode}
              type="button"
              onClick={() => onChange(mode)}
              className={`group rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300/80 focus-visible:outline-offset-2 ${
                active
                  ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                  : 'border-white/10 bg-slate-950/25 text-slate-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{meta.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{meta.label}</p>
                  <p className="text-xs text-slate-400">{meta.shortLabel}</p>
                </div>
              </div>
              <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/8">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    active ? 'w-full bg-cyan-300' : 'w-1/3 bg-white/25 group-hover:w-2/3'
                  }`}
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LearningModeSwitcher
