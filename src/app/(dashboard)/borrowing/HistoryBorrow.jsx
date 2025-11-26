"use client";

import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { validateApiData } from "@/lib/formatDate";
import { useEffect, useState } from "react";

export default function HistoryBorrow() {
    const [dataHistory, setDataHistory] = useState([]);

     const columns = [
    {
      key: "toolName",
      label: "Nama Tool",
      type: "text",
      validation: { required: true, min: 3, max: 100 }
    },
    { key: "borrower",
      label: "Peminjam",type: "text", 
      validation :{required: true, min:2, max:100} },
    { key: "borrowDate", 
      label: "Tanggal Pinjam",
      type:"date",
      validation :{required: true} },
    { key: "returnDate", 
      label: "Tanggal Kembali",
      type:"date",
      validation :{required: true} },
    { key: "location", 
      label: "Lokasi",
      type: "select",
      options: [
        {value:"MSF", label:"MSF"},
        {value:"AST & Kamaz", label:"AST & Kamaz"},
        {value:"WS Tyre", label:"WS Tyre"},
        {value:"WS Klawas", label:"WS Klawas"},
      ],
      validation: {required : true} },
    { key: "status", 
      label: "Status",
      type: "select",
      options:[
        {value:"Open", label:"Open"},
        {value:"Close", label:"Close"}
      ],
    validation: {required : true} },
    { key: "tools_keeper", 
      label: "Tools Keeper",
      type: "select",
      options:[
        {value:"Ragil", label:"Ragil"},
        {value:"Tegar", label:"Tegar"},
        {value:"Fiky", label:"Fiky"}
      ],
      validation: {required : true}  },
  ];

    useEffect(() => {
    const loadData = async () => {
      try{
       const result = await getData('/api/borrowing?status=close');
       const clean = validateApiData(result)
       setDataHistory(clean);
      }catch(err){
        console.log(err);
        
      }
    }
    loadData();
  }, []);

 const handleSave = async (updateRow) => {
     try {
       const res = await fetch(`/api/borrowing/${updateRow.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updateRow),
       })
    
       if (!res.ok) throw new Error("Gagal menyimpan data")
 
       const updated = await res.json()
 
       const formattedUpdated = validateApiData([updated])[0]
 
       setDataHistory((prev) => prev.map((tool) => (tool.id === updateRow.id ? formattedUpdated : tool)))
       
       alert("✅ Data berhasil diperbarui")
     } catch (err) {
       console.error(err)
       alert("Terjadi kesalahan: " + err.message)
     }
   }
 
   const handleDelete = async (id) => {
     try {
       const res = await fetch(`/api/borrowing/${id}`, {
         method: "DELETE",
       })
       setBorrowData((prev) => prev.filter((item) => item.id !== id))
       alert("✅ Data berhasil dihapus")
     } catch (err) {
       console.error(err)
       alert("Gagal menghapus data")
     }
   }

  return (
    <>
      
      <Table columns={columns} data={dataHistory} onDelete={handleDelete} onSave={handleSave} enableAction={true}/>
      
    </>
  );
}
