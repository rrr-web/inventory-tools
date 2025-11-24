"use client";
import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function LowStockWidget() {
  const [lowStock, setLowStock] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchLowStock = async () => {
      try{ 
      const result = await getData(`/api/warehouse?lowStock=true&page=${page}&limit=5`)
      setLowStock(result.data)
      setTotalPages(result.totalPages)
      }catch(err){
        console.log(err);
        
      }
    };

    fetchLowStock();
  }, [page]);
  

  return (
    <div className="bg-white p-4 rounded-lg shadow text-black">
      <h2 className="text-xl font-semibold mb-3">📉 Stok Menipis</h2>

      <Table data={lowStock}
        columns={[
          { key: "toolName", label: "Nama Tools" },
          { key: "brand", label: "Brand" },
          { key: "PN", label: "PN" },
          { key: "quantity", label: "Jumlah" },
        ]}
        enableAction={false}
      />
    </div>
  );
}
