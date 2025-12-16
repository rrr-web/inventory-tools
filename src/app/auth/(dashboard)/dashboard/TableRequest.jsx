"use client";
import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function TableRequest() {
    const [dataRequest, setDataRequest] = useState([]);

    useEffect(() => {
        const fetchDataRequest = async () => {
          try{
          const result = await getData(`/api/request?status=open`)
          setDataRequest(result.requests)
          }catch(err){
            console.error(err);
          }
        };

        fetchDataRequest();
    }, []);


  return (
     <div className="bg-white p-4 rounded-lg shadow text-black">
      <h2 className="text-xl font-semibold mb-3">🛒 Request Tools</h2>

      <Table data={dataRequest}
        columns={[
          { key: "toolName", label: "Nama Tools" },
          { key: "brand", label: "Brand" },
          { key: "PN", label: "PN" },
          { key: "quantity", label: "Jumlah" },
          { key: "requester", label: "Peminta" },
          { key: "status", label: "Status" },
        ]}
        enableAction={false}
      />
    </div>
  );
}