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
    <div className="w-full overflow-hidden rounded-xl bg-card shadow-xl border border-border text-black">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-black">
          <thead>
            <tr className="bg-table-header border-b border-table-border">
              <th className="px-6 py-4 text-left text-sm font-semibold ">
                No
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-sm font-semibold "
                >
                  {col.label}
                </th>
              ))}
              {enableAction && (
              <th className="px-6 py-4 text-left text-sm font-semibold ">
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
                  className="transition-colors hover:bg-gray-200 even:bg-gray-100"
                >
                  <td className="px-6 py-4 text-sm font-medium">
                    {index + 1}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 text-sm"
                    >
                      {editingId === item.id 
                      ? renderInput(col, editedData, errors, handleInputChange)
                       : (
                        item[col.key]
                      )}
                    </td>
                  ))}
                    {enableAction && (
                  <td className="px-6 py-4 text-sm">
                    {editingId === item.id ? (
                      <div className="flex gap-2">
                        <button
                          size="icon"
                          variant="ghost"
                          onClick={()=> saveEdit(onSave)}
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckIcon className="h-4 w-4" />
                        </button>
                        <button
                          size="icon"
                          variant="ghost"
                          onClick={(()=> cancelEdit(cancelEdit))}
                          className="h-8 w-8 bg-gray-200 hover:bg-gray-100"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          size="icon"
                          variant="ghost"
                          onClick={() => startEdit(item)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteRow(item.id, onDelete)}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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