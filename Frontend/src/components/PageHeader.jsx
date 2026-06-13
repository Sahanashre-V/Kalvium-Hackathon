import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'

function PageHeader({ backTo, breadcrumbs = [], title, description, action }) {
  const navigate = useNavigate()
  const hasBack = Boolean(backTo)

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {hasBack ? (
            <Button variant="secondary" size="sm" onClick={() => navigate(backTo)}>
              ← Back
            </Button>
          ) : null}
          {breadcrumbs.length ? (
            <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
              <ol className="flex flex-wrap items-center gap-2">
                {breadcrumbs.map((crumb, index) => {
                  const last = index === breadcrumbs.length - 1
                  return (
                    <li key={`${crumb.label}-${crumb.to || index}`} className="flex items-center gap-2">
                      {index > 0 ? <span className="text-slate-600">/</span> : null}
                      {crumb.to && !last ? (
                        <Link to={crumb.to} className="transition hover:text-white focus-visible:text-white">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-slate-200">{crumb.label}</span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </nav>
          ) : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        {description ? <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p> : null}
      </div>
    </div>
  )
}

export default PageHeader
