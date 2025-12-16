"use client";
import { useState, useEffect } from "react";

export default function ToolBroken() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [form, setForm] = useState({
    quantity: 1,
    reportedBy: "",
    brokenDate: "",
    description: "",
  });

  //Ambil data tool dari API saat user mengetik
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) return setSuggestions([]);
      const res = await fetch(
        `/api/tools/search?q=${encodeURIComponent(search)}`
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTool) return alert("Pilih alat terlebih dahulu");

    const res = await fetch("/api/tools/broken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolId: selectedTool.id,
        toolName: selectedTool.toolName,
        ...form,
        quantity: Number(form.quantity),
      }),
    });

    const result = await res.json();
    if (res.ok) alert("✅ Laporan kerusakan tersimpan");
    else alert("❌ " + result.error);
  };

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-xl max-w-4xl mx-auto my-8 shadow-2xl">
        <div className="p-6 space-y-1 border-b">
          <h1 className="ttext-2xl sm:text-3xl font-bold text-center">
            🛠️ Kerusakan Tools
          </h1>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Nama Tools
                </label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Cari nama tool..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedTool(null);
                  }}
                  required
                />

                {!selectedTool && suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-fit rounded shadow max-h-40 overflow-y-auto">
                    {suggestions.map((tool) => (
                      <li
                        key={tool.id}
                        onClick={() => handleSelectTool(tool)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {tool.toolName} - {tool.brand} - {tool.quantity} PCS
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 🔧 Info tool */}
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

              {/* 📦 Form umum */}
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Jumlah Rusak
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  min={1}
                  value={form.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Dilaporkan Oleh
                </label>
                <input
                  type="text"
                  name="reportedBy"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.reportedBy}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="brokenDate"
                  className="flex h-10 w-full rounded-md border border-input  px-3 py-2 text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  value={form.brokenDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Keterangan Kerusakan
              </label>
              <textarea
                name="description"
                className="w-full border p-2 rounded  resize-none text-base  placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                rows="3"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Buttons */} 
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
