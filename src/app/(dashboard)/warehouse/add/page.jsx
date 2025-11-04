"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WarehouseAddPage() {
    const router = useRouter()
    const [form, setForm] = useState({
      toolName: "",
      brand: "",
      PN: "",
      spec: "",
      quantity: 0,
      location: "",
    });

    async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/warehouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      console.log(form);
      if (!res.ok) throw new Error("Gagal menambah data")
      alert("✅ Data alat berhasil ditambahkan!")

      router.push("/warehouse")
    } catch (error) {
      console.error(error)
      alert("❌ Terjadi kesalahan saat menyimpan data.")
    }
  }

  return (
     <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          📦 Tambah Stock Tools Gudang
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
          
          {/* Input Brand */}
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              placeholder="Masukkan brand"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              
            />
          </div>

          {/* Input PN */}
          <div>
            <label className="block text-sm font-medium mb-1">Part Number (PN)</label>
            <input
              type="text"
              placeholder="Masukkan part number"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.PN}
              onChange={(e) => setForm({ ...form, PN: e.target.value })}
              
            />
          </div>

          {/* Input Spesifikasi */}
          <div>
            <label className="block text-sm font-medium mb-1">Spesifikasi</label>
            <textarea
              placeholder="Masukkan spesifikasi"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.spec}
              onChange={(e) => setForm({ ...form, spec: e.target.value })}
              
            />
          </div>

          {/* Input Quantity */}
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah</label>
            <input
              type="number"
              placeholder="Masukkan Jumlah"
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: parseInt(e.target.value)  })}
              required
            />
          </div>

          {/* Input Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <select name="location" id="location" className="w-full border border-gray-300 p-2 rounded focus:outline-blue-500"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })} required
            >
              <option value="" disabled>Pilih lokasi</option>
              <option value="Gudang">Gudang</option>
              <option value="Tools Room">Tools Room</option>
            </select>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.push("/warehouse")}
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
