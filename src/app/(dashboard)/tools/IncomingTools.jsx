import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { validateApiData } from "@/lib/formatDate";
import { useEffect, useState } from "react";

export default function IncomingTools() {
  const [dataIncoming, setDataIncoming] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
    try {
        const result = await getData("api/history?source=tools%room");
        const clean = validateApiData(result)
        setDataIncoming(clean);
      }catch(err){
        console.log(err);
      }}
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
    console.log("Saving:", updatedRow);
  };

  const handleDelete = async (id) => {
    console.log("Deleting:", id);
  };
  

  return (
    <>
        <Table columns={baseColumns} data={dataIncoming} onDelete={handleDelete} onSave={handleSave}/>
    </>
  );
}
