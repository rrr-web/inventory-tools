"use client";
import { useState } from "react";

export default function AddStock() {
    const [form, setForm] = useState({
      toolName: "",
      brand: "",
      PN: "",
      spec: "",
      quantity: 1,
      location:""
    });


    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

    async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await fetch("/api/warehouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Gagal menambah data")
      alert("✅ Data alat berhasil ditambahkan!")

    } catch (error) {
      console.error(error)
      alert("❌ Terjadi kesalahan saat menyimpan data.")
    }
  }

  return (
     <div className="p-4">
      <div className="bg-white p-4 rounded-xl max-w-4xl mx-auto my-8 shadow-2xl">
        <div className="p-6 space-y-1 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            📦 Tambah Stock Tools Gudang
          </h1>
        </div>

        <div className="p-6">
         <form onSubmit={handleSubmit} className="space-y-4">

          {/* Input Nama Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Nama Tools</label>
            <input
              type="text"
              placeholder="Masukkan nama tools"
              className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              onChange={(e) => setForm({ ...form, toolName: e.target.value })}
              required
            />
          </div>
          
          {/* Input Brand */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Brand</label>
            <input
              type="text"
              placeholder="Masukkan brand"
              className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              
            />
          </div>

          {/* Input PN */}
            <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Part Number (PN)</label>
            <input
              type="text"
              placeholder="Masukkan part number"
              className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={form.PN}
              onChange={(e) => setForm({ ...form, PN: e.target.value })}
              
            />
          </div>

         

          {/* Input Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Jumlah</label>
            <input
              type="number"
              name="quantity"
              placeholder="Masukkan Jumlah"
              min={1}
             className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>
            </div>

          {/* Input Location */}
          <div>
          <div>
            <label className="block text-sm font-medium mb-1">Lokasi</label>
            <input name="location" id="location" 
            className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })} required
            />
            </div>

             {/* Input Spesifikasi */}
          <div>
            <label className="text-sm font-medium leading-none">Spesifikasi</label>
            <textarea
              placeholder="Masukkan spesifikasi"
              className="w-full border p-2 rounded  resize-none text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              value={form.spec}
              onChange={(e) => setForm({ ...form, spec: e.target.value })}
              
            />
          </div>
          </div>

          <div>
            <button
              type="submit"
              className="min-w-full border p-3 shadow-2xl bg-gray-400 text-white rounded-md hover:bg-gray-500  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-2"
            >
              Simpan
            </button>
         </div> 
        </form>
        </div>
        </div>
      </div>
  )
}
