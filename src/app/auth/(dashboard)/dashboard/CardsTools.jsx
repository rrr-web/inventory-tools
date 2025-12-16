"use client";
import { getData } from "@/lib/data";
import {  useEffect, useState } from "react";

export default function CardsTools() {
    const [tools, setTools] = useState([])
    const [activeRequests, setActiveRequests] = useState([])
    const [toolsInThisMonth, setToolsInThisMonth] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const toolsData = await getData('/api/warehouse')
                const requestsData = await getData('/api/request?status=open')
                const history = await getData('/api/history?source=Gudang&action=IN&filterMonth=true&countOnly=true')
                
                setTools(toolsData.total)
                setActiveRequests(requestsData.count)
                setToolsInThisMonth(history)
            }catch(err){
                throw new Error(err)
            }
        };

        fetchData();
    }, []);

  return (
   <>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 sm:min-wit-full">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Total Tools</h2>
            <p className="text-2xl font-bold text-blue-600">{tools}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Permintaan Aktif</h2>
            <p className="text-2xl font-bold text-yellow-500">{activeRequests}</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Tools Masuk Bulan Ini</h2>
            <p className="text-2xl font-bold text-green-600">{toolsInThisMonth}</p>
          </div>
        </div>
        </>
  );
}