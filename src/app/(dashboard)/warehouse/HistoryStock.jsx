import Table from "@/components/table/Table";
import { getData } from "@/lib/data";
import { useEffect, useState } from "react";

export default function HistoryStock(){
    const [dataHistory, setDataHistory] = useState([])

    useEffect(()=>{
        const fetchDataRequest = async () => {
          try{
          const result = await getData(`/api/history?source=gudang`)
          setDataHistory(result)
          }catch(err){
            console.error(err);
          }
        };

        fetchDataRequest();
    },[])

    const columns = [
    {key: 'toolName', label: 'Nama Tool'},
    {key: 'brand', label: 'Brand'},
    {key: 'PN', label: 'PN'},
    {key: 'spec', label: 'Spec'},
    {key: 'quantityChange', label: 'Quantity'},
    {key: 'action', label: 'Action'},
    {key: 'createdAt', label: 'Tanggal'},

  ]

    return(
        <>
        <Table columns={columns} data={dataHistory}/>
        </>
    )
}