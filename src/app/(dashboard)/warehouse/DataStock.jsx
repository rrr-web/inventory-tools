"use client"

import { getData } from "@/lib/data"
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { useEffect, useState } from "react"

export default function DataStock() {
  const [dataStock, setDataStock] = useState([])
  const [editingId, setEditingId] = useState(null) 
  const [editData, setEditData] = useState({ 
    toolName: "", 
    brand: "",
    PN: "",
    spec: "",
    quantity: "",
  })

  const columns = [
    {key: 'toolName', label: 'Nama Tool'},
    {key: 'brand', label: 'Brand'},
    {key: 'PN', label: 'PN'},
    {key: 'spec', label: 'Spec'},
    {key: 'quantity', label: 'Quantity'},
  ]

  useEffect(() => {
    const fetchTools = async () => {
     const result= await getData('/api/warehouse')
     setDataStock(result.data)
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
        }),
      })
   
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setDataStock((prev) => prev.map((tool) => (tool.id === id ? updated : tool)))

      setEditingId(null)
      alert("✅ Data berhasil diperbarui")
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
    <>
    <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
        <table className="min-w-full border border-gray-200 ">
          <thead className="bg-gray-100">
            <tr className="bg-table-header border-b border-table-border">
              <th className="px-6 py-4 text-left text-sm font-semibold ">No</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold "
                >
                  {col.label}
                </th>
              ))}

              
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
         
            </tr>
          </thead>
          <tbody className="divide-y">
            {dataStock.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length +  + 1}
                  className="px-6 py-12 text-center text-sm "
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              dataStock.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-200 even:bg-gray-100"
                >
                  <td className="px-6 py-4 text-sm  font-medium">
                    {index + 1}
                  </td>
                 
                    {/* nama Tools */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="toolName"
                          value={editData.toolName}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.toolName
                      )}
                    </td>


                    {/* brand */}
                       <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="brand"
                          value={editData.brand}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.brand
                      )}
                    </td>

                    {/* PN */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="PN"
                          value={editData.PN}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.PN
                      )}
                    </td>

                      {/* spek */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="spec"
                          value={editData.spec}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.spec
                      )}
                    </td>


                    {/* quantity */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="number"
                        name="quantity"
                          value={editData.quantity}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>

                
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleSave(item.id)}
                            className=" text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            size="icon"
                            variant="ghost"
                            onClick={() => setEditingId(null)}
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleStartEdit(item)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
