import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { renderInput } from "@/lib/renderInput";
import useEditableTable from "@/hooks/useEditableTable";
import { useState, useMemo } from "react";

export default function Table({ 
  columns, 
  data, 
  onSave, 
  onDelete, 
  enableAction,
  enableSearch 
}) {
  const {
    editingId,
    editedData,
    errors,
    startEdit,
    cancelEdit,
    handleInputChange,
    saveEdit,
    deleteRow,
  } = useEditableTable(columns);

  
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!enableSearch || !searchTerm) return data;

    return data.filter(item => {
      return columns.some(col => {
        const value = item[col.key];
        if (value && typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
  }, [data, searchTerm, columns, enableSearch]); 

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const displayData = enableSearch ? filteredData : data;

  return (
    <div className="bg-white p-4 rounded-xl drop-shadow-2xl min-h-fit">
     
      {enableSearch && (
        <div className="mb-2">
        <input
          type="search"
          name="tools"
          id="tools"
          placeholder="Cari..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-2 py-2  text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
        />
      </div>

      )}

      <div className="w-full overflow-hidden rounded-xl shadow-xl">
        <div className="overflow-x-auto"> 
          <table className="w-full border-collapse min-w-full"> 
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-semibold sticky left-0 z-10 bg-gray-100"> 
                  No
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-4 text-left text-sm font-semibold whitespace-normal bg-gray-100" 
                  >
                    {col.label}
                  </th>
                ))}

                {enableAction && (
                <th className="px-6 py-4 text-left text-sm font-semibold sticky right-0 z-10 bg-gray-100"> 
                  Aksi
                </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-6 py-12 text-center text-sm"
                >
                  Tidak ada data
                </td>
              </tr>

            ):(
              displayData.map((item, index) => (
                  <tr
                    key={item.id}
                  >
                    
                    <td className="px-6 py-4 text-sm font-medium sticky left-0 z-5 whitespace-nowrap bg-white">
                      {index + 1}
                    </td>
                    
                   
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="p-2 text-sm whitespace-nowrap min-w-[120px]" 
                      >
                        {editingId === item.id ? (
                          <div className="min-w-[120px]"> 
                            {renderInput(col, editedData, errors, handleInputChange)}
                          </div>
                        ) : (
                          <span className="block truncate max-w-[200px]"> 
                            {item[col.key] || "-"}
                          </span>
                        )}
                      </td>
                    ))}
                    
                    {enableAction && (
                    <td className="px-6 py-4 text-sm sticky right-0 bg-white z-5 whitespace-nowrap">
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(onSave)}
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded flex items-center justify-center border border-green-200"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="h-8 w-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center border border-gray-300"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(item)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded flex items-center justify-center border border-blue-200"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteRow(item.id, onDelete)}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded flex items-center justify-center border border-red-200"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                    )}
                  </tr>
                )))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}