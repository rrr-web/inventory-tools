import Table from "@/components/table/Table";

export default function TableHistory({ activeTab }) {
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Administrator",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Designer",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 5,
      toolName: "XPS 13",
      brand: "Dell",
      PN: "Charlie Brown",
      spec: "charlie@example.com",
      quantity: "Developer",
      location: "Active",
    },
  ];
  return (
    <>
      <Table
        columns={[
          { key: "toolName", label: "Nama Tool" },
          { key: "brand", label: "Brand" },
          { key: "PN", label: "PN" },
          { key: "spec", label: "Spec" },
          { key: "quantity", label: "Jumlah" },
          { key: "location", label: "Lokasi" },
        ]}
        data={data}
        enableActions={true}
        onEdit={(id) => console.log("Edit", id)}
        onDelete={(id) => console.log("Delete", id)}
      />
    </>
  );
}
