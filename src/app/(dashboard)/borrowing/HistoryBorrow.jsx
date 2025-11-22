"use client";

import { getData } from "@/lib/data";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function HistoryBorrow() {

    const [dataHistory, setDataHistory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({
        toolName: "",
        borrower: "",
        borrowDate: "",
        returnDate: "",
        location: "",
        status: "",
        tools_keeper: "",
    });

     const columns = [
    { key: "toolName", label: "Nama Tools" },
    { key: "borrower", label: "Peminjam" },
    { key: "borrowDate", label: "Tanggal Pinjam" },
    { key: "returnDate", label: "Tanggal Kembali" },
    { key: "location", label: "Lokasi" },
    { key: "status", label: "Status" },
    { key: "toolsKeeper", label: "Tools Keeper" },
  ];

    useEffect(() => {
    const loadData = async () => {
       const result = await getData('/api/borrowing?status=close');
       setDataHistory(result);
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
    }

  const handleStartEdit = (b) => {
    setEditingId(b.id)
    setEditData({
      toolName: b.toolName || "",
        borrower: b.borrower || "",
        borrowDate: b.borrowDate ? b.borrowDate.split("T")[0] : "",
        returnDate: b.returnDate ? b.returnDate.split("T")[0] : "",
        location: b.location || "",
        status: b.status || "",
        toolsKeeper: b.toolsKeeper || "",
    })
    }

    const handleSave = async (id) => {
    try {
      const res = await fetch(`/api/borrowing/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            toolName: editData.toolName,
            borrower: editData.borrower,
            borrowDate: editData.borrowDate,
            returnDate: editData.returnDate,
            location: editData.location,
            status: editData.status,
            tools_keeper: editData.tools_keeper,
        }),
      })
   
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setDataHistory((prev) => prev.map((tool) => (tool.id === id ? updated : tool)))

      setEditingId(null)
      alert("✅ Data berhasil diperbarui")
        window.location.reload()
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan: " + err.message)
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
            {dataHistory.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length +  + 1}
                  className="px-6 py-12 text-center text-sm "
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              dataHistory.map((item, index) => (
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


                    {/* borrower */}
                       <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="text"
                        name="borrower"
                          value={editData.borrower}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        item.borrower
                      )}
                    </td>

                    {/* borrow Date */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="date"
                        name="borrowDate"
                          value={editData.borrowDate}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : (
                        new Date(item.borrowDate).toLocaleDateString("id-ID")
                      )}
                    </td>

                      {/* return Date */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <input
                        type="date"
                        name="returnDate"
                          value={editData.borrowDate}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        />
                      ) : item.returnDate ? (
                    new Date(item.returnDate).toLocaleDateString("id-ID")
                  ) : (
                    "-"
                  )}
                    </td>


                    {/* location */}
                    <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <select
                        name="location"
                          value={editData.location}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        >
                        <option value="Open">MSF</option>
                      <option value="Close">Klawas</option>
                      <option value="Close">AST & KAMAZ</option>
                      <option value="Close">WS Tyre</option>
                      </select>
                      ) : (
                        item.location
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
                        <option value="Open">Open</option>
                      <option value="Close">Close</option>
                      </select>
                      ) : (
                        item.status
                      )}
                    </td>
                      
                    {/* tools Keeper */}
                     <td className="px-6 py-4 text-sm">
                      {editingId === item.id ? (
                        <select
                        name="tools_keeper"
                          value={editData.tools_keeper}
                          onChange={handleChange}
                          className="h-8 text-sm"
                        >
                        <option value="Jo" disabled>Pilih</option>
                        <option value="Jon">Jon</option>
                      <option value="Ted">Ted</option>
                      </select>
                      ) : (
                        item.tools_keeper
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
  );
}
