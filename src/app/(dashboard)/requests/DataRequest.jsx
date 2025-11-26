import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { validateApiData } from "@/lib/formatDate";
import { useEffect, useState } from "react";

export default function DataRequest() {
  const [dataReq, setDataReq] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("api/request?status=open");
        const clean =  validateApiData(data)
        setDataReq(clean);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

   const handleSave = async (updateRow) => {
       try {
         const res = await fetch(`/api/request/${updateRow.id}`, {
           method: "PATCH",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(updateRow),
         })
      
         if (!res.ok) throw new Error("Gagal menyimpan data")
   
         const updated = await res.json()
   
         const formattedUpdated = validateApiData([updated])[0]
   
         setDataReq((prev) => prev.map((tool) => (tool.id === updateRow.id ? formattedUpdated : tool)))
         
         alert("✅ Data berhasil diperbarui")
       } catch (err) {
         console.error(err)
         alert("Terjadi kesalahan: " + err.message)
       }
     }
   
     const handleDelete = async (id) => {
       try {
         const res = await fetch(`/api/request/${id}`, {
           method: "DELETE",
         })
         setDataReq((prev) => prev.filter((item) => item.id !== id))
         alert("✅ Data berhasil dihapus")
       } catch (err) {
         console.error(err)
         alert("Gagal menghapus data")
       }
     }

  const columns = [
    {
      key: "toolName",
      label: "Nama Tool",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "requester",
      label: "Peminta",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "number",
      validation: { required: true, min: 1 },
    },
    {
      key: "brand",
      label: "Brand",
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
      key: "PN",
      label: "PN",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "price",
      label: "Harga",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "reason",
      label: "Alasan Kebutuhan",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "location",
      label: "Lokasi Kerja",
      type: "text",
      validation: { required: true, min: 3, max: 100 },
    },
    {
      key: "reference",
      label: "Referensi",
      type: "textarea",
      validation: { required: true, min: 3, max: 200 },
    },
    {
      key: "note",
      label: "Keterangan",
      type: "textarea",
      validation: { required: true, min: 3, max: 200 },
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Open", label: "Open" },
        { value: "Close", label: "Close" },
      ],
      validation: { required: true },
    },
    {
      key: "createdAt",
      label: "Tanggal Request",
      type: "date",
      validation: { required: true},
    },
  ];

  return (
   <>
      <Table
        columns={columns}
        data={dataReq}
        onDelete={handleDelete}
        onSave={handleSave}
        enableAction={true}
        />
        </>
   
  );
}
