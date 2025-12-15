"use client";

import { useEffect, useState } from "react";

export default function ToolsOut() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  const [form, setForm] = useState({
    quantity: 1,
    receiver:"",
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) return setSuggestions([]);
      const res = await fetch(
        `/api/warehouse/search?q=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setSuggestions(data);
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setSearch(tool.toolName);
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault()
    if (!selectedTool) return alert("Pilih alat terlebih dahulu");

    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: selectedTool.id,
          toolName: selectedTool.toolName,
          brand: selectedTool.brand || "",
          spec: selectedTool.spec || "",
          PN: selectedTool.PN || "",
          quantity: Number(form.quantity),
          receiver: form.receiver,
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok || !data.success)
        throw new Error(data.error || "Gagal menambah data");
      alert("✅ Data alat berhasil ditambahkan!");
    } catch (error) {
      console.error("Submit error:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  }

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-xl max-w-4xl mx-auto my-8 shadow-2xl">
        <div className="p-6 space-y-1 border-b">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            📦 Barang Keluar
          </h1>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="toolName"
                  className="text-sm font-medium leading-none"
                >
                  Nama Tools
                </label>
                <input
                  id="toolName"
                  type="text"
                  placeholder="Masukkan nama tools"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedTool(null);
                  }}
                  required
                />

                {/* Dropdown hasil pencarian */}
                {!selectedTool && suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border max-w-full rounded shadow max-h-40 overflow-y-auto ">
                    {suggestions.map((tool) => (
                      <li
                        key={tool.id}
                        onClick={() => handleSelectTool(tool)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {tool.toolName} {tool.brand ? `- ${tool.brand}` : ""}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Brand
                </label>
                <input
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={selectedTool?.brand || ""}
                />
              </div>

              {/* PN */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Part Number (PN)
                </label>
                <input
                  readOnly
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={selectedTool?.PN || ""}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="text-sm font-medium leading-none">
                  Jumlah
                </label>
                <input
                  name="quantity"
                  type="number"
                  min={1}
                  placeholder="Masukkan jumlah"
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-base  placeholder:focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Spec */}
            <div>
              <label className="text-sm font-medium leading-none">
                Penerima
                <input
                  type="text"
                  name="receiver"
                  className="h-10 w-full rounded-md border border-input px-3 py-2 text-base  placeholder:focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.receiver}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="text-sm font-medium leading-none">
                Spesifikasi
              </label>
              <textarea
                readOnly
                className="w-full border p-2 rounded  resize-none text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                value={selectedTool?.spec || ""}
              />
            </div>

            {/* Tombol Aksi */}
            <div>
              <button
                type="submit"
                className="min-w-full border p-3 shadow-2xl bg-gray-400 text-white rounded-md hover:bg-gray-500  focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-2"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
