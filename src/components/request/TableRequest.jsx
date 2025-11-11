"use client";
import { useEffect, useState } from "react";

export default function TableRequest() {
    const [dataRequest, setDataRequest] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataRequest = async () => {
            try {
                const res = await fetch("/api/request");
                const data = await res.json();
                console.log(data);
                setDataRequest(data);
            } catch (err) {
                console.error("Gagal mengambil data request:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataRequest();
    }, []);

    if (loading) return <p>Memuat data stok...</p>;

  return (
     <div className="bg-white p-4 rounded-lg shadow text-black mt-3">
      <h2 className="text-xl font-semibold mb-3">🛒 Request Tools</h2>

      {dataRequest.length === 0 ? (
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
              <th className="border p-2">Peminta</th>
              <th className="border p-2">Status</th>
            
            </tr>
          </thead>
          <tbody>
            {dataRequest.map((tool, index) => (
              <tr key={tool.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{tool.toolName}</td>
                <td className="border p-2">{tool.brand}</td>
                <td className="border p-2">{tool.PN}</td>
                <td className="border p-2">{tool.quantity}</td>
                <td className="border p-2">{tool.requester}</td>
                <td className="border p-2">{tool.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}