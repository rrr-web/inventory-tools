"use client";
import Navbar from "@/components/navbar/Navbar";
import DataBorrow from "./DataBorrow";
import AddBorrow from "@/app/(dashboard)/borrowing/AddBorrow";
import HistoryBorrow from "./HistoryBorrow";
import { useState } from "react";


export default function DataBorrowPage() {
  const [activeTab, setActiveTab] = useState("data-pinjam");
 
  const tabs = [
    { id: "data-pinjam", label: "Data Peminjaman" },
    { id: "tambah-pinjam", label: "Tambah Peminjaman" },
    { id: "riwayat", label: "Riwayat Peminjaman" },
  ];

  // 2. Render UI
  return (
    <div className="bg-white p-4 rounded-xl shadow min-h-full">
      
      <h1 className="text-2xl font-bold mb-4">Peminjaman Tools</h1>
      <div>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      </div>
      <div className="mt-4">
        {activeTab === "data-pinjam" && <DataBorrow />}
        {activeTab === "tambah-pinjam" && <AddBorrow />}
        {activeTab === "riwayat" && <HistoryBorrow />}
      </div>
    </div>
  );
}