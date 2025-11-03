import Link from "next/link"


export default function DashboardPage({children}) {
  return (
    <main className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-blue-500">
          🧰 Inventory Tools
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" className="block p-2 rounded hover:bg-blue-600">
            Dashboard
          </Link>
          <Link href="/borrowing" className="block p-2 rounded hover:bg-blue-600">
            Peminjaman Tools
          </Link>
          <Link href="/tools" className="block p-2 rounded hover:bg-blue-600">
            Stok Tools Room
          </Link>
          <Link href="/warehouse" className="block p-2 rounded hover:bg-blue-600">
            Stok Tools Gudang
          </Link>
          <Link href="/requests" className="block p-2 rounded hover:bg-blue-600">
            Permintaan Tools
          </Link>
          <Link href="/history" className="block p-2 rounded hover:bg-blue-600">
            History
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-6">
        {children}
      </section>
    </main>
  )
}
