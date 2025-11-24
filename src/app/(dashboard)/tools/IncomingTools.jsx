
import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { validateApiData } from "@/lib/formatDate";
import { useEffect, useState } from "react";

export default function IncomingTools() {
  const [dataIncoming, setDataIncoming] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData("api/history?source")
        const clean = validateApiData(result)
        setDataIncoming(clean)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, []);


  const baseColumns = [
    {
      key: "toolName",
      label: "Nama Tool",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    {
      key: "brand",
      label: "Brand",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    {
      key: "PN",
      label: "PN",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    {
      key: "spec",
      label: "Spec",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    {
      key: "action",
      label: "Action",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    {
      key: "quantityChange",
      label: "Quantity",
      type: "number",
      validation: { required: true }
    },
    {
      key: "createdAt",
      label: "Tanggal",
      type: "date",
      validation: { required: true }
    }
  ];

  const handleSave = async (updatedRow) => {
    try {
      const res = await fetch(`/api/history/${updatedRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      })

      if (!res.ok) throw new Error("Gagal menyimpan data")

      const updated = await res.json()

      const formattedUpdated = validateApiData([updated])[0];

      setDataIncoming((prev) =>
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
      setDataIncoming((prev) => prev.filter((item) => item.id !== id))
      alert("✅ Data berhasil dihapus")
    } catch (err) {
      console.error(err)
      alert("Gagal menghapus data")
    }
  };


  return (
    <>
      <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
      <Table columns={baseColumns} data={dataIncoming} onDelete={handleDelete} onSave={handleSave} enableAction={true}/>
      </div>
    </>
  );
}
