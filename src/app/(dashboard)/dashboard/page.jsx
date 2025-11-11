import TableRequest from "@/component/request/TableRequest";
import LowStockWidget from "@/component/tableLowStock/lowStock";


export default function DashboardPage() {
  return (
    <>
      <div className="text-black">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Tools</h2>
            <p className="text-2xl font-bold text-blue-600">128</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Permintaan Aktif</h2>
            <p className="text-2xl font-bold text-yellow-500">12</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Tools Masuk Bulan Ini</h2>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>
        </div>
        {/* Tables */}
        {/* <LowStockWidget /> */}
        <TableRequest />
      </div>
      </>
  )
}
