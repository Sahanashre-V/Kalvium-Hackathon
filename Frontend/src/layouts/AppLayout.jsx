import Navbar from '../components/Navbar'

function AppLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(circle at top left, rgba(14, 165, 233, 0.16), transparent 28%), radial-gradient(circle at top right, rgba(45, 212, 191, 0.14), transparent 24%), linear-gradient(180deg, #0a1120 0%, #070b14 44%, #05070d 100%)' }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)' }} />
      <Navbar />
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
