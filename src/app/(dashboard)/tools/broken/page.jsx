"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ToolBrokenForm() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [form, setForm] = useState({
    quantity: 1,
    reportedBy: "",
    brokenDate: "",
    description: "",
  });
  const router = useRouter();

  // 🔍 Ambil data tool dari API saat user mengetik
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.length < 2) return setSuggestions([]);
      const res = await fetch(`/api/tools/search?q=${encodeURIComponent(search)}`);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">🛠️ Kerusakan Tools</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🔍 Input nama tools */}
          <div className="relative">
            <label className="block text-sm font-medium">Nama Tools</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:outline-blue-500"
              placeholder="Cari nama tool..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedTool(null);
              }}
              required
            />

            {!selectedTool && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full rounded shadow max-h-40 overflow-y-auto">
                {suggestions.map((tool) => (
                  <li
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {tool.toolName} - {tool.brand}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 🔧 Info tool */}
          <div>
            <label className="block text-sm font-medium">Brand</label>
            <input
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
              value={selectedTool?.brand || ""}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Part Number (PN)</label>
            <input
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
              value={selectedTool?.PN || ""}
            />
          </div>

          {/* 📦 Form umum */}
          <div>
            <label className="block text-sm font-medium">Jumlah Rusak</label>
            <input
              type="number"
              name="quantity"
              className="w-full border p-2 rounded"
              min={1}
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Dilaporkan Oleh</label>
            <input
              type="text"
              name="reportedBy"
              className="w-full border p-2 rounded"
              value={form.reportedBy}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tanggal</label>
            <input
              type="date"
              name="brokenDate"
              className="w-full border p-2 rounded"
              value={form.brokenDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Keterangan Kerusakan</label>
            <textarea
              name="description"
              className="w-full border p-2 rounded"
              rows="3"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => router.push("/tools")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              ← Kembali
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
