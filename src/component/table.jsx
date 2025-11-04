export default function Table({ columns, data, actions }) {
  return (
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-2">No</th>
          {columns.map((col) => (
            <th key={col.key} className="border p-2 text-left">
              {col.label}
            </th>
          ))}
          {actions && <th className="border p-2 text-left">Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={row.id}>
            <td className="border p-2">{i + 1}</td>

            {columns.map((col) => (
              <td key={col.key} className="border p-2">
                {typeof col.render === "function"
                  ? col.render(row[col.key], row)
                  : row[col.key]}
              </td>
            ))}

            {actions && (
              <td className="border p-2">
                {actions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
