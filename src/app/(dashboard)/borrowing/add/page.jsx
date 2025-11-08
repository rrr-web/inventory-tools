"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddBorrowPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    toolName: "",
    borrower: "",
    borrowDate: "",
    returnDate: "",
    location: "",
    toolsKeeper: "",
  })

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/borrowing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Gagal menambah data")
      alert("✅ Data peminjaman berhasil ditambahkan!")

      router.push("/borrowing")
    } catch (error) {
      console.error(error)
      alert("❌ Terjadi kesalahan saat menyimpan data.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          📦 Tambah Peminjaman Tools
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Nama Tools */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama Tools</label>
            <input
              type="text"
              placeholder="Masukkan nama tools"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.toolName}
              onChange={(e) => setForm({ ...form, toolName: e.target.value })}
              required
            />
          </div>


          {/* Input Nama Peminjam */}
          <div>
            <label className="block text-sm font-medium mb-1">Nama Peminjam</label>
            <input
              type="text"
              placeholder="Masukkan nama peminjam"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.borrower}
              onChange={(e) => setForm({ ...form, borrower: e.target.value })}
              required
            />
          </div>

          {/* Input Tanggal Pinjam */}
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Pinjam</label>
            <input
              type="date"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.borrowDate}
              onChange={(e) => setForm({ ...form, borrowDate: e.target.value })}
              required
            />
          </div>

          {/* Input toolsKeeper */}
          <div>
            <label className="block text-sm font-medium mb-1">Tools Keeper</label>
            <select
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.toolsKeeper}
              onChange={(e) => setForm({ ...form, toolsKeeper: e.target.value })}
              required
            >
              <option value="" disabled>Pilih Tools Keeper</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select>
          </div>

              
          {/* Input Lokasi */}  
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <select
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            >
              <option value="" disabled>Pilih lokasi</option>
              <option value="MSF">MSF</option>
              <option value="AST & KAMAZ">AST & KAMAZ</option>
              <option value="TYRE">TYRE</option>
              <option value="WS KLAWAS">WS KLAWAS</option>
            </select>
          </div>

          {/* Tombol Simpan & Kembali */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.push("/borrowing")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ← Kembali
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
