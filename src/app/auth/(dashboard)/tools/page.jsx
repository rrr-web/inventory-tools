"use client"

import { useState } from "react"
import DataTools from "@/app/auth/(dashboard)/tools/DataTools"
import AddTools from "@/app/auth/(dashboard)/tools/AddTools"
import ToolBroken from "@/app/auth/(dashboard)/tools/ToolBroken"
import Navbar from "@/components/navbar/Navbar"
import HistoryToolsBroken from "./HistoryToolsBroken"
import IncomingTools from "./IncomingTools"

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState("data-tools");
 
  const tabs = [
    { id: "data-tools", label: "Data Tools" },
    { id: "tambah-tools", label: "Tambah Tools" },
    { id: "tools-rusak", label: "Tambah Tools Rusak" },
    { id: "data-rusak", label: "Tools Rusak" },
    { id: "tools-masuk", label: "Tools Masuk" }
  ];
  return(
    <>
      <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
            
            <h1 className="text-2xl font-bold mb-4">Tools Room</h1>
            <div>
              <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
            </div>
            <div className="mt-4">
              {activeTab === "data-tools" && <DataTools />}
              {activeTab === "tambah-tools" && <AddTools />}
              {activeTab === "tools-rusak" && <ToolBroken />}
              {activeTab === "data-rusak" && <HistoryToolsBroken />}
              {activeTab === "tools-masuk" && <IncomingTools />}
            </div>
          </div>
    </>
  )
}
