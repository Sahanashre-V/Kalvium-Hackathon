import Navbar from '../components/Navbar'

function AppLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b14] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(45,212,191,0.14),_transparent_24%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.85),_rgba(7,11,20,1))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />
      <Navbar />
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

export default AppLayout
