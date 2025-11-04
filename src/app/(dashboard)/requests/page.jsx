"use client";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const response = await fetch("/api/request");
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    };
    fetchRequests();
  }, []);

  return (
    <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
      <h1 className="text-2xl font-bold mb-4">Permintaan Tools Baru</h1>

      {/* Tombol tambah permintaan */}
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        ➕ Tambah Permintaan
      </button>

      {/* Tabel daftar permintaan */}

      <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">No</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Jumlah</th>
              <th className="border p-2 text-left">Peminta</th>
              <th className="border p-2 text-left">Tanggal Permintaan</th>
              <th className="border p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Data contoh */}
            <tr>
              <td className="border p-2">1</td>
              <td className="border p-2">Tang Kombinasi</td>
              <td className="border p-2">4</td>
              <td className="border p-2">Budi Santoso</td>
              <td className="border p-2">2025-10-28</td>
              <td className="border p-2 text-yellow-600 font-semibold">Menunggu</td>
            </tr>
            <tr>
              <td className="border p-2">2</td>
              <td className="border p-2">Gergaji Besi</td>
              <td className="border p-2">2</td>
              <td className="border p-2">Andi Saputra</td>
              <td className="border p-2">2025-10-27</td>
              <td className="border p-2 text-green-600 font-semibold">Disetujui</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
