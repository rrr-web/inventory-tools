"use client";
import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RequestsPage() {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null) 
  const [editData, setEditData] = useState({ 
    toolName: "", 
    quantity: "",
    requester: "",
    brand: "",
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
      try{
      const result = await getData('api/request')
      setData(result)
      }catch(err){
        console.log(err);
        
      }
    }

    fetchRequests()
  }, [])

  const handleStartEdit = (b) => {
    setEditingId(b.id)
    setEditData({
      toolName: b.toolName || "",
      quantity: b.quantity || "",
      requester: b.requester || "",
      brand: b.brand || "",
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
          brand: editData.brand,
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

   const columns = [
    { key: "toolName", label: "Nama Tools" },
    { key: "quantity", label: "Jumlah" },
    { key: "spec", label: "spec" },
    { key: "PN", label: "PN" },
    { key: "brand", label: "Brand" },
    { key: "price", label: "Harga" },
    { key: "requester", label: "Peminta" },
    { key: "location", label: "Lokasi Kerja" },
    { key: "reference", label: "Referensi" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Tanggal Req" }

  ];

  return (
    <Table data={data}  columns={columns}/>
  )
}
