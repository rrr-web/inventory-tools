import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function DataStock() {
  const [dataStock, setDataStock] = useState([]);

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
        const result = await getData("/api/warehouse");
        setDataStock(result.data);
      }catch(err){
        console.log(err);
      }
    };

    fetchTools();
  }, []);

  const handleSave = async (updatedRow) => {
    try {
      const res = await fetch(`/api/warehouse/${updatedRow.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");

      const updated = await res.json();

      setDataStock((prev) =>
        prev.map((tool) => (tool.id === id ? updated : tool))
      );

      alert("✅ Data berhasil diperbarui");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/warehouse/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus data");

      setDataStock((prev) => prev.filter((tool) => tool.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  return (
  <>

    <Table columns={columns} data={dataStock} onSave={handleSave} onDelete={handleDelete} enableAction={true} enableSearch={true}/>

  </>
  )
}
