export default function ReportsPage() {
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Laporan Tools</h1>

      {/* Filter tanggal */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 flex items-center gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Dari Tanggal</label>
          <input
            type="date"
            className="border p-2 rounded w-48"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Sampai Tanggal</label>
          <input
            type="date"
            className="border p-2 rounded w-48"
          />
        </div>
        <button className="mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          🔍 Tampilkan
        </button>
      </div>

      {/* Tabel laporan */}
      <div className="bg-white p-4 rounded-xl shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">No</th>
              <th className="border p-2 text-left">Tanggal</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Masuk</th>
              <th className="border p-2 text-left">Permintaan</th>
              <th className="border p-2 text-left">Sisa Stok</th>
            </tr>
          </thead>
          <tbody>
            {/* Data contoh */}
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2">2025-10-27</td>
              <td className="border p-2">Obeng Set</td>
              <td className="border p-2 text-green-600 font-semibold">+10</td>
              <td className="border p-2 text-red-600 font-semibold">-3</td>
              <td className="border p-2 font-bold">7</td>
            </tr>
            <tr>
              <td className="border p-2">2</td>
              <td className="border p-2">2025-10-28</td>
              <td className="border p-2">Bor Listrik</td>
              <td className="border p-2 text-green-600 font-semibold">+5</td>
              <td className="border p-2 text-red-600 font-semibold">-2</td>
              <td className="border p-2 font-bold">3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
