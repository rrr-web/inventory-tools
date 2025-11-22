"use client";
import Navbar from "@/components/navbar/Navbar";
import TableHistory from "./TableHistory";
import { useState } from "react";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("tool-rusak");
  const tabs = [
    { id: "tool-rusak", label: "Tool Rusak" },
    { id: "tool-gudang", label: "Tool Gudang" },
    { id: "tools-room", label: "Tools Room" },
  ];

  return (
    <>
    <div className="text-black bg-white rounded-b-lg min-h-full">
      <h1 className="text-2xl font-bold mb-4">History</h1>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
  
    <TableHistory />
    </div>
    </>
  )
}
