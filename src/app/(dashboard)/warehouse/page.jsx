"use client"

import { useState } from "react";
import AddStock from "./AddStock";
import DataStock from "./DataStock";
import HistoryStock from "./HistoryStock";
import Navbar from "@/components/navbar/Navbar";
import ToolsOut from "./ToolsOut";

export default function WarehousePage() {
  const [activeTab, setActiveTab] = useState("data-stok");
  
   const tabs = [
     { id: "data-stok", label: "Data Stok" },
     { id: "tambah-stok", label: "Tambah Stok" },
     { id: "barang-keluar", label: "Barang Keluar" },
     { id: "riwayat", label: "History Stok" },
   ];
 
   
   return (
     <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
       
       <h1 className="text-2xl font-bold mb-4">Stok Gudang</h1>
       <div>
         <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
       </div>
       <div className="mt-4">
         {activeTab === "data-stok" && <DataStock />}
         {activeTab === "tambah-stok" && <AddStock />}
         {activeTab === "barang-keluar" && <ToolsOut />}
         {activeTab === "riwayat" && <HistoryStock />}
       </div>
     </div>
   )
  }
