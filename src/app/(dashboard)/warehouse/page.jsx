"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function WarehousePage() {
  const [loading, setLoading] = useState(true)
  const [tools, setTools] = useState([])
  const [editingId, setEditingId] = useState(null) 
  const [editData, setEditData] = useState({ 
    toolName: "", 
    brand: "",
    PN: "",
    spec: "",
    quantity: "",
    location: ""
  })

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true)
      const response = await fetch("/api/warehouse")
      const data = await response.json()
      setTools(data)
      setLoading(false)
    }

    fetchTools()
  }, [])

 
  const handleStartEdit = (b) => {
    setEditingId(b.id)
    setEditData({
      toolName: b.toolName || "",
      brand: b.brand || "",
      PN: b.PN || "",
      spec: b.spec || "",
      quantity: b.quantity || "",
      location: b.location || "",
    })
    }

    const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/warehouse/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName: editData.toolName,
          brand: editData.brand,
          PN: editData.PN,
          spec: editData.spec,
          quantity: editData.quantity,
          location: editData.location,
        }),
      })
   
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setTools((prev) => prev.map((tool) => (tool.id === id ? updated : tool)))

      setEditingId(null)
      alert("✅ Data berhasil diperbarui")
        window.location.reload()
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan: " + err.message)
    }
  }


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/warehouse/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus data")

      setTools((prev) => prev.filter((tool) => tool.id !== id))
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  }

  return (
    <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
      <h1 className="text-2xl font-bold mb-4">Stok Tools Gudang</h1>


       <Link
        href="/warehouse/add"
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Tambah Tools
      </Link>

      {/* Bagian tabel daftar tools */}
       {loading ? (
        <p>Memuat data...</p>
      ) : tools.length === 0 ? (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tool</th>
              <th className="border p-2 text-left">Brand</th>
              <th className="border p-2 text-left">PN</th>
              <th className="border p-2 text-left">Spec</th>
              <th className="border p-2 text-left">Jumlah</th>
              <th className="border p-2 text-left">Lokasi</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
            <tr>
              <th className="border p-2" colSpan="8">
                Tidak ada data tools.
              </th>
            </tr>
          </thead>
        </table>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tool</th>
              <th className="border p-2 text-left">Brand</th>
              <th className="border p-2 text-left">PN</th>
              <th className="border p-2 text-left">Spec</th>
              <th className="border p-2 text-left">Jumlah</th>
              <th className="border p-2 text-left">Lokasi</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => (
              <tr key={tool.id}>
                <td className="border p-2">{i + 1}</td>
                
                <td className="border p-2">
                  {editingId === tool.id ? (
                    <input
                      type="text"
                      name="toolName"
                      value={editData.toolName}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    tool.toolName
                  )}
                </td>

                  <td className="border p-2">
                  {editingId === tool.id ? (
                    <input
                      type="text"
                      name="brand"
                      value={editData.brand}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    tool.brand
                  )}
                </td>

                <td className="border p-2">
                  {editingId === tool.id ? (
                    <input
                      type="text"
                      name="PN"
                      value={editData.PN}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    tool.PN
                  )}
                </td>

                <td className="border p-2">
                  {editingId === tool.id ? (
                    <input
                      type="text"
                      name="spec"
                      value={editData.spec}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    tool.spec
                  )}
                </td>

                  <td className="border p-2">
                  {editingId === tool.id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    tool.quantity
                  )}
                </td>

                 <td className="border p-2">
                  {editingId === tool.id ? (
                    <select
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    >
                      <option value="Gudang">Gudang</option>
                      <option value="Tool Room">Tool Room</option>
                    </select>
                  ) : (
                    tool.location
                  )}
                </td>
              

                <td className="border p-2">
                  {editingId === tool.id ? (
                    <>
                      <button
                        onClick={() => handleSave(tool.id)}
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
                  ) : 
                  (
                    <>
                      <button
                        onClick={() => handleStartEdit(tool)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                         Edit
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleDelete(tool.id)}
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
      )}
    </div>
  )
}
