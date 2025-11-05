"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null) 
  const [editData, setEditData] = useState({ 
    toolName: "", 
    quantity: "",
    requester: "",
    merk: "",
    spec: "",
    PN: "",
    price: "",
    reason: "",
    location: "",
    reference: "",
    note: "",
    status: ""
  })

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      const response = await fetch("/api/request")
      const data = await response.json()
      setData(data)
      setLoading(false)
    }

    fetchRequests()
  }, [])

  const handleStartEdit = (b) => {
    setEditingId(b.id)
    setEditData({
      toolName: b.toolName || "",
      quantity: b.quantity || "",
      requester: b.requester || "",
      merk: b.merk || "",
      spec: b.spec || "",
      PN: b.PN || "",
      price: b.price || "",
      reason: b.reason || "",
      location: b.location || "",
      reference: b.reference || "",
      note: b.note || "",
      status: b.status || ""
    })
    }

    const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName: editData.toolName,
          quantity: editData.quantity,
          requester: editData.requester,
          merk: editData.merk,
          spec: editData.spec,
          PN: editData.PN,
          price: editData.price,
          reason: editData.reason,
          location: editData.location,
          reference: editData.reference,
          note: editData.note,
          status: editData.status,
        }),
      })
   
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setData((prev) => prev.map((request) => (request.id === id ? updated : request)))

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
      const res = await fetch(`/api/request/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus data")

      setData((prev) => prev.filter((request) => request.id !== id))
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  }

  return (
    <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
      <h1 className="text-2xl font-bold mb-4">Permintaan Tools Baru</h1>

      {/* Tombol tambah permintaan */}
      <Link href="/" className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        ➕ Tambah Permintaan
      </Link>

      {/* Tabel daftar permintaan */}
      {loading ? (
        <p>Memuat data...</p>
      ):( data.length === 0 ? (
        <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Merk</th>
              <th className="border p-2 text-left">Spec</th>
              <th className="border p-2 text-left">Jumlah</th>
              <th className="border p-2 text-left">PN</th>
              <th className="border p-2 text-left">Harga</th>
              <th className="border p-2 text-left">Peminta</th>
              <th className="border p-2 text-left">Tanggal Minta</th>
              <th className="border p-2 text-left">Alasan</th>
              <th className="border p-2 text-left">Lokasi Kerja</th>
              <th className="border p-2 text-left">Referensi</th>
              <th className="border p-2 text-left">Keterangan</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
            <tr>
              <th className="border p-2" colSpan="15">
                Tidak ada data peminjaman.
              </th>
            </tr>
          </thead>
        </table>
      </div>
      ) : (
          <div className="drop-shadow-2xl">
          <div className="bg-white p-4 rounded-xl min-h-fit mt-4 inline-block">
          <table className="min-w-max border border-gray-200 table-auto">
            <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2 text-left">Nama Tools</th>
              <th className="border p-2 text-left">Merk</th>
              <th className="border p-2 text-left">Spec</th>
              <th className="border p-2 text-left">Jumlah</th>
              <th className="border p-2 text-left">PN</th>
              <th className="border p-2 text-left">Harga</th>
              <th className="border p-2 text-left">Peminta</th>
              <th className="border p-2 text-left">Tanggal Minta</th>
              <th className="border p-2 text-left">Alasan</th>
              <th className="border p-2 text-left">Lokasi Kerja</th>
              <th className="border p-2 text-left">Referensi</th>
              <th className="border p-2 text-left">Keterangan</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((request, i) => (
              <tr key={request.id}>

                <td className="border p-2">{i + 1}</td>

                {/**Toolname */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="toolName"
                      value={editData.toolName}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.toolName
                  )}
                </td>

                {/**Merk */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="merk"
                      value={editData.merk}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.merk
                  )}
                </td>

                {/**Spec */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <textarea
                      type="text"
                      name="spec"
                      value={editData.spec}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.spec
                  )}
                </td>

                
                  {/**Quantity */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editData.quantity}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.quantity
                  )}
                </td>
                
                {/**PN */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="PN"
                      value={editData.PN}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.PN
                  )}
                </td>

                {/**Price */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.price
                  )}
                </td>

                {/**Requester */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="requester"
                      value={editData.requester}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.requester
                  )}
                </td>

                  {/**Tanggal minta */}
                <td className="border p-2">{new Date(request.createdAt).toLocaleDateString("id-ID")}</td>
                
                {/**Reason */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="reason"
                      value={editData.reason}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.reason
                  )}
                </td>

                {/**Location */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="location"
                      value={editData.location}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.location
                  )}
                </td>

                {/**Reference */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="reference"
                      value={editData.reference}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.reference
                  )}
                </td>

                {/**Note */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <input
                      type="text"
                      name="note"
                      value={editData.note}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    />
                  ) : (
                    request.note
                  )}
                </td>

                {/**Status */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="border p-1 rounded"
                    >
                      <option value="" disabled>Pilih Status</option>
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                    </select>
                  ) : (
                    request.status
                  )}
                </td>

                {/* Tombol Aksi */}
                <td className="border p-2">
                  {editingId === request.id ? (
                    <>
                      <button
                        onClick={() => handleSave(request.id)}
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
                        onClick={() => handleStartEdit(request)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <span>|</span>
                      <button
                        onClick={() => handleDelete(request.id)}
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
      </div>
      )
      )}
    </div>
  )
}
