"use client";
import { useEffect, useState } from "react";

export default function LowStockWidget() {
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        // 👇 parameter ?lowStock=true akan diproses oleh API
        const res = await fetch(`/api/warehouse?lowStock=true&page=${page}&limit=5`);
        const data = await res.json();
        console.log(data);
        setLowStock(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Gagal mengambil data stok menipis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLowStock();
  }, [page]);
  
  if (loading) return <p>Memuat data stok...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow text-black">
      <h2 className="text-xl font-semibold mb-3">📉 Stok Menipis</h2>

      {lowStock.length === 0 ? (
        <p className="text-gray-500">Tidak ada data</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">Nama Tools</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">PN</th>
              <th className="border p-2">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((tool, index) => (
              <tr key={tool.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{tool.toolName}</td>
                <td className="border p-2">{tool.brand}</td>
                <td className="border p-2">{tool.PN}</td>
                <td className="border p-2 text-red-600 font-bold">
                  {tool.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
