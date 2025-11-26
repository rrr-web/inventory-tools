"use client"

import Table from "@/components/table/Table";
import { getData } from "@/lib/data"
import { validateApiData } from "@/lib/formatDate";
import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react"

export default function HistoryToolsBroken(){
    const [toolsBroken, setToolsBroken] = useState([])


    useEffect(() =>{
        const loadData = async () => {
        const fetchBroken = await getData('/api/tools/broken')
        const clean = validateApiData(fetchBroken)
        setToolsBroken(clean)        
        }
        loadData();
    },[])


    const columns = [
    {
      key: "toolName",
      label: "Nama Tool",
      type: "text",
      validation: { required: true },
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      validation: { required: true },
    },
    {
      key: "brokenDate",
      label: "Tanggal",
      type: "date",
      validation: { required: true},
    },
    {
      key: "reportedBy",
      label: "Pelapor",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "description",
      label: "Deskripsi",
      type: "textarea",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Reported", label: "Reported" },
        { value: "Repair", label: "Repair" },
        { value: "Scrap", label: "Scrap" },
      ],
      validation: { required: true },
    }
  ];

    
const handleSave = async (updatedRow) => {
    try {
      const res = await fetch(`/api/tools/broken/${updatedRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      })

      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      const formattedUpdated = validateApiData([updated])[0];

      setToolsBroken((prev) =>
        prev.map((item) =>
          item.id === updatedRow.id ? formattedUpdated : item
        )
      )

      alert("✅ Data berhasil diperbarui")
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan: " + err.message)
    }
  };
  
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/history/${id}`, {
        method: "DELETE",
      })
      setToolsBroken((prev) => prev.filter((item) => item.id !== id))
      alert("✅ Data berhasil dihapus")
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  };

  

    return(
        <>
            <Table columns={columns} onDelete={handleDelete} onSave={handleSave} data={toolsBroken} enableAction={true}/>
        </>
    )
}