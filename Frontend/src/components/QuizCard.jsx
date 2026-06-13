function QuizCard({ question, options, selectedIndex, onSelect, feedback }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
        Knowledge Check
      </p>
      <h3 className="mt-3 text-xl font-semibold text-white">{question}</h3>
      <div className="mt-5 grid gap-3">
        {options.map((option, index) => {
          const active = index === selectedIndex
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(index)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition duration-200 ${
                active
                  ? 'border-cyan-300/30 bg-cyan-400/12 text-white'
                  : 'border-white/10 bg-slate-950/20 text-slate-200 hover:border-cyan-300/20 hover:bg-white/8'
              }`}
            >
              <span className="font-medium">{option}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Option {index + 1}
              </span>
            </button>
          )
        })}
      </div>
      {feedback ? (
        <div
          className={`mt-5 rounded-2xl border p-4 text-sm ${
            feedback.correct
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
              : 'border-rose-400/20 bg-rose-400/10 text-rose-100'
          }`}
        >
          <p className="font-semibold">{feedback.correct ? 'Correct' : 'Incorrect'}</p>
          <p className="mt-1 leading-6 text-slate-200">{feedback.explanation}</p>
        </div>
      ) : null}
    </div>
  )
}

export default QuizCard
