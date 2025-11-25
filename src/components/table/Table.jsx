import { CheckIcon, PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { renderInput } from "@/lib/renderInput";
import useEditableTable from "@/hooks/useEditableTable";

export default function Table({ columns, data, onSave, onDelete, enableAction }) {
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

  return (
    <div className="w-full overflow-hidden rounded-xl bg-card shadow-xl border border-border">
      <div className="overflow-x-auto"> 
        <table className="w-full border-collapse min-w-full"> 
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="px-6 py-4 text-left text-sm font-semibold sticky left-0 bg-table-header z-10"> 
                No
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold whitespace-normal" 
                >
                  {col.label}
                </th>
              ))}

              {enableAction && (
              <th className="px-6 py-4 text-left text-sm font-semibold sticky right-0 bg-table-header z-10"> 
                Aksi
              </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-table-border">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="px-6 py-12 text-center text-sm"
                >
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-gray-200 even:bg-gray-100 relative" 
                >
                  {/* No Column - Sticky */}
                  <td className="px-6 py-4 text-sm font-medium sticky left-0 bg-inherit z-5 whitespace-nowrap">
                    {index + 1}
                  </td>
                  
                  {/* Data Columns */}
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm whitespace-nowrap min-w-[120px]" 
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
                  
                  {/* Actions Column - Sticky */}
                  {enableAction && (
                  <td className="px-6 py-4 text-sm sticky right-0 bg-inherit z-5 whitespace-nowrap">
                    {editingId === item.id ? (
                      <div className="flex gap-2 bg-inherit">
                        <button
                          onClick={() => saveEdit(onSave)}
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 rounded flex items-center justify-center"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="h-8 w-8 bg-gray-200 hover:bg-gray-100 rounded flex items-center justify-center"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2 bg-inherit">
                        <button
                          onClick={() => startEdit(item)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded flex items-center justify-center"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteRow(item.id, onDelete)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 rounded flex items-center justify-center"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}