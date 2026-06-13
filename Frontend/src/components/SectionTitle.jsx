function SectionTitle({ label, title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {label ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
            {label}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  )
}

export default SectionTitle
