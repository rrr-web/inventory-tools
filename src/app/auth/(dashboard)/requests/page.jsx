"use client";

import {  useState } from "react";
import DataRequest from "./DataRequest";
import HistoryRequest from "./HistoryRequest";
import Navbar from "@/components/navbar/Navbar";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("data-request");
  
   const tabs = [
     { id: "data-request", label: "Data Request" },
     { id: "riwayat", label: "Riwayat Request" }
   ];
 
   return (
     <div className="text-black bg-white p-4 rounded-xl shadow min-h-full">
       
       <h1 className="text-2xl font-bold mb-4">Permintaan Tools</h1>
       <div>
         <Navbar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
       </div>
       <div className="mt-4">
         {activeTab === "data-request" && <DataRequest />}
         {activeTab === "riwayat" && <HistoryRequest />}
       </div>
     </div>
   );
 }