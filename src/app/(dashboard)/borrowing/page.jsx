"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BorrowPage() {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    status: "",
    returnDate: "",
    condition: "",
  });

  // Ambil data dari API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/borrowing");
      const data = await res.json();
      setBorrows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi mulai edit
  const handleStartEdit = (b) => {
    setEditingId(b.id);
    setEditData({
      status: b.status || "",
      condition: b.condition || "",
      returnDate: b.returnDate ? b.returnDate.split("T")[0] : "",
    });
  };

  // Fungsi ubah input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Simpan perubahan
  const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/borrowing/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editData.status,
          condition: editData.condition,
          location: editData.location,
          returnDate: editData.returnDate
            ? new Date(editData.returnDate)
            : null,
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      const updated = await res.json();

      // Update state borrows secara lokal
      if (updated.status === "Closed") {
        // Jika sudah Close → hapus dari daftar
        setBorrows((prev) => prev.filter((b) => b.id !== id));
      } else {
        // Jika masih Open → update datanya
        setBorrows((prev) => prev.map((b) => (b.id === id ? updated : b)));
      }

      setEditingId(null);
      alert("✅ Data berhasil diperbarui");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  // Hapus data
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/borrowing/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus data");

      setBorrows((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
      <h1 className="text-2xl font-bold mb-4">Peminjaman Tools</h1>

      <Link
        href="/borrowing/add"
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Tambah Peminjaman
      </Link>

      {loading ? (
        <p>Memuat data...</p>
      ) : borrows.length === 0 ? (
        <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Peminjam</th>
              <th className="border p-2 text-left">Tanggal Pinjam</th>
              <th className="border p-2 text-left">Tanggal Kembali</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Kondisi</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
            <tr>
              <th className="border p-2" colSpan="8">
                Tidak ada data peminjaman.
              </th>
            </tr>
          </thead>
        </table>
      </div>
      ) : (
        <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Peminjam</th>
              <th className="border p-2 text-left">Tanggal Pinjam</th>
              <th className="border p-2 text-left">Tanggal Kembali</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Kondisi</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((b, i) => (
              <tr key={b.id}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{b.toolName}</td>
                <td className="border p-2">{b.borrower}</td>
                <td className="border p-2">
                  {new Date(b.borrowDate).toLocaleDateString("id-ID")}
                </td>

                {/* Kolom returnDate */}
                <td className="border p-2">
                  {editingId === b.id ? (
                    <input
                      type="date"
                      name="returnDate"
                      value={editData.returnDate}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : b.returnDate ? (
                    new Date(b.returnDate).toLocaleDateString("id-ID")
                  ) : (
                    "-"
                  )}
                </td>

                {/* Kolom status */}
                <td className="border p-2">
                  {editingId === b.id ? (
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    >
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  ) : (
                    b.status
                  )}
                </td>

                {/* Kolom lokasi */}
                <td className="border p-2">
                  {editingId === b.id ? (
                    <select
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    >
                      <option value="" disabled>
                        Pilih lokasi
                      </option>
                      <option value="MSF">MSF</option>
                      <option value="AST & KAMAZ">AST & KAMAZ</option>
                      <option value="TYRE">TYRE</option>
                      <option value="WS KLAWAS">WS KLAWAS</option>
                    </select>
                  ) : (
                    b.location
                  )}
                </td>

                {/* Tombol Aksi */}
                <td className="border p-2">
                  {editingId === b.id ? (
                    <>
                      <button
                        onClick={() => handleSave(b.id)}
                        className="text-green-600 hover:underline mr-2"
                      >
                        Simpan
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-600 hover:underline"
                      >
                        Batal
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleStartEdit(b)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}
