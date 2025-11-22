"use client"

import { getData } from "@/lib/data"
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react"

export default function HistoryToolsBroken(){
    const [toolsBroken, setToolsBroken] = useState([])
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        toolName: "",
        quantity: "",
        brokenDate: "",
        reportedBy: "",
        description:"",
        status: ""
    });

    useEffect(() =>{
        const loadData = async () => {
        const fetchBroken = await getData('/api/tools/broken')
        setToolsBroken(fetchBroken)        
        }
        loadData();
    },[])


    const columns = [
    { key: "toolName", label: "Nama Tools" },
    { key: "quantity", label: "Jumlah" },
    { key: "brokenDate", label: "Tanggal" },
    { key: "reportedBy", label: "Nama" },
    { key: "description", label: "Deskripsi" },
    { key: "status", label: "Status" }
  ];


  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
    }

  const handleStartEdit = (b) => {
    setEditingId(b.id)
    setEditData({
      toolName: b.toolName || "",
        quantity: b.quantity || "",
        brokenDate: b.brokenDate ? b.brokenDate.split("T")[0] : "",
        reportedBy: b.reportedBy || "",
        description: b.description || "",
        status: b.status || "",
    })
    }

    const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/tools/broken/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            toolName: editData.toolName,
            quantity: editData.quantity,
            brokenDate: editData.brokenDate,
            reportedBy: editData.reportedBy,
            description: editData.description,
            status: editData.status
        }),
      })
        
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setToolsBroken((prev) => prev.map((tool) => (tool.id === id ? updated : tool)))

      setEditingId(null)
      alert("✅ Data berhasil diperbarui")
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan: " + err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tools/broken/${id}`, {
        method: "DELETE",
      })
      setToolsBroken((prev) => prev.filter((item) => item.id !== id))
      alert("✅ Data berhasil dihapus")
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  }

    return(
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
            {toolsBroken.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length +  + 1}
                  className="px-6 py-12 text-center text-sm "
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              toolsBroken.map((item, index) => (
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

                    {/* broken Date */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="date"
                        name="brokenDate"
                          value={editData.brokenDate}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        new Date(item.brokenDate).toLocaleDateString("id-ID")
                      )}
                    </td>


                    {/* reported */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="reportedBy"
                          value={editData.reportedBy}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.reportedBy
                      )}
                    </td>

                       {/* desciption */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <textarea
                        name="description"
                          value={editData.description}
                          onChange={handleChange}
                          className="h-5 text-sm"
                        />
                      ) : (
                        item.description
                      )}
                    </td>

                      {/* status */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <select
                            name="status"
                          value={editData.status}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        >
                        <option value="" disabled>Pilih</option>
                        <option value="Reported">Reported</option>
                        <option value="Repair">Repair</option>
                      <option value="Scrap">Scrap</option>
                      </select>
                      ) : (
                        item.status
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