import Table from "@/components/table/Table"
import { getData } from "@/lib/data"
import { useEffect, useState } from "react"

export default function ToolsPage() {
  const [dataTools, setDataTools] = useState([])
 

 const columns = [
    {
      key: "toolName",
      label: "Nama Tool",
      type: "text",
      validation: { required: true },
    },
    {
      key: "brand",
      label: "Brand",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "PN",
      label: "PN",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "spec",
      label: "Spec",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      validation: { required: true },
    },
  ];

  useEffect(() => {
    const fetchTools = async () => {
      try{
        const result= await getData('/api/tools')
        setDataTools(result)
      }catch(err){
        console.log(err);
      }
    }

    fetchTools()
  }, [])


    const handleSave = async (updatedRow) => {
    try {
      const res = await fetch(`/api/tools/${updatedRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow)
      })
   
      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      setDataTools((prev) => prev.map((tool) => (tool.id === updated.id ? updated : tool)))

      alert("✅ Data berhasil diperbarui")
    } catch (err) {
      console.error(err)
      alert("Terjadi kesalahan: " + err.message)
    }
  }


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tools/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Gagal menghapus data")

      setDataTools((prev) => prev.filter((tool) => tool.id !== id))
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  }

  return (
    <>
    <Table columns={columns} data={dataTools} onDelete={handleDelete} onSave={handleSave} enableAction={true} enableSearch={true}/>
    </>
  )
}
