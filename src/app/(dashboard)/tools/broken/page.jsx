"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ToolBrokenForm() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [reportedBy, setReportedBy] = useState("");
  const [brokenDate, setBrokenDate] = useState("");
  const [description, setDescription] = useState("");

  // Ambil data tools ketika user mengetik
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTool) return alert("Pilih alat terlebih dahulu");

    const res = await fetch("/api/tools/broken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toolId: selectedTool.id,
        quantity: Number(quantity),
        reportedBy,
        description,
        brokenDate
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

          {/* Input Nama Tools */}
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

            {/* Dropdown suggestion */}
            {!selectedTool && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border w-full rounded shadow max-h-40 overflow-y-auto">
                {suggestions.map((tool) => (
                  <li
                    key={tool.id}
                    onClick={() => handleSelectTool(tool)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {tool.toolName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Readonly fields (selalu muncul, kosong dulu) */}
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
            

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium">Jumlah Rusak</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Reported By */}
          <div>
            <label className="block text-sm font-medium">Dilaporkan Oleh</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tanggal</label>
            <input
              type="date"
              className="w-full border p-2 rounded"
              value={brokenDate}
              onChange={(e) => setBrokenDate(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Keterangan Kerusakan</label>
            <textarea
              className="w-full border p-2 rounded"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
